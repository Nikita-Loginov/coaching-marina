import { NextRequest, NextResponse } from "next/server";
import { del, list, put } from "@vercel/blob";
import { randomUUID } from "crypto";

import { requireAdmin } from "@/shared/lib/admin-session";

const MAX_CHUNK_BYTES = 20 * 1024;
const MAX_PARTS = 512;

const isUuid = (value: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);

const safeFilename = (name: string) => {
  const base = name.split(/[/\\]/).pop() || "file";
  const cleaned = base.replace(/[/\\?%*:|"<>]/g, "_").slice(0, 80);

  return cleaned || "file";
};

const saveChunk = async (request: NextRequest) => {
  const formData = await request.formData();
  const uploadId = String(formData.get("uploadId") ?? "");
  const index = Number(formData.get("index"));
  const total = Number(formData.get("total"));
  const file = formData.get("file");

  if (!isUuid(uploadId) || !Number.isInteger(index) || !Number.isInteger(total)) {
    return NextResponse.json({ error: "Некорректная часть файла" }, { status: 400 });
  }

  if (index < 0 || total < 1 || total > MAX_PARTS || index >= total) {
    return NextResponse.json({ error: "Некорректная часть файла" }, { status: 400 });
  }

  if (!(file instanceof File) || file.size > MAX_CHUNK_BYTES) {
    return NextResponse.json({ error: "Слишком большая часть файла" }, { status: 413 });
  }

  await put(`uploads/tmp/${uploadId}/${index}`, file, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/octet-stream",
  });

  return NextResponse.json({ ok: true });
};

const completeUpload = async (body: {
  uploadId?: string;
  total?: number;
  filename?: string;
  contentType?: string;
}) => {
  const uploadId = String(body?.uploadId ?? "");
  const total = Number(body?.total);
  const filename = safeFilename(String(body?.filename ?? "file"));
  const contentType = String(body?.contentType ?? "application/octet-stream")
    .split(";")[0]
    .trim();

  if (!isUuid(uploadId) || !Number.isInteger(total) || total < 1 || total > MAX_PARTS) {
    return NextResponse.json({ error: "Некорректный файл" }, { status: 400 });
  }

  let listed = await list({
    prefix: `uploads/tmp/${uploadId}/`,
    limit: MAX_PARTS,
  });

  for (let attempt = 0; listed.blobs.length < total && attempt < 3; attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    listed = await list({
      prefix: `uploads/tmp/${uploadId}/`,
      limit: MAX_PARTS,
    });
  }
  const parts = listed.blobs
    .map((blob) => ({
      url: blob.url,
      index: Number(blob.pathname.split("/").pop()),
    }))
    .filter((part) => Number.isInteger(part.index))
    .sort((a, b) => a.index - b.index);

  if (parts.length !== total || parts.some((part, index) => part.index !== index)) {
    return NextResponse.json({ error: "Не все части файла получены" }, { status: 409 });
  }

  const buffers: Buffer[] = [];

  for (const part of parts) {
    const response = await fetch(part.url);

    if (!response.ok) {
      return NextResponse.json({ error: "Не удалось собрать файл" }, { status: 502 });
    }

    buffers.push(Buffer.from(await response.arrayBuffer()));
  }

  const saved = await put(`team/${randomUUID()}-${filename}`, Buffer.concat(buffers), {
    access: "public",
    contentType: contentType || "application/octet-stream",
  });

  await del(parts.map((part) => part.url)).catch(() => undefined);

  return NextResponse.json({ url: saved.url });
};

export async function POST(request: NextRequest) {
  try {
    const denied = await requireAdmin();

    if (denied) {
      return denied;
    }

    const contentType = request.headers.get("content-type") ?? "";

    if (contentType.includes("application/json")) {
      const body = await request.json().catch(() => null);

      if (body?.mode !== "complete") {
        return NextResponse.json({ error: "Файл нужно отправить частями" }, { status: 400 });
      }

      return await completeUpload(body);
    }

    return await saveChunk(request);
  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const denied = await requireAdmin();

    if (denied) {
      return denied;
    }

    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    await del(url);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("DELETE BLOB ERROR:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { del, list, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

import { personSchema } from "@/entities/person/model/person.schema";
import { prisma } from "@/shared/lib/prisma";
import { requireAdmin } from "@/shared/lib/admin-session";

const PERSON_ID = "main";
const MAX_PART_BYTES = 10 * 1024;
const MAX_PARTS = 64;

const isUuid = (value: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

export async function GET() {
  try {
    const denied = await requireAdmin();

    if (denied) {
      return denied;
    }

    const person = await prisma.person.findUnique({
      where: {
        id: PERSON_ID,
      },
    });

    if (!person) {
      return NextResponse.json({ error: "Person not found" }, { status: 404 });
    }

    return NextResponse.json(person);
  } catch (error) {
    console.error("GET /api/admin/orgs ERROR:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

const savePerson = async (body: unknown) => {
  const parsed = personSchema.parse(body);

  const person = await prisma.person.update({
    where: {
      id: PERSON_ID,
    },
    data: {
      name: parsed.name,
      middlename: parsed.middlename,
      fullname: parsed.fullname,
      post: parsed.post,
      clients: parsed.clients,
      countAreas: parsed.countAreas,
      license: parsed.license,
      about: parsed.about,
      contacts: parsed.contacts,
      socials: parsed.socials,
      practice: parsed.practice,
      organization: parsed.organization,
      management: parsed.management,
      education: parsed.education,
      materialTechnicalSupport: parsed.materialTechnicalSupport,
      paidEducationalServices: parsed.paidEducationalServices,
      financialActivity: parsed.financialActivity,
      vacantPlaces: parsed.vacantPlaces,
      studentSupport: parsed.studentSupport,
      internationalCooperation: parsed.internationalCooperation,
      documents: parsed.documents,
    },
  });

  revalidatePath("/", "layout");

  return NextResponse.json(person);
};

const savePart = async (body: {
  uploadId?: string;
  index?: number;
  total?: number;
  part?: string;
}) => {
  const uploadId = String(body.uploadId ?? "");
  const index = Number(body.index);
  const total = Number(body.total);
  const part = body.part;

  if (!isUuid(uploadId) || !Number.isInteger(index) || !Number.isInteger(total)) {
    return NextResponse.json({ error: "Некорректная часть" }, { status: 400 });
  }

  if (index < 0 || total < 1 || total > MAX_PARTS || index >= total) {
    return NextResponse.json({ error: "Некорректная часть" }, { status: 400 });
  }

  if (typeof part !== "string" || !/^[A-Za-z0-9+/]+={0,2}$/.test(part)) {
    return NextResponse.json({ error: "Некорректная часть" }, { status: 400 });
  }

  const bytes = Buffer.from(part, "base64");

  if (bytes.length < 1 || bytes.length > MAX_PART_BYTES) {
    return NextResponse.json({ error: "Слишком большая часть" }, { status: 413 });
  }

  await put(`orgs/tmp/${uploadId}/${index}`, bytes, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/octet-stream",
  });

  return NextResponse.json({ ok: true });
};

const completeSave = async (body: { uploadId?: string; total?: number }) => {
  const uploadId = String(body.uploadId ?? "");
  const total = Number(body.total);

  if (!isUuid(uploadId) || !Number.isInteger(total) || total < 1 || total > MAX_PARTS) {
    return NextResponse.json({ error: "Некорректные данные" }, { status: 400 });
  }

  let listed = await list({
    prefix: `orgs/tmp/${uploadId}/`,
    limit: MAX_PARTS,
  });

  for (let attempt = 0; listed.blobs.length < total && attempt < 4; attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    listed = await list({
      prefix: `orgs/tmp/${uploadId}/`,
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
    return NextResponse.json({ error: "Не все части получены" }, { status: 409 });
  }

  const buffers: Buffer[] = [];

  for (const part of parts) {
    const response = await fetch(part.url);

    if (!response.ok) {
      return NextResponse.json({ error: "Не удалось собрать данные" }, { status: 502 });
    }

    buffers.push(Buffer.from(await response.arrayBuffer()));
  }

  await del(parts.map((part) => part.url)).catch(() => undefined);

  let payload: unknown;

  try {
    payload = JSON.parse(Buffer.concat(buffers).toString("utf8"));
  } catch {
    return NextResponse.json({ error: "Некорректные данные" }, { status: 400 });
  }

  return savePerson(payload);
};

export async function PATCH(request: NextRequest) {
  try {
    const denied = await requireAdmin();

    if (denied) {
      return denied;
    }

    const body = await request.json();

    if (body?.mode === "chunk") {
      return await savePart(body);
    }

    if (body?.mode === "complete") {
      return await completeSave(body);
    }

    return await savePerson(body);
  } catch (error) {
    console.error("PATCH /api/admin/orgs ERROR:", error);

    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Проверьте заполнение полей" }, { status: 400 });
    }

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

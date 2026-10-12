import { NextRequest, NextResponse } from "next/server";
import { put, del } from "@vercel/blob";
import { randomUUID } from "crypto";

import { requireAdmin } from "@/shared/lib/admin-session";

export async function POST(request: NextRequest) {
  try {
    const denied = await requireAdmin();

    if (denied) {
      return denied;
    }

    const formData = await request.formData();

    const file = formData.get("file") as File | null;

    console.log("FILE:", file?.name);

    const blob = await put(`team/${randomUUID()}-${file?.name}`, file!, {
      access: "public",
    });

    console.log("BLOB:", blob.url);

    return NextResponse.json({
      url: blob.url,
    });
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

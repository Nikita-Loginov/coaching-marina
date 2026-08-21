import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/shared/lib/prisma";

import { teamSchema } from "@/entities/team/model/team.schema";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const teams = await prisma.team.findMany({
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(teams);
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const parsed = teamSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const existing = await prisma.team.findUnique({
      where: {
        id: parsed.data.id,
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Тимейт с таким id уже существует" },
        { status: 409 }
      );
    }

    const { ...rest } = parsed.data;

    const team = await prisma.team.create({
      data: {
        ...rest,
      },
    });

    revalidatePath("/", "layout");

    return NextResponse.json(team, { status: 201 });

  } catch (error) {
    console.error("CREATE TEAM ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}

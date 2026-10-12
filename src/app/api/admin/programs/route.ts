import { NextResponse } from "next/server";

import { prisma } from "@/shared/lib/prisma";
import { requireAdmin } from "@/shared/lib/admin-session";

export async function GET() {
  const denied = await requireAdmin();

  if (denied) {
    return denied;
  }

  try {
    const programs = await prisma.program.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(programs);
  } catch (error) {
    console.error("Ошибка получения программ:", error);

    return NextResponse.json(
      { message: "Не удалось получить программы" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const denied = await requireAdmin();

  if (denied) {
    return denied;
  }

  try {
    const body = await request.json();

    const program = await prisma.program.create({
      data: {
        id: body.id,
        name: body.name,
        description: body.description,
        descriptionFull: body.descriptionFull,
        as: body.as,
        btnText: body.btnText,
        btnTextInner: body.btnTextInne,
        img: body.img,
        forWhom: body.forWhom,
        suitableRequests: body.suitableRequests,
        workflow: body.workflow,
        cooperationFormat: body.cooperationFormat,
        skills: body.skills,
        learningValue: body.learningValue,
        benefits: body.benefits,
        reviews: body.reviews ?? [],
      },
    });

    return NextResponse.json(program, { status: 201 });
  } catch (error) {
    console.error("Ошибка создания программы:", error);

    return NextResponse.json(
      { message: "Не удалось создать программу" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";

import { prisma } from "@/shared/lib/prisma";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;

    const program = await prisma.program.findUnique({
      where: {
        id,
      },
    });

    if (!program) {
      return NextResponse.json(
        { message: "Программа не найдена" },
        { status: 404 }
      );
    }

    return NextResponse.json(program);
  } catch (error) {
    console.error("Ошибка получения программы:", error);

    return NextResponse.json(
      { message: "Не удалось получить программу" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body = await request.json();

    const program = await prisma.program.update({
      where: {
        id,
      },
      data: {
        id: body.id,
        name: body.name,
        description: body.description,
        descriptionFull: body.descriptionFull,
        as: body.as,
        btnText: body.btnText,
        btnTextInner: body.btnTextInner,
        img: body.img,
        forWhom: body.forWhom,
        suitableRequests: body.suitableRequests,
        workflow: body.workflow,
        cooperationFormat: body.cooperationFormat,
        skills: body.skills,
        learningValue: body.learningValue,
        benefits: body.benefits,
        reviews: body.reviews ?? [],
        teamShowed: body.teamShowed,
        type: body.type,
      },
    });

    return NextResponse.json(program);
  } catch (error) {
    console.error("Ошибка обновления программы:", error);

    return NextResponse.json(
      { message: "Не удалось обновить программу" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;

    await prisma.program.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ message: "Программа удалена" }, { status: 200 });
  } catch (error) {
    console.error("Ошибка удаления программы:", error);

    return NextResponse.json(
      { message: "Не удалось удалить программу" },
      { status: 500 }
    );
  }
}

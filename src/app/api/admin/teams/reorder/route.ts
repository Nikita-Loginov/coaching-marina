import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/shared/lib/prisma";
import { requireAdmin } from "@/shared/lib/admin-session";

import { teamReorderSchema } from "@/entities/team/model/team.schema";

export const PUT = async (request: NextRequest) => {
  const denied = await requireAdmin();

  if (denied) {
    return denied;
  }

  const body = await request.json();

  const parsed = teamReorderSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: parsed.error.flatten(),
      },
      {
        status: 400,
      }
    );
  }

  await prisma.$transaction(
    parsed.data.items.map(({ id, order }) =>
      prisma.team.update({
        where: {
          id,
        },
        data: {
          order,
        },
      })
    )
  );

  return NextResponse.json({
    success: true,
  });
};

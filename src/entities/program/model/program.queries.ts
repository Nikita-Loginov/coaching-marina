import { prisma } from "@/shared/lib/prisma";

import type { ProgramItem } from "./program.types";

import { mapProgram } from "./program.mapper";

export const getPrograms = async (): Promise<ProgramItem[]> => {
  const rows = await prisma.program.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return rows.map(mapProgram);
};

export const getProgramById = async (
  id: string
): Promise<ProgramItem | null> => {
  const row = await prisma.program.findUnique({
    where: {
      id,
    },
  });

  return row ? mapProgram(row) : null;
};

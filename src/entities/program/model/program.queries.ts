import { prisma } from "@/shared/lib/prisma";
import { revalidatePath } from "next/cache";
import { unstable_noStore as noStore } from "next/cache";

import type { ProgramItem } from "./program.types";

import { mapProgram } from "./program.mapper";

export const getPrograms = async (): Promise<ProgramItem[]> => {
  noStore();

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
  noStore();
  
  const row = await prisma.program.findUnique({
    where: {
      id,
    },
  });

  return row ? mapProgram(row) : null;
};

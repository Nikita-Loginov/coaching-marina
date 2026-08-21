import { prisma } from "@/shared/lib/prisma";

import type { PersonItem } from "./person.types";

import { mapPerson } from "./person.mapper";

export const getPerson = async (): Promise<PersonItem | null> => {
  const row = await prisma.person.findUnique({
    where: {
      id: "main",
    },
  });

  return row ? mapPerson(row) : null;
};

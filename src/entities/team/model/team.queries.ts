import { unstable_noStore as noStore } from "next/cache";

import { prisma } from "@/shared/lib/prisma";

import type { TeamItem } from "./team.types";
import { mapTeam } from "./team.mapper";

export const getTeams = async (): Promise<TeamItem[]> => {
  noStore();

  const rows = await prisma.team.findMany({
    orderBy: {
      order: "asc",
    },
  });

  return rows.map(mapTeam);
};

export const getTeamById = async (id: string): Promise<TeamItem | null> => {
  noStore();

  const row = await prisma.team.findUnique({
    where: {
      id,
    },
  });

  return row ? mapTeam(row) : null;
};

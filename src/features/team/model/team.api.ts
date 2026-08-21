import { apiClient } from "@/shared/api/client";
import type { TeamFormValues } from "@/entities/team/model/team.schema";
import type { TeamItem, TeamRow } from "@/entities/team/model/team.types";
import { mapTeam } from "@/entities/team/model/team.mapper";

const mapItemToRow = (
  data: TeamFormValues
): Omit<TeamRow, "createdAt" | "updatedAt"> => ({
  id: data.id,
  name: data.name,
  middlename: data.middlename,
  post: data.post,
  img: data.img,
  imgAlt: data.imgAlt,
});

export const teamApi = {
  list: async (): Promise<TeamItem[]> => {
    const { data } = await apiClient.get<TeamRow[]>("admin/teams");
    return data.map(mapTeam);
  },

  get: async (id: string): Promise<TeamItem> => {
    const { data } = await apiClient.get<TeamRow>(`admin/teams/${id}`);
    return mapTeam(data);
  },

  create: async (data: TeamFormValues): Promise<TeamItem> => {
    const { data: created } = await apiClient.post<TeamRow>(
      "admin/teams",
      mapItemToRow(data)
    );

    return mapTeam(created);
  },

  update: async (
    currentId: string,
    data: TeamFormValues
  ): Promise<TeamItem> => {
    const { data: updated } = await apiClient.patch<TeamRow>(
      `admin/teams/${currentId}`,
      mapItemToRow(data)
    );

    return mapTeam(updated);
  },

  remove: async (id: string): Promise<void> => {
    await apiClient.delete(`admin/teams/${id}`);
  },
};

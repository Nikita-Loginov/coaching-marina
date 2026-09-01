import { apiClient } from "@/shared/api/client";

import type { ProgramFormValues } from "@/entities/program/model/program.schema";
import type {
  ProgramItem,
  ProgramRow,
} from "@/entities/program/model/program.types";

import { mapProgram } from "@/entities/program/model/program.mapper";

const mapItemToRow = (
  data: ProgramFormValues
): Omit<ProgramRow, "createdAt" | "updatedAt"> => ({
  id: data.id,
  name: data.name,
  description: data.description,
  descriptionFull: data.descriptionFull,
  as: data.as,
  btnText: data.btnText,
  btnTextInner: data.btnTextInner,
  img: data.img,
  forWhom: data.forWhom,
  suitableRequests: data.suitableRequests,
  workflow: data.workflow,
  cooperationFormat: data.cooperationFormat,
  skills: data.skills,
  learningValue: data.learningValue,
  benefits: data.benefits,
  reviews: data.reviews,
  teamShowed: data.teamShowed,
  type: data.type,
});

export const programApi = {
  list: async (): Promise<ProgramItem[]> => {
    const { data } = await apiClient.get<ProgramRow[]>("admin/programs");

    return data.map(mapProgram);
  },

  get: async (id: string): Promise<ProgramItem> => {
    const { data } = await apiClient.get<ProgramRow>(`admin/programs/${id}`);

    return mapProgram(data);
  },

  create: async (data: ProgramFormValues): Promise<ProgramItem> => {
    const { data: created } = await apiClient.post<ProgramRow>(
      "admin/programs",
      mapItemToRow(data)
    );

    return mapProgram(created);
  },

  update: async (
    currentId: string,
    data: ProgramFormValues
  ): Promise<ProgramItem> => {
    const { data: updated } = await apiClient.patch<ProgramRow>(
      `admin/programs/${currentId}`,
      mapItemToRow(data)
    );

    return mapProgram(updated);
  },

  remove: async (id: string): Promise<void> => {
    await apiClient.delete(`admin/programs/${id}`);
  },
};

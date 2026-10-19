import { apiClient } from "@/shared/api/client";

import type { PersonFormValues } from "@/entities/person/model/person.schema";
import type {
  PersonItem,
  PersonRow,
} from "@/entities/person/model/person.types";

import { mapPerson } from "@/entities/person/model/person.mapper";

const mapItemToRow = (
  data: PersonFormValues
): Omit<PersonRow, "createdAt" | "updatedAt"> => ({
  id: "main",

  name: data.name,
  middlename: data.middlename,
  fullname: data.fullname,
  post: data.post,
  clients: data.clients,
  countAreas: data.countAreas,
  license: data.license,

  about: data.about,
  contacts: data.contacts,
  socials: data.socials,
  practice: data.practice,

  organization: data.organization,
  management: data.management,
  education: data.education,

  materialTechnicalSupport: data.materialTechnicalSupport,
  paidEducationalServices: data.paidEducationalServices,
  financialActivity: data.financialActivity,
  vacantPlaces: data.vacantPlaces,
  studentSupport: data.studentSupport,
  internationalCooperation: data.internationalCooperation,

  documents: data.documents,

  hero: data.hero,
});

const CHUNK_BYTES = 9 * 1024;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const splitBase64 = (text: string) => {
  const bytes = new TextEncoder().encode(text);
  const parts: string[] = [];

  for (let offset = 0; offset < bytes.length; offset += CHUNK_BYTES) {
    const slice = bytes.subarray(offset, offset + CHUNK_BYTES);
    let binary = "";

    for (const byte of slice) {
      binary += String.fromCharCode(byte);
    }

    parts.push(btoa(binary));
  }

  return parts;
};

const postPart = async (body: {
  mode: "chunk";
  uploadId: string;
  index: number;
  total: number;
  part: string;
}) => {
  let lastError: unknown;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      await apiClient.patch("/admin/orgs", body, { timeout: 30000 });
      return;
    } catch (error) {
      lastError = error;
      await sleep(400 * (attempt + 1));
    }
  }

  throw lastError;
};

export const orgsApi = {
  get: async (): Promise<PersonItem> => {
    const { data } = await apiClient.get<PersonRow>(
      "/admin/orgs"
    );

    return mapPerson(data);
  },

  update: async (
    data: PersonFormValues
  ): Promise<PersonItem> => {
    const parts = splitBase64(JSON.stringify(data));
    const uploadId = crypto.randomUUID();

    for (let index = 0; index < parts.length; index += 1) {
      await postPart({
        mode: "chunk",
        uploadId,
        index,
        total: parts.length,
        part: parts[index],
      });
    }

    const { data: updated } = await apiClient.patch<PersonRow>(
      "/admin/orgs",
      {
        mode: "complete",
        uploadId,
        total: parts.length,
      },
      { timeout: 60000 }
    );

    return mapPerson(updated);
  },
};
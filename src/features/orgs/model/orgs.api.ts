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
});

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
    const { data: updated } =
      await apiClient.patch<PersonRow>(
        "/admin/orgs",
        data
      );

    return mapPerson(updated);
  },
};
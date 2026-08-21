import type { PersonItem, PersonRow } from "./person.types";

export const mapPerson = (row: PersonRow): PersonItem => ({
  id: row.id,

  name: row.name,
  middlename: row.middlename,
  fullname: row.fullname,
  post: row.post,
  clients: row.clients,
  countAreas: row.countAreas,
  license: row.license,

  about: row.about as PersonItem["about"],
  contacts: row.contacts as PersonItem["contacts"],
  socials: row.socials as PersonItem["socials"],
  practice: row.practice as PersonItem["practice"],

  organization: row.organization as PersonItem["organization"],
  management: row.management as PersonItem["management"],
  education: row.education as PersonItem["education"],
  materialTechnicalSupport:
    row.materialTechnicalSupport as PersonItem["materialTechnicalSupport"],
  paidEducationalServices:
    row.paidEducationalServices as PersonItem["paidEducationalServices"],

  financialActivity: row.financialActivity as PersonItem["financialActivity"],
  vacantPlaces: row.vacantPlaces as PersonItem["vacantPlaces"],
  studentSupport: row.studentSupport as PersonItem["studentSupport"],
  internationalCooperation:
    row.internationalCooperation as PersonItem["internationalCooperation"],

  documents: row.documents as PersonItem["documents"],
});

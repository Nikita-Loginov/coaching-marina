import { z } from "zod";

const personAboutSchema = z.object({
  desc: z.array(z.string()),

  title: z.string().min(1, "Введите заголовок"),

  experience: z.string().min(1, "Введите опыт"),

  images: z.array(z.string()),
});

const personAddressSchema = z.object({
  label: z.string().min(1, "Введите адрес"),

  link: z.string().min(1, "Введите ссылку на карту"),
});

const personContactsSchema = z.object({
  email: z.string().min(1, "Введите email"),

  phone: z.string().min(1, "Введите телефон"),

  website: z.string().min(1, "Введите сайт"),

  address: personAddressSchema,
});

const personSocialsSchema = z.object({
  telegram: z.string(),

  vk: z.string(),
});

const personPracticeSchema = z.object({
  label: z.string().min(1, "Введите подпись"),

  experience: z.string().min(1, "Введите опыт"),

  clients: z.string().min(1, "Введите количество клиентов"),

  countAreas: z.coerce.number().min(0),
});

const personInfoItemSchema = z.object({
  title: z.string().min(1, "Введите заголовок"),

  description: z.string().min(1, "Введите описание"),
});

const personNestedItemSchema = z.object({
  title: z.string().min(1, "Введите заголовок"),

  items: z.array(personInfoItemSchema),
});

const personInfoSectionSchema = z.object({
  title: z.string().min(1, "Введите заголовок раздела"),

  items: z.array(z.union([personInfoItemSchema, personNestedItemSchema])),
});

const personDocumentSchema = z.object({
  id: z.string(),

  name: z.string().min(1, "Введите название документа"),

  description: z.array(z.string()),

  file: z.string().min(1, "Загрузите файл"),
});

export const personSchema = z.object({
  id: z.string(),

  name: z.string().min(1, "Введите имя"),

  middlename: z.string().min(1, "Введите отчество"),

  fullname: z.string().min(1, "Введите полное имя"),

  post: z.string().min(1, "Введите должность"),

  clients: z.string().min(1, "Введите количество клиентов"),

  countAreas: z.coerce.number().min(0),

  license: z.string().min(1, "Введите номер лицензии"),

  about: personAboutSchema,

  contacts: personContactsSchema,

  socials: personSocialsSchema,

  practice: personPracticeSchema,

  organization: personInfoSectionSchema,

  management: personInfoSectionSchema,

  education: personInfoSectionSchema,

  materialTechnicalSupport: personInfoSectionSchema,

  paidEducationalServices: personInfoSectionSchema,

  financialActivity: personInfoSectionSchema,

  vacantPlaces: personInfoSectionSchema,

  studentSupport: personInfoSectionSchema,

  internationalCooperation: personInfoSectionSchema,

  documents: z.array(personDocumentSchema),
});

export type PersonFormValues = z.infer<typeof personSchema>;
export type OrgsFormInput = z.input<typeof personSchema>;
export type OrgsFormValues = z.output<typeof personSchema>;
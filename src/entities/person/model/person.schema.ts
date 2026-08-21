import { z } from "zod";

const personInfoItemSchema = z.object({
  title: z.string().min(1, "Обязательное поле"),
  description: z.string().min(1, "Обязательное поле"),
});

const personNestedItemSchema = z.object({
  title: z.string().min(1, "Обязательное поле"),
  items: z.array(personInfoItemSchema),
});

const personInfoSectionSchema = z.object({
  title: z.string().min(1, "Обязательное поле"),

  items: z.array(z.union([personInfoItemSchema, personNestedItemSchema])),
});

const personDocumentSchema = z.object({
  id: z.string().min(1, "Обязательное поле"),
  name: z.string().min(1, "Обязательное поле"),
  description: z.array(z.string()),
  file: z.string().min(1, "Обязательное поле"),
});

export const personSchema = z.object({
  id: z
    .string()
    .min(1, "Обязательное поле")
    .regex(/^[a-z0-9-]+$/, "Только латиница в нижнем регистре, цифры и дефис"),

  name: z.string().min(1, "Обязательное поле"),

  middlename: z.string().min(1, "Обязательное поле"),

  fullname: z.string().min(1, "Обязательное поле"),

  post: z.string().min(1, "Обязательное поле"),

  clients: z.string().min(1, "Обязательное поле"),

  countAreas: z
    .number()
    .int("Должно быть целое число")
    .min(0, "Не может быть отрицательным"),

  about: z.object({
    desc: z.array(z.string().min(1)),
    title: z.string().min(1, "Обязательное поле"),
    experience: z.string().min(1, "Обязательное поле"),

    images: z.array(
      z.object({
        src: z.string().min(1, "Обязательное поле"),
        alt: z.string().min(1, "Обязательное поле"),
      })
    ),
  }),

  contacts: z.object({
    email: z.string().email("Некорректный email"),
    phone: z.string().min(1, "Обязательное поле"),
    website: z.string().url("Некорректный URL"),

    address: z.object({
      label: z.string().min(1, "Обязательное поле"),
      link: z.string().url("Некорректный URL"),
    }),
  }),

  socials: z.object({
    telegram: z.string().url("Некорректный URL"),
    vk: z.string().url("Некорректный URL"),
  }),

  practice: z.object({
    label: z.string().min(1, "Обязательное поле"),
    experience: z.string().min(1, "Обязательное поле"),
    clients: z.string().min(1, "Обязательное поле"),

    countAreas: z
      .number()
      .int("Должно быть целое число")
      .min(0, "Не может быть отрицательным"),
  }),

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

export type PersonFormInput = z.input<typeof personSchema>;

export const personUpdateSchema = personSchema;

export type PersonUpdateValues = z.infer<typeof personUpdateSchema>;

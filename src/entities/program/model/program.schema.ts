import { z } from "zod";

const programContentItemSchema = z.object({
  title: z.string().optional(),
  desc: z.array(z.string().min(1, "Обязательное поле")),
  as: z.enum(["default", "list"]).default("default"),
});

const programContentSchema = z.object({
  title: z.string().min(1, "Обязательное поле"),
  items: z.array(programContentItemSchema),
  showed: z.boolean().default(true),
  variant: z.enum(["small", "big"]).default("small"),
});

const reviewSchema = z.object({
  id: z.string().min(1, "Обязательное поле"),
  name: z.string().min(1, "Обязательное поле"),
  post: z.string().min(1, "Обязательное поле"),
  text: z.array(z.string()).optional(),
  personImgSrc: z.string().optional(),
  videoSrc: z.string().optional(),
  videoPoster: z.string().optional(),
  type: z.enum(["url", "vk"]),
});

export const programSchema = z.object({
  id: z
    .string()
    .min(1, "Обязательное поле")
    .regex(/^[a-z0-9-]+$/, "Только латиница в нижнем регистре, цифры и дефис"),

  name: z.string().min(1, "Обязательное поле"),

  description: z
    .array(z.string().min(1, "Обязательное поле"))
    .min(1, "Добавьте хотя бы одно описание"),

  descriptionFull: z
    .array(z.string().min(1, "Обязательное поле"))
    .min(1, "Добавьте хотя бы одно описание"),

  as: z.enum(["modal", "page"]),

  teamShowed: z.boolean().default(true),

  type: z.enum(["GENERAL", "EDUCATION"]).default("GENERAL"),

  btnText: z.string().min(1, "Обязательное поле"),

  btnTextInner: z.string().min(1, "Обязательное поле"),

  img: z.object({
    src: z.string().min(1, "Обязательное поле"),
    alt: z.string().min(1, "Обязательное поле"),
  }),

  forWhom: programContentSchema,

  suitableRequests: programContentSchema,

  workflow: programContentSchema,

  cooperationFormat: programContentSchema,

  skills: programContentSchema.optional(),

  learningValue: programContentSchema.optional(),

  benefits: programContentSchema,

  reviews: z.array(reviewSchema).optional(),
});

export type ProgramFormValues = z.infer<typeof programSchema>;

export type ProgramFormInput = z.input<typeof programSchema>;

export const programUpdateSchema = programSchema;

export type ProgramUpdateValues = z.infer<typeof programUpdateSchema>;

import { z } from "zod";

export const teamSchema = z.object({
  id: z
    .string()
    .min(1, "Обязательное поле")
    .regex(/^[a-z0-9-]+$/, "Только латиница в нижнем регистре, цифры и дефис"),
  name: z.string().min(1, "Обязательное поле"),
  middlename: z.string().min(1, "Обязательное поле"),
  desc: z.string().min(1, "Обязательное поле"),
  post: z.string().min(1, "Обязательное поле"),
  img: z.string().min(1, "Обязательное поле"),
  imgAlt: z.string().min(1, "Обязательное поле"),
});

export type TeamFormValues = z.infer<typeof teamSchema>;
export type TeamFormInput = z.input<typeof teamSchema>;

export const teamUpdateSchema = teamSchema;

export type TeamUpdateValues = z.infer<typeof teamUpdateSchema>;

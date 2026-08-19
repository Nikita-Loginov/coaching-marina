import z from "zod";

export const contactMessageSchema = z.object({
  name: z.string().trim().min(2, "Имя должно содержать минимум 2 символа"),

  email: z.string().trim().email("Введите корректный email адрес"),

  message: z
    .string()
    .trim()
    .min(2, "Сообщение должно содержать минимум 2 символа"),

  agree: z.boolean().refine((value) => value, {
    message: "Необходимо согласиться с обработкой персональных данных",
  }),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;

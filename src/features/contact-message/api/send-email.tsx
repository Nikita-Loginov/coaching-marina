"use server";

import { resend } from "@/shared/api/resend/client";
import { contactMessageSchema } from "../model/schema";
import { ContactEmailTemplate } from "../ui/contact-email-template/ContactEmailTemplate";
import { ContactMessageInput } from "../model/schema";

export async function sendEmail(data: ContactMessageInput) {
  
  try {
    const validatedData = contactMessageSchema.parse(data);
    const { name, email, message } = validatedData;

    const from = process.env.EMAIL_FROM;
    const to = process.env.EMAIL_TO;


    if (!from || !to) {
      console.error("Отсутствуют переменные окружения");
      return { 
        success: false, 
        error: "Отсутствуют переменные окружения EMAIL_FROM или EMAIL_TO" 
      };
    }

    const result = await resend.emails.send({
      from: from,
      to: [to],
      subject: `Сообщение от ${name}`,
      replyTo: email,
      react: <ContactEmailTemplate 
        message={message}
        senderEmail={email}
        senderName={name}
        senderMessage={message}
      />,
    });

    if (result.error) {
      return { 
        success: false, 
        error: `Resend error: ${result.error.message}` 
      };
    }

    return { success: true, data: result.data };

  } catch (error) {
    let errorMessage = "Неизвестная ошибка";
    if (error instanceof Error) {
      errorMessage = error.message;
      console.error("Stack trace:", error.stack);
    }
    
    return { 
      success: false, 
      error: `Ошибка: ${errorMessage}` 
    };
  }
}
import * as React from 'react';

import { EmailLayout } from "@/shared/ui/email/EmailLayout";
import { Text, Heading, Section } from "@react-email/components";

interface ContactFormTemplateProps {
  message: string;
  senderEmail: string;
  senderName: string;
  senderMessage: string;
}

export const ContactEmailTemplate = ({
  message,
  senderEmail,
  senderName,
  senderMessage,
}: ContactFormTemplateProps) => (
  <EmailLayout previewText={`Сообщение от ${senderName}`}>
    <Heading>Новое сообщение с сайта</Heading>
    <Section>
      <Text>{message}</Text>
    </Section>
    <Section>
      <Text>
        <strong>От:</strong> {senderName}
      </Text>
      <Text>
        <strong>Email:</strong> {senderEmail}
      </Text>

      <Text>
        <strong>Сообщение:</strong> {senderMessage}
      </Text>
    </Section>
  </EmailLayout>
);

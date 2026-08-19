import * as React from "react";
import { Html, Body, Container, Head, Preview } from "@react-email/components";

interface EmailLayoutProps {
  children: React.ReactNode;
  previewText?: string;
}

export const EmailLayout: React.FC<Readonly<EmailLayoutProps>> = ({
  children,
  previewText = "Сообщение от MySite",
}) => (
  <Html>
    <Head />
    <Preview>{previewText}</Preview>
    <Body>
      <Container>{children}</Container>
    </Body>
  </Html>
);

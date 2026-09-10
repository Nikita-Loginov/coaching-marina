import { Cta } from "@/shared/ui/index.ui";
import { CertificatesSection } from "@/widgets/certificates";

interface SvedeniyaLayoutProps {
  children: React.ReactNode;
}

export default function SvedeniyaLayout({ children }: SvedeniyaLayoutProps) {
  return (
    <>
      {children}

      <CertificatesSection />

      <Cta
        title={{
          label: "Остались вопросы?",
        }}
        desc={["Напишите нам — ответим в течение одного рабочего дня."]}
        btnInfo={{
          text: 'Написать'
        }}
      />
    </>
  );
}

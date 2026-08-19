import { Cta } from "@/shared/ui/index.ui";

interface SvedeniyaLayoutProps {
  children: React.ReactNode;
}

export default function SvedeniyaLayout({ children }: SvedeniyaLayoutProps) {
  return (
    <>
      {children}

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

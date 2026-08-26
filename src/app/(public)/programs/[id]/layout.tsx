import { Cta } from "@/shared/ui/index.ui";
import { TeamsSection } from "@/widgets/teams";

interface SvedeniyaLayoutProps {
  children: React.ReactNode;
}

export default function ProgramLayout({ children }: SvedeniyaLayoutProps) {
  return (
    <>
      {children}

      <TeamsSection />

      <Cta
        title={{
          label: "Готовы начать?",
          labelAccent: "Поговорим о вашем запросе.",
        }}
        desc={[
          "Первая встреча — разговор, не продажа. Мы хотим понять, подходим ли друг другу.",
        ]}

        btnInfo={{
          text: "Записаться на разговор",
        }}
      />
    </>
  );
}

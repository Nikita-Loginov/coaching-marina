import { Hero } from "@/shared/ui/index.ui";
import { HomeFagItems, HomeHeroContent } from "../lib/home.config";
import { Philosophy } from "./philosophy/Philosophy";
import { Challenge } from "./challenge/Challenge";
import { ProgramsSection } from "@/widgets/programs";
import { Solutions } from "./solutions/Solutions";
import { Fag } from "@/shared/ui/index.ui";
import { Cta } from "@/shared/ui/index.ui";

export const Home = () => {
  return (
    <>
      <Hero {...HomeHeroContent} />

      <Philosophy />

      <Challenge />

      <ProgramsSection />

      <Solutions />

      <Fag items={HomeFagItems} />

      <Cta
        title={{
          label: "Возможно, именно этот разговор станет началом ",
          labelAccent: "новых решений.",
        }}
        btnInfo={
          {
            text: 'Записаться на консультацию'
          }
        }
      />
    </>
  );
};

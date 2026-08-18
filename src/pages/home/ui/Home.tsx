import { Hero } from "@/shared/ui/index.ui";
import { HomeHeroContent } from "../lib/home.config";
import { Philosophy } from "./philosophy/Philosophy";
import { Challenge } from "./challenge/Challenge";
import { ProgramsSection } from "@/widgets/programs";

export const Home = () => {
  return (
    <>
      <Hero {...HomeHeroContent}/>

      <Philosophy />

      <Challenge />

      <ProgramsSection />
    </>
  );
};

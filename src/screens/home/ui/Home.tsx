import { getHomeHeroContent, HomeFagItems } from "../lib/home.config";
import { Philosophy } from "./philosophy/Philosophy";
import { Challenge } from "./challenge/Challenge";
import { About } from "./about/About";
import { ProgramsSection } from "@/widgets/programs";
import { Solutions } from "./solutions/Solutions";
import { Fag, Cta, Hero } from "@/shared/ui/index.ui";

import { getPerson } from "@/entities/person/model/person.queries";

export const Home = async () => {
  const person = await getPerson();

  if (!person) {
    return null;
  }

  const heroContent = getHomeHeroContent(person);


  return (
    <>
      <Hero {...heroContent} />

      <About />

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
        btnInfo={{
          text: "Записаться на консультацию",
        }}
      />
    </>
  );
};

export default Home;

import { getPerson } from "@/entities/person/model/person.queries";

import { SVEDENIYA_CONFIG } from "../lib/svedeniya.config";
import type { SvedeniyaId } from "../lib/svedeniya.config";

import { SvedeniyaInfo } from "./svedeniya-info/SvedeniyaInfo";

import { Hero } from "@/shared/ui/index.ui";

interface SvedeniyaProps {
  id: SvedeniyaId;
}

export const Svedeniya = async ({ id }: SvedeniyaProps) => {
  const person = await getPerson();

  if (!person) {
    return null;
  }

  const data = SVEDENIYA_CONFIG[id];

  const hero = data.getHero(person);

  return (
    <>
      <Hero {...hero} />

      <SvedeniyaInfo info={person} />
    </>
  );
};

export default Svedeniya;
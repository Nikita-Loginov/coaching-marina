import { SVEDENIYA_CONFIG } from "../lib/svedeniya.config";
import type { SvedeniyaId } from "../lib/svedeniya.config";

import { SvedeniyaInfo } from "./svedeniya-info/SvedeniyaInfo";

import { Hero } from "@/shared/ui/index.ui";

interface SvedeniyaProps {
  id: SvedeniyaId;
}

export const Svedeniya = ({ id }: SvedeniyaProps) => {
  const data = SVEDENIYA_CONFIG[id];
 
  return (
    <>
      <Hero {...data.hero} />

      <SvedeniyaInfo info={data.info}/>
    </>
  );
};

export default Svedeniya;

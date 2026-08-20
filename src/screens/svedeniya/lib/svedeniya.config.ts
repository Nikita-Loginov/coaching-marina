import {
  PERSON_CONFIG,
  LICENSE_NUMBER,
} from "../../../shared/config/person.config";

import { Images } from "@/shared/images/index.images";

import type { HeroProps } from "@/shared/ui/index.ui";

interface SvedeniyaConfig {
  hero: HeroProps;
  info: typeof PERSON_CONFIG
}

export const SVEDENIYA_CONFIG = {
  "obrazovatelnoj-organizacii": {
    hero: {
      title: {
        label: "Сведения об образовательной",
        labelAccent: "организации",
        variant: 'h2'
      },
      desc: [
        "Эта страница содержит официальные сведения об образовательной деятельности, правовые документы и информацию об организации в соответствии с требованиями законодательства Российской Федерации.",
      ],
      badge: "Официальная информация",
      img: {
        src: Images.MarinaOne,
        alt: "Фотография Марины",
      },
      itemsImg: [
        {
          title: "Лицензия",
          desc: `№ ${LICENSE_NUMBER}`,
        },
      ],
    },
    info: PERSON_CONFIG
  },
} satisfies Record<string, SvedeniyaConfig>;

export type SvedeniyaId = keyof typeof SVEDENIYA_CONFIG;

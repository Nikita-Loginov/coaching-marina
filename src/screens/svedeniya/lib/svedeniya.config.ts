import { Images } from "@/shared/images/index.images";

import type { PersonItem } from "@/entities/person/model/person.types";
import type { HeroProps } from "@/shared/ui/index.ui";

interface SvedeniyaConfig {
  getHero: (person: PersonItem) => HeroProps;
}

export const SVEDENIYA_CONFIG = {
  "obrazovatelnoj-organizacii": {
    getHero: (person) => ({
      title: {
        label: "Сведения об образовательной",
        labelAccent: "организации",
        variant: "h2",
      },
      desc: [
        "Эта страница содержит официальные сведения об образовательной деятельности, правовые документы и информацию об организации в соответствии с требованиями законодательства Российской Федерации.",
      ],
      badge: "Официальная информация",
      img: {
        src: Images.MarinaOne,
        alt: `Фотография ${person.name} ${person.middlename}`,
      },
      itemsImg: [
        {
          title: "Лицензия",
          desc: person.license,
        },
      ],
    }),
  },
} satisfies Record<string, SvedeniyaConfig>;

export type SvedeniyaId = keyof typeof SVEDENIYA_CONFIG;

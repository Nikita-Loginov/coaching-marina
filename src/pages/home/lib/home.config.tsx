import { Images } from "@/shared/images/index.images";

import { PERSON_CONFIG } from "@/shared/config/person.config";

import { Button } from "@/shared/ui/index.ui";

import { HeroProps } from "@/shared/ui/index.ui";

import scss from "../ui/Home.module.scss";

export const HomeHeroContent: HeroProps = {
  title: {
    label: "Ясность",
    labelAccent: "решений.",
  },
  desc: [
    "Мы создаем пространство, где неопределенность становится ясностью, а сложные вызовы превращаются в точные решения.",
  ],
  img: {
    src: Images.MarinaOne,
    alt: `Фотография ${PERSON_CONFIG.name} ${PERSON_CONFIG.middlename}`,
  },
  itemsImg: [
    {
      title: "Опыт",
      desc: `${PERSON_CONFIG.practice.experience} ${PERSON_CONFIG.practice.label}`,
    },
    {
      title: PERSON_CONFIG.post,
      desc: "Сертифицированный executive-коуч",
    },
  ],
  bottomInfo: {
    position: "left",
    content: (
      <div className={scss["home__btns"]}>
        <Button size="medium" theme="primary">
          <p className="p2">Записаться на консультацию</p>
        </Button>

        <Button size="medium" theme="secondary" as="link" to="#philosophy">
          <p className="p2">Узнать подход</p>
        </Button>
      </div>
    ),
  },
};

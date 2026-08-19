import { Images } from "@/shared/images/index.images";
import { Icons } from "@/shared/icons/index.icons";

import { PERSON_CONFIG } from "@/shared/config/person.config";

import { Button } from "@/shared/ui/index.ui";

import type { AccordeonItem, HeroProps } from "@/shared/ui/index.ui";

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
        <Button size="medium" theme="primary" iconRight={<Icons.ArrowRight />} iconSize="medium">
          <p className="p2">Записаться на консультацию</p>
        </Button>

        <Button size="medium" theme="secondary" as="link" to="#philosophy">
          <p className="p2">Узнать подход</p>
        </Button>
      </div>
    ),
  },
};

export const HomeFagItems: AccordeonItem[] = [
  {
    key: "1",
    label: "С какими запросами вы работаете?",
    children: (
      <>
        <p className="p2">
          Мы работаем с вопросами лидерства, выгорания, стратегических изменений
          и выстраивания коммуникации внутри команд.
        </p>
      </>
    ),
  },
  {
    key: "2",
    label: "Как проходит первая встреча?",
    children: (
      <>
        <p className="p2">
          Первая встреча — это ознакомительный диалог. Мы знакомимся, обсуждаем
          вашу ситуацию и понимаем, насколько наши подходы совпадают.
        </p>
      </>
    ),
  },
  {
    key: "3",
    label: "Возможна ли работа в онлайн-формате?",
    children: (
      <>
        <p className="p2">
          Да, мы проводим сессии как в нашем офисе в Москве, так и в безопасном
          онлайн-пространстве для клиентов по всему миру.
        </p>
      </>
    ),
  },
];

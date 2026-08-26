import { Images } from "@/shared/images/index.images";

import HomeHeroButtons from "../ui/home-hero-buttons/HomeHeroButtons";

import type { AccordeonItem, HeroProps } from "@/shared/ui/index.ui";
import type { PersonItem } from "@/entities/person/model/person.types";

export const getHomeHeroContent = (
  person: PersonItem,
): HeroProps => ({
  title: {
    label: "Ясность",
    labelAccent: "решений.",
  },

  desc: [
    "Сильное решение начинается с точного ответа на вопрос, что действительно требует решения. Чем выше ставки, тем важнее не ошибиться в главном.",
    "Для меня коучинг собственников бизнеса и топ-менеджеров - это партнерство в мышлении там, где нет простых ответов, где можно выйти за границы привычного взгляда, увидеть суть и найти сильное решение, какими бы сложными ни были обстоятельства."
  ],

  img: {
    src: Images.MarinaOne,
    alt: `Фотография ${person.name} ${person.middlename}`,
  },

  itemsImg: [
    {
      title: "Опыт",
      desc: `${person.practice.experience} ${person.practice.label}`,
    },
    {
      title: person.post,
      desc: "Сертифицированный executive-коуч",
    },
  ],

  bottomInfo: {
    position: "left",
    content: <HomeHeroButtons />,
  },
});

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

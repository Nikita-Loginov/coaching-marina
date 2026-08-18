import { Container } from "@/shared/ui/index.ui";

import { ProgramCard } from "@/entities/program/ui";

import type { ProgramItem } from "@/entities/program/model/program.types";

import { Images } from "@/shared/images/index.images";

import scss from "./ProgramsSection.module.scss";

const PROGRAMS_ITEMS: ProgramItem[] = [
  {
    id: "1",
    name: "Индивидуальный коучинг",
    description: [
      "Для тех, кто ищет ясность, уверенность и личный рост. Мы создаем безопасное пространство для исследования ваших истинных мотивов, снятия внутренних барьеров и перехода на новый уровень масштаба.",
    ],
    as: "modal",
    btnText: "Подробнее о формате",
    img: {
      src: Images.IndividualCoaching,
      alt: "Индивидуальный коучинг",
    },
  },
  {
    id: "2",
    name: "Командный коучинг",
    description: [
      "Для лидеров и организаций. Мы выстраиваем процессы взаимодействия, где каждый участник усиливает систему. Работа с конфликтами, синхронизация видения и создание культуры доверия.",
    ],
    as: "modal",
    btnText: "Усилить команду",
    img: {
      src: Images.TeamCoaching,
      alt: "Командный коучинг",
    },
  },
  {
    id: "3",
    name: "Программы обучения",
    description: [
      "Образовательные форматы, которые меняют мышление. Развитие лидерских компетенций, эмоционального интеллекта и навыков управления изменениями через глубокий практический опыт.",
    ],
    as: "page",
    btnText: "Изучить программы",
    img: {
      src: Images.ProgramsCoaching,
      alt: "Программы обучения",
    },
  },
];

const CHAPTER_NAMES = [
  "первая",
  "вторая",
  "третья",
  "четвертая",
  "пятая",
  "шестая",
  "седьмая",
  "восьмая",
  "девятая",
  "десятая",
];

export const ProgramsSection = async () => {
  return (
    <section className={scss["programs"]} id="programs">
      <Container>
        <div className={scss["programs__inner"]}>
          <div className={scss["programs__items"]}>
            {PROGRAMS_ITEMS.map((program, index) => {
              const chapterNumber = index + 1;
              const chapter = CHAPTER_NAMES[index] ?? `${chapterNumber}-я`;

              return (
                <ProgramCard
                  key={program.id}
                  card={{
                    ...program,
                    badge: `${String(chapterNumber).padStart(
                      2,
                      "0"
                    )} — Глава ${chapter}`,
                  }}
                />
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

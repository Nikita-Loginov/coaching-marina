import classNames from "classnames";

import { Container, TopInner } from "@/shared/ui/index.ui";

import scss from "./Solutions.module.scss";

const SOLUTIONS_ITEMS: {
  title: string;
  desc: string[];
  theme?: "default" | "accent";
}[] = [
    {
        title: "Знакомство",
        desc: [
          "Первый разговор — без повестки и давления. Мы слушаем, чтобы понять контекст, ценности и то, что стоит за вашим запросом. Это пространство для честного диалога, а не интервью.",
        ],
      },
      {
        title: "Диагностика",
        desc: [
          "Вместе исследуем текущую ситуацию: что происходит на поверхности и что лежит в основе. Выявляем паттерны, ресурсы и точки, где изменение возможно уже сейчас.",
        ],
      },
      {
        title: "Постановка целей",
        desc: [
          "Формулируем, что вы хотите получить — не как задачу, а как образ. Чёткий, живой и ваш. Именно это направление становится компасом для всей последующей работы.",
        ],
        theme: "accent",
      },
      {
        title: "Совместная работа",
        desc: [
          "Регулярные сессии, в которых вы движетесь вперёд. Каждая встреча — отдельный мир с вопросами, инсайтами и конкретными шагами. Темп и глубина — ваши.",
        ],
      },
      {
        title: "Измеримый результат",
        desc: [
          "Фиксируем пройденный путь, изменения в мышлении и конкретные достижения. Трансформация становится видимой — для вас, для вашей команды, для вашей жизни.",
        ],
      },
];

export const Solutions = () => {
  return (
    <section className={scss["solutions"]} id="solutions">
      <Container>
        <TopInner
          items={[
            {
              label: "Как мы работаем",
            },
            {
              title: {
                label: "Путь",
                labelAccent: "изменений",
              },
              desc: [
                <p className={scss["solutions__text"]}>
                  Каждый этап — осознанный шаг, <br /> а не случайное событие.
                </p>,
              ],
              positionX: "row",
            },
          ]}
        >
          <div className={scss["solutions__content"]}>
            <div className={scss["solutions__items"]}>
              {SOLUTIONS_ITEMS.map((solution, index) => {
                const { title, desc, theme = "default" } = solution;

                return (
                  <div
                    className={classNames(
                      scss["solutions__card"],
                      scss[`solutions__card--${theme}`]
                    )}
                    key={index}
                  >
                    <div className={scss["solutions__card-number"]}>
                      {(index + 1).toString().padStart(2, "0")}
                    </div>

                    <div className={scss["solutions__card-content"]}>
                      <p className={scss["solutions__card-title"]}>{title}</p>

                      <div
                        className={classNames(
                          scss["solutions__card-desc"],
                          "textbox"
                        )}
                      >
                        {desc.map((text, index) => {
                          return (
                            <p className="p3" key={index}>
                              {text}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </TopInner>
      </Container>
    </section>
  );
};

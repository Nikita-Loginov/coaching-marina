import classNames from "classnames";

import { Container, TopInner } from "@/shared/ui/index.ui";

import scss from "./Challenge.module.scss";

const CHALLENGE_ITEMS: {
  title: string;
  desc: string[];
}[] = [
  {
    title: "Сложные решения",
    desc: ["Ясный план действий"],
  },
  {
    title: "Конфликты",
    desc: ["Конструктивный диалог"],
  },
  {
    title: "Неуверенность",
    desc: ["Внутренняя опора"],
  },
  {
    title: "Отсутствие направления",
    desc: ["Понимание шага"],
  },
];

export const Challenge = () => {
  return (
    <section className={scss["challenge"]}>
      <Container>
        <TopInner
          items={[
            {
              title: {
                label: "От вызова к ясности",
              },
              desc: [
                "Трансформация — это не просто движение вперед. Это изменение качества вашего состояния в каждой ситуации.",
              ],
            },
          ]}
        >
          <div className={scss["challenge__items"]}>
            {CHALLENGE_ITEMS.map((item) => {
              const { title, desc } = item;

              return (
                <div className={scss["challenge__card"]} key={item.title}>
                  <div className={scss["challenge__card-item"]}>
                    <div className={scss["challenge__card-content"]}>
                      <p className={classNames(scss["challenge__card-title"])}>
                        {title}
                      </p>
                    </div>

                    <div className={scss["challenge__card-content"]}>
                      <div
                        className={classNames(
                          "textbox",
                          scss["challenge__card-textbox"]
                        )}
                      >
                        {desc.map((text, index) => {
                          return <p key={index}>{text}</p>;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </TopInner>
      </Container>
    </section>
  );
};

export default Challenge

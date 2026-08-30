import classNames from "classnames";

import { Container, TopInner, CardBox } from "@/shared/ui/index.ui";

import scss from "./Principles.module.scss";

const principlesItems = [
  {
    title: "Честность",
    desc: [
      "Открытость и прямота как основа доверия и профессиональных отношений.",
    ],
  },
  {
    title: "Конфиденциальность ",
    desc: ["Все, что обсуждается в работе, остается конфиденциальным."],
  },
  {
    title: "Партнерство",
    desc: [
      "Ясность целей, договоренностей и ответственности каждой стороны за результат работы.",
    ],
  },
  {
    title: "Достоинство",
    desc: [
      "Уважение к личности, ценностям, выбору и ответственности клиента за собственные решения.",
    ],
  },
  {
    title: "Компетентность",
    desc: [
      "Поддержание высокого уровня профессиональных знаний, навыков и качества практики.",
    ],
  },
];


export const Principles = () => {
  return (
    <section className={scss["principles"]}>
      <Container>
        <TopInner
          items={[
            {
              label: "Принципы работы",
              title: {
                label: "Мой Этический",
                labelAccent: "кодекс",
              },
            },
          ]}
        >
          <div className={scss["principles__content"]}>
            <div className={scss["principles__items"]}>
              {principlesItems.map((item) => {
                const { title, desc } = item;

                return (
                  <CardBox key={title} className={scss['principles__item']}>
                    <p className="p1">{title}</p>

                    <div className={classNames("textbox", "textbox--second")}>
                      {desc.map((text, index) => {
                        return (
                          <p className="p3" key={index}>
                            {text}
                          </p>
                        );
                      })}
                    </div>
                  </CardBox>
                );
              })}
            </div>
          </div>
        </TopInner>
      </Container>
    </section>
  );
};

export default Principles;

import classNames from "classnames";

import { Container, TopInner } from "@/shared/ui/index.ui";

import { getPerson } from "@/entities/person/model/person.queries";

import scss from "./Statistics.module.scss";

export const Statistics = async () => {
  const person = await getPerson();

  const statisticsItems = [
    {
      num: person?.about.experience,
      suffix: "лет",
      desc: ["управленческий опыт"],
    },
    {
      num: person?.clients,
      suffix: "+",
      desc: ["участников программ и тренингов"],
    },
    {
      num: "100",
      suffix: "+",
      desc: ["лидеров, с которыми достигнуты результаты"],
    },
    {
      num: "7",
      suffix: "стран",
      desc: ["международная география клиентов"],
    },
  ];

  return (
    <section className={scss["statistics"]}>
      <Container>
        <TopInner
          items={[
            {
              label: "Масштаб",
              title: {
                label: "Экспертиза",
                labelAccent: "в цифрах",
              },
            },
          ]}
        >
          <div className={scss["statistics__content"]}>
            <div className={scss["statistics__items"]}>
              {statisticsItems.map((item, index) => {
                const { num, suffix, desc } = item;

                return (
                  <div className={scss["statistics__item"]} key={index}>
                    <div className={scss["statistics__item-number"]}>
                      <span>{num}</span>

                      <span className={scss["statistics__item-number-suffix"]}>{suffix}</span>
                    </div>

                    <div className={classNames("textbox", "textbox--second")}>
                      {desc.map((text, index) => {
                        return (
                          <p className="p1" key={index}>
                            {text}
                          </p>
                        );
                      })}
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

export default Statistics;

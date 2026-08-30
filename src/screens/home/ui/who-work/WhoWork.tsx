import { Container, TopInner, ListNumber, CardBox } from "@/shared/ui/index.ui";

import type { ListNumberProps } from "@/shared/ui/index.ui";

import scss from "./WhoWork.module.scss";

const WHO_LIST_ITEMS = [
  {
    label: [
      <p className="p1">
        С собственниками бизнесов и предпринимателями, которым нужен надежный
        партнер по мышлению, <br /> для принятия стратегических решений, трансформации
        компании и усиления управленческой команды.
      </p>,
    ],
    title: "Собственники & Предприниматели",
  },
  {
    label: [
      <p className="p1">
        С топ-менеджерами, кто отвечает <br /> за стратегические изменения, риски <br /> и
        результаты команд в условиях высокой неопределенности.
      </p>,
    ],
    title: "Топ-менеджмент",
  },
  {
    label: [
      <p className="p1">
        С управленческими командами, <br /> которым необходимо повысить качество
        взаимодействия, <br /> укрепить доверие и объединиться вокруг целей бизнеса.
      </p>,
    ],
    title: "Управленческие команды",
  },
];

export const WhoWork = () => {
  return (
    <section className={scss["who-work"]}>
      <Container>
        <CardBox className={scss["who-work__inner"]}>
          <TopInner
            items={[
              {
                label: "Аудитория",
                title: {
                  label: "С кем мы",
                  labelAccent: "работаем",
                },
              },
            ]}
          />

          <div className={scss["who-work__box"]}>
            <div className={scss["who-work__content"]}>
              <ul className={scss["who-work__list"]}>
                {WHO_LIST_ITEMS.map((item, index) => {
                  const { title, label } = item;

                  return (
                    <li className={scss["who-work__item"]} key={index}>
                      <div className={scss["who-work__item-content"]}>
                        <p className="p3 primary-color-40 uppercase-text">
                          {title}
                        </p>

                        <div className={scss["who-work__item-textbox"]}>
                          {label.map((item, index) => (
                            <div key={index}>{item}</div>
                          ))}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </CardBox>
      </Container>
    </section>
  );
};

export default WhoWork;

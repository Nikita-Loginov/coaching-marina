import { Container, TopInner, ListNumber, CardBox } from "@/shared/ui/index.ui";

import type { ListNumberProps } from "@/shared/ui/index.ui";

import { preventOrphans } from "../../../../shared/utils/preventOrphans.util";

import scss from "./WhoWork.module.scss";

const WHO_LIST_ITEMS = [
  {
    label: (
      <p className="p1">
        {preventOrphans(
          "С собственниками бизнесов и предпринимателями, которым нужен"
        )}
        <br />
        {preventOrphans(
          "надежный партнер по мышлению, "
        )}
        <br />
        {preventOrphans(
          "для принятия стратегических решений, трансформации компании и усиления управленческой команды"
        )}
      </p>
    ),
    title: "Собственники и Предприниматели",
  },
  {
    label: (
      <p className="p1">
        {preventOrphans("С топ-менеджерами, кто отвечает ")}
        <br />
        {preventOrphans("за стратегические изменения, ")}
        <br />
        {preventOrphans("риски и результаты команд")}
        <br />
        {preventOrphans("в среде высокой неопределенности")}
      </p>
    ),
    title: "Топ-менеджеры",
  },
  {
    label: (
      <p className="p1">
        {preventOrphans("С управленческими командами, ")}
        <br />
        {preventOrphans("которым необходимо повысить ")}
        <br />
        {preventOrphans("качество взаимодействия, ")}
        <br />
        {preventOrphans("укрепить доверие ")}
        <br />
        {preventOrphans("и объединиться вокруг целей бизнеса")}
      </p>
    ),
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
                label: "Наши клиенты",
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
                        {/* <p className="p3 primary-color-40 uppercase-text">
                          {title}
                        </p> */}

                        <div className={scss["who-work__item-textbox"]}>
                          {label}
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

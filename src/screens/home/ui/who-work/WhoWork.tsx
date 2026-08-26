import { Container, TopInner, ListNumber } from "@/shared/ui/index.ui";

import type { ListNumberProps } from "@/shared/ui/index.ui";

import scss from "./WhoWork.module.scss";

const whoWorkListInfo: ListNumberProps = {
  items: [
    {
      label:
        "С собственниками бизнесов и предпринимателями, которым нужен надежный партнер по мышлению для принятия стратегических решений, трансформации компании и усиления управленческой команды.",
    },
    {
      label:
        "С топ-менеджерами, кто отвечает за стратегические изменения, риски и результаты команд в условиях высокой неопределенности.",
    },
    {
      label:
        "С управленческими командами, которым необходимо повысить качество взаимодействия, укрепить доверие и объединиться вокруг целей бизнеса.",
    },
  ],
};

export const WhoWork = () => {
  return (
    <section className={scss["who-work"]}>
      <Container>
        <div className={scss["who-work__inner"]}>
          <TopInner
            items={[
              {
                label: "С кем работаем",
              },
            ]}
          ></TopInner>
          <div className={scss["who-work__box"]}>
            <TopInner
              items={[
                {
                  title: {
                    label: "Для тех,",
                    labelAccent: "кто принимает решения",
                  },
                },
              ]}
            ></TopInner>

            <div className={scss["who-work__content"]}>
              <ListNumber {...whoWorkListInfo} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhoWork;

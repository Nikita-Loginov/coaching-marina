import { Container, TopInner, ListDots, CardBox } from "@/shared/ui/index.ui";

import scss from "./Tasks.module.scss";

export const Tasks = () => {
  return (
    <section className={scss["tasks"]}>
      <Container>
        <CardBox className={scss["tasks__inner"]} variant="big">
          <div className={scss["tasks__info"]}>
            <TopInner
              items={[
                {
                  label: "Специфика",
                  title: {
                    label: "С какими задачами к нам обращаются?",
                  },
                },
              ]}
            ></TopInner>

            <div className="textbox textbox--second">
              <p className="p2">Работаем с ситуациями, когда:</p>
            </div>
          </div>

          <div className={scss["tasks__content"]}>
            <ListDots
              items={[
                {
                  label:
                    "требуется разобраться в сложной ситуации, где цена ошибки особенно высока",
                },
                {
                  label: "прежние управленческие методы перестали работать",
                },
                {
                  label:
                    "большинство решений замыкается на первом лице компании",
                },
                {
                  label: "команда не оправдывает ожиданий",
                },
                {
                  label: "планируются или внедряются изменения",
                },
                {
                  label: "готовятся к сложным переговорам",
                },
                {
                  label: "важно переосмыслить будущее",
                },
                {
                  label:
                    "необходимо получить независимый взгляд и вести разговор на равных",
                },
              ]}
              listClassName={scss["tasks__list"]}
            />
          </div>
        </CardBox>
      </Container>
    </section>
  );
};

export default Tasks;

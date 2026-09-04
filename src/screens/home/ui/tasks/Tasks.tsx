import { Container, TopInner, ListDots, CardBox } from "@/shared/ui/index.ui";
import {
  CircleAlert,
  RefreshCcw,
  Target,
  Users,
  GitBranch,
  MessagesSquare,
  Compass,
  Eye,
} from "lucide-react";

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
                  icon: <CircleAlert />,
                },
                {
                  label: "прежние управленческие методы перестали работать",
                  icon: <RefreshCcw />,
                },
                {
                  label:
                    "большинство решений замыкается на первом лице компании",
                  icon: <Target />,
                },
                {
                  label: "команда не оправдывает ожиданий",
                  icon: <Users />,
                },
                {
                  label: "планируются или внедряются изменения",
                  icon: <GitBranch />,
                },
                {
                  label: "готовятся к сложным переговорам",
                  icon: <MessagesSquare />,
                },
                {
                  label: "важно переосмыслить будущее",
                  icon: <Compass />,
                },
                {
                  label:
                    "необходимо получить независимый взгляд и вести разговор на равных",
                  icon: <Eye />,
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

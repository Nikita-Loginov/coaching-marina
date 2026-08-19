import { AccordeonItem } from "../accordeon/Accordeon";
import { TopInner, Container, Accordeon } from "../index.ui";

import scss from "./Fag.module.scss";

interface FagProps {
  items: AccordeonItem[];
}

export const Fag = ({items}: FagProps) => {
  return (
    <section className={scss["fag"]} id="fag">
      <Container>
        <TopInner
          items={[
            {
              title: {
                label: "Частые вопросы",
              },
              positionY: "center",
            },
          ]}
          className={scss['fag__top']}
        >
          <Accordeon items={items} accordion={true} defaultActiveKey={[]} />
        </TopInner>
      </Container>
    </section>
  );
};

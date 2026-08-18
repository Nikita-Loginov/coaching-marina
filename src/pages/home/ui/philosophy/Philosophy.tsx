import { Container, TopInner } from "@/shared/ui/index.ui";

import scss from "./Philosophy.module.scss";

const PHILOSOPHY_TITLIES = [
  "Каждый человек уже обладает ресурсами для изменений.",
  "Настоящие решения рождаются через осознанность.",
  "Диалог меняет больше, чем инструкции.",
];

export const Philosophy = () => {
  return (
    <section className={scss["philosophy"]} id="philosophy">
      <Container>
        <TopInner
          items={[
            {
              label: "Философия",
              positionY: "center",
            },
          ]}
          className={scss["philosophy__inner"]}
        >
          <div className={scss["philosophy__content"]}>
            <div className={scss["philosophy__items"]}>
                {PHILOSOPHY_TITLIES.map((title, index) => {
                    return <h2 className="h3" key={index}>{title}</h2>
                })}
            </div>
          </div>
        </TopInner>
      </Container>
    </section>
  );
};

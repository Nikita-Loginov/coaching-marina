import classNames from "classnames";

import { Container, TopInner } from "@/shared/ui/index.ui";

import { getPerson } from "@/entities/person/model/person.queries";

import scss from "./Philosophy.module.scss";

const PHILOSOPHY_TITLE = [
  "Мы повышаем культуру менеджмента",
  "и качество деловой среды",
];

export const Philosophy = async () => {
  const person = await getPerson();

  if (!person) {
    return null;
  }

  return (
    <section className={scss["philosophy"]} id="philosophy">
      <Container>
        <div className={scss["philosophy__inner"]}>
          <div className={scss["philosophy__top"]}>
            <p className={classNames("p4", scss["philosophy__label"])}>
              Наша миссия
            </p>

            <p className="p3 primary-color-70">
              - {person.name} {person.middlename}
            </p>
          </div>

          <div className={scss["philosophy__content"]}>
            <h2 className={classNames("h1", scss["philosophy__title"])}>
              {PHILOSOPHY_TITLE.map((title, index) => {
                const isFirst = index === 0;
                const isLast = index === PHILOSOPHY_TITLE.length - 1;

                return (
                  <span
                    style={{ "--index": index } as React.CSSProperties}
                    key={index}
                  >
                    {isFirst && "«"} {title} {isLast && "»"}
                  </span>
                );
              })}
            </h2>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Philosophy;

import classNames from "classnames";

import { Container } from "@/shared/ui/index.ui";

import scss from "./ProgramInfo.module.scss";

import type {
  ProgramContent,
  ProgramItem,
} from "@/entities/program/model/program.types";

interface ProgramInfoProps {
  program: ProgramItem;
}

type ProgramInfoItem = ProgramContent & {
  variant?: "active";
};

export const ProgramInfo = ({ program }: ProgramInfoProps) => {
  const { forWhom, suitableRequests, workflow, cooperationFormat, benefits } =
    program;

  const programItems: ProgramInfoItem[] = [
    forWhom,
    suitableRequests,
    {
      ...workflow,
      variant: "active",
    },
    cooperationFormat,
    benefits,
  ];

  return (
    <section className={scss["program-info"]}>
      <Container>
        <div className={scss["program-info__inner"]}>
          <div className={scss["program-info__items"]}>
            {programItems.map((programItem) => {
              return (
                <div
                  className={classNames(
                    scss["program-info__item"],
                    programItem?.variant === "active"
                      ? scss["program-info__item--active"]
                      : null
                  )}
                >
                  <p className={scss["program-info__item-title"]}>
                    {programItem.title}
                  </p>

                  <div className={scss["program-info__item-boxs"]}>
                    {programItem.items.map((item) => {
                      const { title, desc, as = "default" } = item;

                      return as === "default" ? (
                        <div className={scss["program-info__item-block"]}>
                          {title ? (
                            <p className="p2 font-text-second">{title}</p>
                          ) : null}

                          <div
                            className={classNames(
                              "textbox textbox--second",
                              scss["program-info__item-desc"]
                            )}
                          >
                            {desc.map((text, index) => {
                              return (
                                <p className={"p3"} key={index}>
                                  {text}
                                </p>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <ul className={scss["program-info__item-list"]}>
                          {desc.map((text, index) => {
                            return (
                              <li
                                className={scss["program-info__item-link"]}
                                key={index}
                              >
                                <p className="p1">{text}</p>
                              </li>
                            );
                          })}
                        </ul>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProgramInfo;

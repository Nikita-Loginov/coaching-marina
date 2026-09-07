import classNames from "classnames";

import { Container } from "@/shared/ui/index.ui";

import scss from "./ProgramInfo.module.scss";

import type {
  ProgramContent,
  ProgramItem,
} from "@/entities/program/model/program.types";

import { ContactMessageBtn } from "@/features/contact-message/ui/contact-message-btn/ContactMessageBtn";

interface ProgramInfoProps {
  program: ProgramItem;
}

type ProgramInfoItem = ProgramContent;

export const ProgramInfo = ({ program }: ProgramInfoProps) => {
  const { forWhom, suitableRequests, workflow, cooperationFormat, benefits, btnTextInner } =
    program;

  const programItems = [
    {
      key: "forWhom",
      content: forWhom,
    },
    {
      key: "suitableRequests",
      content: suitableRequests,
    },
    {
      key: "workflow",
      content: {
        ...workflow,
        // variant: "active",
      },
    },
    {
      key: "cooperationFormat",
      content: cooperationFormat,
    },
    {
      key: "benefits",
      content: benefits,
    },
  ];

  return (
    <section className={scss["program-info"]}>
      <Container>
        <div className={scss["program-info__inner"]}>
          <div className={scss["program-info__items"]}>
            {programItems.map((programItem, index) => {
              const { key, content } = programItem;

              if (!content?.showed) return null;

              const isCooperationFormat = key === "cooperationFormat";

              return (
                <div
                  className={classNames(
                    scss["program-info__item"],
                    content?.variant === "big"
                      ? scss["program-info__item--active"]
                      : null,
                    content?.variant === "center"
                      ? scss["program-info__item--center"]
                      : null
                  )}
                >
                  <p className={scss["program-info__item-title"]}>
                    {content.title}
                  </p>

                  <div className={scss["program-info__item-boxs"]}>
                    {content.items.map((item) => {
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
                                <p className={"p2"} key={index}>
                                  {text}
                                </p>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div className={scss["program-info__item-block"]}>
                          {title ? (
                            <p className="p2 font-text-second">{title}</p>
                          ) : null}

                          <ul className={scss["program-info__item-list"]}>
                            {desc.map((text, index) => {
                              return (
                                <li
                                  className={scss["program-info__item-link"]}
                                  key={index}
                                >
                                  <p className="p2">{text}</p>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    })}
                  </div>

                  {isCooperationFormat && (
                    <div className={scss["program-info__item-btns"]}>
                      <ContactMessageBtn theme="primary" size="medium">
                        <p className="p2">{btnTextInner}</p>
                      </ContactMessageBtn>
                    </div>
                  )}
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

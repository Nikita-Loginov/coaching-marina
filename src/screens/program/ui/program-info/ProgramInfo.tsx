import classNames from "classnames";

import { Container } from "@/shared/ui/index.ui";

import scss from "./ProgramInfo.module.scss";

import {
  cardButtonPreset,
  withCardButton,
  type ProgramContentKey,
} from "@/entities/program/model/program-card-button";

import type {
  ProgramContent,
  ProgramItem,
} from "@/entities/program/model/program.types";

import { ContactMessageBtn } from "@/features/contact-message/ui/contact-message-btn/ContactMessageBtn";
import { preventOrphans } from "@/shared/utils/preventOrphans.util";

interface ProgramInfoProps {
  program: ProgramItem;
}

type ProgramInfoItem = ProgramContent;

export const ProgramInfo = ({ program }: ProgramInfoProps) => {
  const { forWhom, suitableRequests, workflow, cooperationFormat, benefits } =
    program;

  const programItems: { key: ProgramContentKey; content: ProgramContent }[] = [
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
      content: workflow,
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
            {programItems.map((programItem) => {
              const { key, content } = programItem;

              if (!content?.showed) return null;

              const resolved = withCardButton(
                content,
                cardButtonPreset(program, key)
              );

              return (
                <div
                  key={key}
                  className={classNames(
                    scss["program-info__item"],
                    resolved.variant === "big"
                      ? scss["program-info__item--active"]
                      : null,
                    resolved.variant === "center"
                      ? scss["program-info__item--center"]
                      : null
                  )}
                >
                  <p className={scss["program-info__item-title"]}>
                    {preventOrphans(resolved.title)}
                  </p>

                  <div className={scss["program-info__item-boxs"]}>
                    {resolved.items.map((item) => {
                      const { title, desc, as = "default" } = item;

                      return as === "default" ? (
                        <div className={scss["program-info__item-block"]}>
                          {title ? (
                            <p className="p1">{preventOrphans(title)}</p>
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
                                  {preventOrphans(text)}
                                </p>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div className={scss["program-info__item-block"]}>
                          {title ? (
                            <p className="p1">{preventOrphans(title)}</p>
                          ) : null}

                          <ul className={scss["program-info__item-list"]}>
                            {desc.map((text, index) => {
                              return (
                                <li
                                  className={scss["program-info__item-link"]}
                                  key={index}
                                >
                                  <p className="p2">{preventOrphans(text)}</p>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    })}
                  </div>

                  {resolved.buttonShowed && resolved.buttonText ? (
                    <div className={scss["program-info__item-btns"]}>
                      <ContactMessageBtn theme="primary" size="medium">
                        <p className="p2">{resolved.buttonText}</p>
                      </ContactMessageBtn>
                    </div>
                  ) : null}
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

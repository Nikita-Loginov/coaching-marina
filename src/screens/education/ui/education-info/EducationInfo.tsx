import { notFound } from "next/navigation";
import classNames from "classnames";

import { Container } from "@/shared/ui/index.ui";

import { ContactMessageBtn } from "@/features/contact-message/ui/contact-message-btn/ContactMessageBtn";

import { getPrograms } from "@/entities/program/model/program.queries";

import { preventOrphans } from "@/shared/utils/preventOrphans.util";

import scss from "./EducationInfo.module.scss";


export const EducationInfo = async () => {
  const programs = await getPrograms();

  const programsEducation = programs.filter(
    (program) =>
      program.type === "EDUCATION" && program.id !== "training-programs"
  );

  if (programsEducation.length < 1) {
    return notFound();
  }

  return (
    <section className={scss["education-info"]}>
      <Container>
        <div className={scss["education-info__inner"]}>
          <div className={scss["education-info__items"]}>
            {programsEducation.map((program, index) => {
              const {
                name,
                forWhom,
                suitableRequests,
                workflow,
                cooperationFormat,
                benefits,
                skills,
                learningValue,
                description,
                descriptionFull,
              } = program;

              const programItems = [
                {
                  key: "suitableRequests",
                  content: suitableRequests,
                },
                ...(skills
                  ? [
                      {
                        key: "skills",
                        content: skills,
                      },
                    ]
                  : []),
                {
                  key: "forWhom",
                  content: forWhom,
                },
                {
                  key: "workflow",
                  content: workflow,
                },
                {
                  key: "benefits",
                  content: benefits,
                },
                ...(learningValue
                  ? [
                      {
                        key: "learningValue",
                        content: learningValue,
                      },
                    ]
                  : []),
              ];

              return (
                <div key={program.id} className={scss["education-info__item"]}>
                  <div className={scss["education-info__boxs"]}>
                    <div className={scss["education-info__item-box"]}>
                      <div className={scss["education-info__item-top"]}>
                        <div className={scss["education-info__item-top-box"]}>
                          <p
                            className={classNames(
                              scss["education-info__item-number"],
                              "h2"
                            )}
                          >
                            {index <= 9 ? `0${index + 1}` : index}
                          </p>

                          <h2 className="h3">{preventOrphans(name)}</h2>
                        </div>
                      </div>

                      <div className={scss["education-info__item-header"]}>
                        {cooperationFormat.items.length > 0 && (
                          <ul className={scss["education-info__list"]}>
                            {cooperationFormat.items.map((format) => {
                              const { title, desc } = format;

                              return (
                                <li className={scss["education-info__link"]}>
                                  {title && (
                                    <p
                                      className={classNames(
                                        "p4",
                                        scss["education-info__link-title"]
                                      )}
                                    >
                                      {title}
                                    </p>
                                  )}

                                  <div
                                    className={
                                      scss["education-info__link-text"]
                                    }
                                  >
                                    {desc &&
                                      desc.length > 0 &&
                                      desc.map((text, index) => {
                                        return (
                                          <p className="p2" key={index}>
                                            {text}
                                          </p>
                                        );
                                      })}
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        )}

                        <div className="textbox textbox--second">
                          {descriptionFull.map((text, index) => (
                            <p className="p2" key={index}>
                              {text}
                            </p>
                          ))}

                          <div
                            className={scss["education-info__item-header-text"]}
                          >
                            {description.map((text, index) => (
                              <p className="p2" key={index}>
                                {text
                                  .split(". ")
                                  .map((sentence, index, arr) => (
                                    <span key={index}>
                                      {sentence}
                                      {index < arr.length - 1 && "."}
                                      {index < arr.length - 1 && <br />}
                                    </span>
                                  ))}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={scss["education-info__boxs-items"]}>
                      {programItems.map((programItem) => {
                        const { key, content } = programItem;

                        if (!content?.showed) return null;

                        const isWorkflow = key === "workflow";

                        return (
                          <div
                            className={classNames(
                              scss["education-info-card"],
                              content.variant === "big"
                                ? scss["education-info-card--active"]
                                : null
                            )}
                            key={key}
                          >
                            <p className={scss["education-info-card__title"]}>
                              {content.title}
                            </p>

                            <div
                              className={classNames(
                                scss["education-info-card__boxs"],
                                content.items.length > 6
                                  ? scss["education-info-card__boxs--grid"]
                                  : null
                              )}
                            >
                              {content.items.length > 0 &&
                                content.items.map((item, index) => {
                                  const { title, desc, as = "default" } = item;

                                  return as === "default" ? (
                                    <div
                                      className={
                                        scss["education-info-card__block"]
                                      }
                                      key={index}
                                    >
                                      {title ? (
                                        <p className="p2 font-text-second">
                                          {title}
                                        </p>
                                      ) : null}

                                      <div
                                        className={classNames(
                                          "textbox textbox--second",
                                          scss["education-info-card__desc"]
                                        )}
                                      >
                                        {desc?.length > 0 &&
                                          desc.map((text, index) => (
                                            <p className="p2" key={index}>
                                              {text}
                                            </p>
                                          ))}
                                      </div>
                                    </div>
                                  ) : (
                                    <div
                                      className={
                                        scss["education-info-card__block"]
                                      }
                                      key={index}
                                    >
                                      {title ? (
                                        <p className="p2 font-text-second">
                                          {title}
                                        </p>
                                      ) : null}

                                      <ul
                                        className={classNames(
                                          scss["education-info-card__list"],
                                          desc.length > 6
                                            ? scss[
                                                "education-info-card__list--grid"
                                              ]
                                            : null
                                        )}
                                      >
                                        {desc.length > 0 &&
                                          desc.map((text, index) => (
                                            <li
                                              className={
                                                scss[
                                                  "education-info-card__link"
                                                ]
                                              }
                                              key={index}
                                            >
                                              <p className="p2">{text}</p>
                                            </li>
                                          ))}
                                      </ul>
                                    </div>
                                  );
                                })}
                            </div>

                            {isWorkflow && (
                              <div
                                className={scss["education-info-card__btns"]}
                              >
                                <ContactMessageBtn theme="primary" size="medium">
                                  <p className="p2">Заказать тест-драйв</p>
                                </ContactMessageBtn>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
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

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";

import type { PERSON_CONFIG } from "@/shared/config/person.config";

import { Container, Accordeon } from "@/shared/ui/index.ui";

import { DocumentCard } from "@/entities/document/ui";

import scss from "./SvedeniyaInfo.module.scss";

interface SvedeniyaInfoProps {
  info: typeof PERSON_CONFIG;
}

export const SvedeniyaInfo = ({ info }: SvedeniyaInfoProps) => {
  const {
    organization,
    management,
    education,
    materialTechnicalSupport,
    paidEducationalServices,
    financialActivity,
    vacantPlaces,
    studentSupport,
    internationalCooperation,
  } = info;

  const svedeniyaData = useMemo(
    () => [
      organization,
      management,
      education,
      materialTechnicalSupport,
      paidEducationalServices,
      financialActivity,
      vacantPlaces,
      studentSupport,
      internationalCooperation,
    ],
    [
      organization,
      management,
      education,
      materialTechnicalSupport,
      paidEducationalServices,
      financialActivity,
      vacantPlaces,
      studentSupport,
      internationalCooperation,
    ]
  );

  const accordeonItems = svedeniyaData.map((item, index) => ({
    key: (index + 1).toString(),
    label: item.title,
    children: (
      <div className={scss["svedeniya-info__item-box"]}>
        <ul className={scss["svedeniya-info__item-list"]}>
          {item.items.map((item) => {
            if ("description" in item) {
              return (
                <li
                  className={scss["svedeniya-info__item-link"]}
                  key={item.title}
                >
                  <p className={scss["svedeniya-info__item-key"]}>
                    {item.title}
                  </p>

                  <div className={scss["svedeniya-info__item-mean"]}>
                    <p>{item.description}</p>
                  </div>
                </li>
              );
            }

            return (
              <li
                className={scss["svedeniya-info__item-link"]}
                key={item.title}
              >
                <p className={scss["svedeniya-info__item-key"]}>{item.title}</p>

                <div className={scss["svedeniya-info__item-mean"]}>
                  <ul className={scss["svedeniya-info__item-sublist"]}>
                    {item.items.map((nestedItem) => (
                      <li
                        className={scss["svedeniya-info__item-sublist-link"]}
                        key={nestedItem.title}
                      >
                        <p className="medium-font">{nestedItem.title}</p>

                        <p>{nestedItem.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    ),
  }));

  return (
    <section className={scss["svedeniya-info"]}>
      <Container>
        <div className={scss["svedeniya-info__inner"]}>
          <div className={scss["svedeniya-info__content"]}>
            <Accordeon
              items={accordeonItems}
              accordion={true}
              defaultActiveKey={[]}
            />
          </div>

          <div className={scss["svedeniya-info__documents"]}>
            <h2 className="p1 font-text-second">Правовые документы</h2>

            <div className={scss["svedeniya-info__documents-items"]}>
              <DocumentCard
                document={{
                  id: "231312",
                  name: "Политика конфиденциальности",
                  description: [
                    "Условия хранения и защиты персональных данных пользователей.",
                  ],
                  file: "/images/og/cover.webp",
                }}
              />

<DocumentCard
                document={{
                  id: "231312",
                  name: "Политика конфиденциальности",
                  description: [
                    "Условия хранения и защиты персональных данных пользователей.",
                  ],
                  file: "/images/og/cover.webp",
                }}
              />
            </div>
          </div>

          {/* <aside className={scss["svedeniya-info__sidebar"]}>
            <div className={scss["svedeniya-info__sidebar-top"]}>
              <p className="p4">Разделы страницы</p>
            </div>

            <div className={scss["svedeniya-info__sidebar-items"]}>
              {svedeniyaData.map((item, index) => {
                // console.log(item, "item");
                const blockId = getBlockId(index);

                return (
                  <button
                    type="button"
                    className={classNames(
                      scss["svedeniya-info__sidebar-item"],
                      {
                        [scss.active]: activeBlock === blockId,
                      }
                    )}
                    key={blockId}
                    onClick={() => scrollToBlock(blockId)}
                    aria-label={`Перейти к блоку ${item.title}`}
                  >
                    <p className="p3">{item.title}</p>
                  </button>
                );
              })}
            </div>
          </aside> */}

          {/* <div className={scss["svedeniya-info__content"]}>
            <div className={scss["svedeniya-info__items"]}>
              {svedeniyaData.map((section, sectionIndex) => {
                const blockId = getBlockId(sectionIndex);

                return (
                  <div
                    className={scss["svedeniya-info__item"]}
                    id={blockId}
                    key={section.title}
                  >
                    <div className={scss["svedeniya-info__item-block"]}>
                      <p className="p4 medium-font primary-color-40">
                        {String(sectionIndex + 1).padStart(2, "0")}
                      </p>

                      <h2 className="h4 font-text-second">{section.title}</h2>
                    </div>

                    <div className={scss["svedeniya-info__item-box"]}>
                      <ul className={scss["svedeniya-info__item-list"]}>
                        {section.items.map((item) => {
                          if ("description" in item) {
                            return (
                              <li
                                className={scss["svedeniya-info__item-link"]}
                                key={item.title}
                              >
                                <p className={scss["svedeniya-info__item-key"]}>
                                  {item.title}
                                </p>

                                <div
                                  className={scss["svedeniya-info__item-mean"]}
                                >
                                  <p>{item.description}</p>
                                </div>
                              </li>
                            );
                          }

                          return (
                            <li
                              className={scss["svedeniya-info__item-link"]}
                              key={item.title}
                            >
                              <p className={scss["svedeniya-info__item-key"]}>
                                {item.title}
                              </p>

                              <div
                                className={scss["svedeniya-info__item-mean"]}
                              >
                                <ul
                                  className={
                                    scss["svedeniya-info__item-sublist"]
                                  }
                                >
                                  {item.items.map((nestedItem) => (
                                    <li
                                      className={
                                        scss[
                                          "svedeniya-info__item-sublist-link"
                                        ]
                                      }
                                      key={nestedItem.title}
                                    >
                                      <p className="medium-font">
                                        {nestedItem.title}
                                      </p>

                                      <p>{nestedItem.description}</p>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div> */}
        </div>
      </Container>
    </section>
  );
};

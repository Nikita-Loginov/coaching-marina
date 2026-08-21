"use client";

import { useMemo } from "react";

import type { PersonItem } from "@/entities/person/model/person.types";

import { Container, Accordeon } from "@/shared/ui/index.ui";
import { DocumentCard } from "@/entities/document/ui";

import scss from "./SvedeniyaInfo.module.scss";

interface SvedeniyaInfoProps {
  info: PersonItem;
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
    documents,
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
    key: String(index + 1),
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
            <Accordeon items={accordeonItems} accordion defaultActiveKey={[]} />
          </div>

          {documents.length > 0 && (
            <div className={scss["svedeniya-info__documents"]}>
              <h2 className="p1 font-text-second">Правовые документы</h2>

              <div className={scss["svedeniya-info__documents-items"]}>
                {documents.map((document) => (
                  <DocumentCard key={document.id} document={document} />
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default SvedeniyaInfo;

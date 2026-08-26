import Link from "next/link";
import classNames from "classnames";

import { getPerson } from "@/entities/person/model/person.queries";

import { SITE_CONFIG } from "@/shared/config/seo.config";

import { DEVELOPER_CONFIG } from "@/shared/config/developer.config";

import { Container, Logo, ListDefault } from "../index.ui";

import type { ListDefaultProps } from "../index.ui";

import scss from "./Footer.module.scss";

const footerDocumentsInfo: ListDefaultProps = {
  title: "Документы",
  titleClassName: "uppercase-text secondary-color-30",
  items: [
    {
      label: "Сведения об образовательной организации",
      as: "link",
      ariaLabel: "Перейти к сведениям об образовательной организации",
      href: "/svedeniya/obrazovatelnoj-organizacii",
      title: "Сведения об образовательной организации",
    },
    {
      label: "Договор оферты",
      as: "link",
      ariaLabel: "Скачать договор оферты",
      href: "/documents/dogovor-oferty.pdf",
      title: "Договор оферты",
      target: '_blank',
    },
    {
      label: "Политика конфиденциальности",
      as: "link",
      ariaLabel: "Скачать политику конфиденциальности",
      href: "/documents/politika-konfidencialnosti.pdf",
      title: "Политика конфиденциальности",
      target: '_blank',
    },
    {
      label: "Согласие на обработку персональных данных",
      as: "link",
      ariaLabel: "Скачать согласие на обработку персональных данных",
      href: "/documents/soglasie-na-obrabotku-personalnyh-dannyh.pdf",
      title: "Согласие на обработку персональных данных",
      target: '_blank',
    },
    {
      label: "Согласие на получение рассылок",
      as: "link",
      ariaLabel: "Скачать согласие на получение рассылок",
      href: "/documents/soglasie-na-poluchenie-rassylok.pdf",
      title: "Согласие на получение рассылок",
      target: '_blank',
    },
  ],
};

export const Footer = async () => {
  const person = await getPerson();

  if (!person) {
    return null;
  }

  const { name, middlename, contacts, socials } = person;

  const { email, phone, address } = contacts;

  const { telegram } = socials;

  const fullName = `${name} ${middlename}`;

  return (
    <footer className={scss["footer"]} id="footer">
      <Container>
        <div className={scss["footer__inner"]}>
          <div className={scss["footer__content"]}>
            <div className={scss["footer__info"]}>
              <div className={scss["footer__block"]}>
                <Logo as="text" name={name} middlename={middlename} />

                <div className="textbox">
                  <p className="p1 secondary-color-80">
                    Пространство для трансформации <br />
                    лидеров и команд.
                  </p>
                </div>
              </div>

              <div className={scss["footer__lists"]}>
                <ListDefault
                  title="Контакты"
                  titleClassName="uppercase-text secondary-color-30"
                  items={[
                    {
                      label: email,
                      as: "link",
                      ariaLabel: `Написать на почту ${email}`,
                      href: `mailto:${email}`,
                      title: email,
                    },
                    {
                      label: phone,
                      as: "link",
                      ariaLabel: `Позвонить по номеру ${phone}`,
                      href: `tel:${phone}`,
                      title: phone,
                    },
                    {
                      label: "Telegram",
                      as: "link",
                      ariaLabel: `Перейти в телеграмм ${telegram}`,
                      href: telegram,
                      title: telegram,
                    },
                  ]}
                />

                <ListDefault {...footerDocumentsInfo} />

                {/* <ListDefault
                  title="Адрес"
                  titleClassName="uppercase-text secondary-color-30"
                  items={[
                    {
                      label: address.label,
                      as: "text",
                      // ariaLabel: `Перейти по адресу ${address.label}`,
                      // href: address.link,
                      // title: address.label,
                    },
                  ]}
                /> */}
              </div>
            </div>

            <div className={scss["footer__copy"]}>
              {/* <div className={scss["footer__copy-top"]}>
                <p className="uppercase-text secondary-color-30">Документы:</p>

                <ul className={scss["footer__list"]}>
                  {footerDocumentsList.map((item, index) => (
                    <li key={index} className={scss["footer__list-item"]}>
                      <Link
                        href={item.to}
                        className={classNames(
                          scss["footer__list-link"],
                          "link"
                        )}
                      >
                        <p className="p3">{item.label}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div> */}

              <p className="p3">
                © 2026 {fullName}. Содержание данного информационного ресурса
                (сайт {SITE_CONFIG.url}), включая любую информацию и результаты
                интеллектуальной деятельности, защищены законодательством
                Российской Федерации и международными соглашениями. Любое
                использование, копирование, воспроизведение или распространение
                любой размещённой информации без предварительного согласия
                правообладателя не допускается.
              </p>

              {/* <Link
                href="/svedeniya/obrazovatelnoj-organizacii"
                title="Сведения об образовательной организации"
                aria-label="Перейти на страницу Сведения об образовательной организации"
                className="link p3"
              >
                Сведения об образовательной организации
              </Link> */}
            </div>
          </div>

          <div className={scss["footer__bottom"]}>
            <div className={scss["footer__developer"]}>
              <p className="p4">
                Разработано{" "}
                <Link
                  href={DEVELOPER_CONFIG.url}
                  title="Сайт разработчика"
                  aria-label="Перейти на сайт разработчика"
                  className={classNames("link", scss["footer__developer-link"])}
                  target="_blank"
                >
                  Nikita Loginov
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

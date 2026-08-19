import Link from "next/link";
import classNames from "classnames";

import { PERSON_CONFIG } from "@/shared/config/person.config";
import { DEVELOPER_CONFIG } from "@/shared/config/developer.config";

import { Container, Logo, ListDefault } from "../index.ui";

import scss from "./Footer.module.scss";

export const Footer = () => {
  const { email, phone, telegram, adress } = PERSON_CONFIG.socials;

  return (
    <footer className={scss["footer"]} id="footer">
      <Container>
        <div className={scss["footer__inner"]}>
          <div className={scss["footer__content"]}>
            <div className={scss["footer__info"]}>
              <div className={scss["footer__block"]}>
                <Logo as="text" />

                <div className="textbox">
                  <p className="p1 secondary-color-80">
                    Пространство для трансформации <br /> лидеров и команд.
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
                      ariaLabel: `Перейти в мой телеграмм: ${telegram}`,
                      href: `${telegram}`,
                      title: telegram,
                    },
                  ]}
                />

                <ListDefault
                  title="Адрес"
                  titleClassName="uppercase-text secondary-color-30"
                  items={[
                    {
                      label: adress.label,
                      as: "link",
                      ariaLabel: `Перейти по адресу ${adress.label}`,
                      href: `${adress.link}`,
                      title: adress.label,
                    },
                  ]}
                />
              </div>
            </div>

            <div className={scss["footer__copy"]}>
              <p className="p3">© 2026 Марина Ягунова</p>

              <Link
                href={"/svedeniya/obrazovatelnoj-organizacii"}
                title="Сведения об образовательной организации"
                aria-label="Перейти на страницу Сведения об образовательной организации"
                className="link p3"
              >
                Сведения об образовательной организации
              </Link>
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

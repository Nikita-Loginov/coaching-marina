'use client'

import classNames from "classnames";

import { Container, Button } from "../index.ui";

import { Icons } from "@/shared/icons/index.icons";

import { ContactMessageBtn } from "@/features/contact-message/ui/contact-message-btn/ContactMessageBtn";

import scss from "./Cta.module.scss";

interface CtaProps {
  title: {
    label: string;
    labelAccent?: string;
  };
  desc?: string[];
  btnInfo?: {
    text: string;
  };
}

export const Cta = ({ title, desc, btnInfo }: CtaProps) => {
  const { label, labelAccent } = title;

  return (
    <section className={scss["cta"]}>
      <Container>
        <div className={scss["cta__inner"]}>
          <div className={scss["cta__content"]}>
            <div className={scss["cta__header"]}>
              <h3 className={classNames("h4", scss["cta__title"])}>
                {label} <br />{" "}
                {labelAccent ? (
                  <span className={scss["cta__title-sub"]}>{labelAccent}</span>
                ) : null}
              </h3>

              {desc && desc.length > 0 ? (
                <div className={classNames("textbox", "textbox--second")}>
                  {desc.map((text, index) => {
                    return (
                      <p className="p1" key={index}>
                        {text}
                      </p>
                    );
                  })}
                </div>
              ) : null}
            </div>

            {btnInfo ? (
              <div className={scss["cta__footer"]}>
                <div className={scss["cta__btns"]}>
                  <ContactMessageBtn
                    size="big"
                    theme="primary"
                    iconRight={<Icons.ArrowRight />}
                    iconSize="medium"
                  >
                    <p className="p1">{btnInfo.text}</p>
                  </ContactMessageBtn>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
};

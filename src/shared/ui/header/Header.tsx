"use client";

import { useRef } from "react";
import classNames from "classnames";

import { Logo, Container, Menu, Button, Modal } from "../index.ui";
import { ContactForm } from "@/features/contact-message/ui";
import { ContactMessageBtn } from "@/features/contact-message/ui/contact-message-btn/ContactMessageBtn";

import { useElementSize } from "@/shared/hooks/index.hooks";

import { useModalStore } from "@/store/modal/modal.store";

import scss from "./Header.module.scss";

export const Header = () => {
  const headerRef = useRef<HTMLElement>(null);

  const { activeModal, close } = useModalStore();

  useElementSize({ ref: headerRef, varName: "header-height" });

  return (
    <>
      <header
        className={classNames(scss.header)}
        ref={headerRef}
        // initial={headerVisible.initial}
        // animate={headerVisible.animate}
        // transition={headerVisible.transition}
      >
        <Container>
          <div className={scss["header__inner"]}>
            <Logo />

            <Menu />

            <div className={scss["header__btns"]}>
              <ContactMessageBtn theme="primary" size="small">
                <p className="p3">Записаться на консультацию</p>
              </ContactMessageBtn>
            </div>
          </div>
        </Container>
      </header>

      <Modal isOpen={activeModal === "contact"} onClose={close} variant="second">
        <ContactForm />
      </Modal>
    </>
  );
};

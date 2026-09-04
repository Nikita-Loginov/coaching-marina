"use client";

import { useRef } from "react";
import classNames from "classnames";

import { Logo } from "../logo/Logo";
import { Container } from "../container/Container";
import { Menu } from "../menu/Menu";
import { Modal } from "../modal/Modal";
import { ContactForm } from "@/features/contact-message/ui";
import { ContactMessageBtn } from "@/features/contact-message/ui/contact-message-btn/ContactMessageBtn";

import { useElementSize } from "@/shared/hooks/index.hooks";
import { useModalStore } from "@/shared/store/modal/modal.store";

import scss from "./Header.module.scss";

interface HeaderClientProps {
  name: string;
  middlename: string;
}

export const HeaderClient = ({
  name,
  middlename,
}: HeaderClientProps) => {
  const headerRef = useRef<HTMLElement>(null);

  const { activeModal, close } = useModalStore();

  useElementSize({
    ref: headerRef,
    varName: "header-height",
  });

  return (
    <>
      <header
        className={classNames(scss.header)}
        ref={headerRef}
      >
        <Container>
          <div className={scss["header__inner"]}>
            <Logo
              name={name}
              middlename={middlename}
            />

            <Menu />

            <div className={scss["header__btns"]}>
              <ContactMessageBtn theme="primary" size="small">
                <p className="p2">
                  Записаться на разговор
                </p>
              </ContactMessageBtn>
            </div>
          </div>
        </Container>
      </header>

      <Modal
        isOpen={activeModal === "contact"}
        onClose={close}
        variant="second"
      >
        <ContactForm />
      </Modal>
    </>
  );
};

export default HeaderClient;
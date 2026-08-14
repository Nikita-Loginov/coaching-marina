"use client";

import { useRef } from "react";
import classNames from "classnames";

import { Logo, Container, Menu, Button } from "../index.ui";

import { useElementSize } from "@/shared/hooks/index.hooks";

import scss from "./Header.module.scss";


export const Header = () => {
  const headerRef = useRef<HTMLElement>(null);

  // const { activeModal, close } = useModalStore();

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
              {/* <ContactMessageBtn theme="secondary" size="small">
                <p className="p3">Записаться на консультацию</p>
              </ContactMessageBtn> */}

              <Button theme="primary" size="small">
                <p className="p3">Записаться на консультацию</p>
              </Button>
            </div>
          </div>
        </Container>
      </header>

      {/* <Modal isOpen={activeModal === "contact"} onClose={close}>
        <ContactForm />
      </Modal> */}
    </>
  );
};

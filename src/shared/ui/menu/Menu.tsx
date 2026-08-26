"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

import { MENU_ITEMS } from "./lib/menu-items.config";

import { ContactMessageBtn } from "@/features/contact-message/ui/contact-message-btn/ContactMessageBtn";

// import { ContactMessageBtn } from "@/features/contact-message/ui";

import scss from "./Menu.module.scss";

export const Menu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  // const isMobile = () => window.innerWidth <= 1023;

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("open-decor");
    }

    return () => {
      document.body.classList.remove("open-decor");
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current) return;

      if (!menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      className={classNames(scss["menu"], isOpen ? scss["active"] : "")}
      ref={menuRef}
    >
      <button
        type="button"
        aria-label="open menu"
        className={scss["menu__burger"]}
        onClick={() => {
          setIsOpen((prev) => {
            return !prev;
          });
        }}
      >
        <span></span>
      </button>

      <div className={scss["menu__content"]}>
        <nav className={scss["menu__nav"]}>
          <ul className={scss["menu__list"]}>
            {MENU_ITEMS.map((menu_item) => {
              const { label, href } = menu_item;

              return (
                <li key={label} className={scss["menu__link"]}>
                  <Link
                    href={href}
                    title={label}
                    aria-label={`Перейти к блоку ${label.toLocaleLowerCase()}`}
                    className={"link"}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <p className={classNames(scss["menu__link-text"])}>
                      {label}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={scss["menu__mobile-details"]}>
          <div className={scss["menu__btns"]}>
            <ContactMessageBtn
              theme="primary"
              size="small"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <p className="p3">Записаться на разговор</p>
            </ContactMessageBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

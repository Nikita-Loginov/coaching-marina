"use client";

import { useState } from "react";

import { Icons } from "@/shared/icons/index.icons";

import scss from "./Accordeon.module.scss";
import { ArrowChevronBottom } from "../../icons/arrows/arrow-chevron-bottom";

export interface AccordeonItem {
  key: string;
  label: React.ReactNode;
  children: React.ReactNode;
}

interface AccordeonProps {
  items: AccordeonItem[];
  accordion?: boolean;
  defaultActiveKey?: string[];
}

export const Accordeon = ({
  items,
  accordion = false,
  defaultActiveKey = [],
}: AccordeonProps) => {
  const [activeKeys, setActiveKeys] = useState<string[]>(defaultActiveKey);

  const toggleItem = (key: string) => {
    if (accordion) {
      setActiveKeys(activeKeys.includes(key) ? [] : [key]);
    } else {
      setActiveKeys((prev) =>
        prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
      );
    }
  };

  return (
    <div className={scss["accordeon"]}>
      {items.map((item) => {
        const isOpen = activeKeys.includes(item.key);

        return (
          <div
            key={item.key}
            className={`${scss["accordeon__item"]} ${
              isOpen ? scss["open"] : ""
            }`}
          >
            <button
              className={`${scss["accordeon__header"]} ${
                isOpen ? scss["open"] : ""
              }`}
              onClick={() => toggleItem(item.key)}
            >
              <span className={"p1"}>{item.label}</span>

              <span
                className={`${scss["accordeon__icon"]} ${
                  isOpen ? scss["rotated"] : ""
                }`}
              >
                <Icons.ArrowChevronBottom />
              </span>
            </button>

            <div
              className={`${scss["accordeon__content"]} ${
                isOpen ? scss["expanded"] : ""
              }`}
            >
              <div className={scss["accordeon__inner"]}>{item.children}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

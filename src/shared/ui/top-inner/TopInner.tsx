import classNames from "classnames";
import React from "react";

import scss from "./TopInner.module.scss";

type TopInnerItem = {
  label?: string;
  desc?: string[] | React.ReactNode[];
  title?: {
    label: string;
    labelAccent?: string;
  };
  positionX?: "column" | "row";
  positionY?: "left" | "center" | "right";
};

interface TopInnerProps {
  items: TopInnerItem[];
  children: React.ReactNode;
  className?: string;
}

export const TopInner = ({ items, children, className }: TopInnerProps) => {
  return (
    <div className={classNames(scss["top-inner"], className)}>
      <div className={scss["top-inner__content"]}>
        {items.map((item, index) => {
          const {
            label,
            title,
            desc,
            positionX = "column",
            positionY = "left",
          } = item;

          return (
            <div
              className={classNames(
                scss["top-inner__block"],
                scss[`top-inner__block--${positionX}`],
                scss[`top-inner__block--${positionY}`]
              )}
              key={index}
            >
              {label && (
                <p className={classNames("p4", scss["top-inner__label"])}>
                  {label}
                </p>
              )}

              {title?.label && (
                <h2 className={classNames("h3", scss["top-inner__title"])}>
                  {title.label}{" "}
                  {title.labelAccent ? <span className="primary-color-40">{title.labelAccent}</span> : null}
                </h2>
              )}

              {desc && desc?.length > 0 ? (
                <div className={scss["top-inner__textbox"]}>
                  {desc.map((text, index) =>
                    typeof text === "string" ? (
                      <p key={index} className="p2">
                        {text}
                      </p>
                    ) : (
                      <React.Fragment key={index}>{text}</React.Fragment>
                    )
                  )}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {children}
    </div>
  );
};

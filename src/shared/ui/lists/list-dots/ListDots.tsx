import Link from "next/link";
import classNames from "classnames";
import { HTMLAttributeAnchorTarget, ReactNode } from "react";

import scss from "./ListDots.module.scss";

export interface ListDotsProps {
  title?: string;
  titleClassName?: string;
  listClassName?: string;
  items: {
    as?: "link" | "text";
    label: string;
    icon?: ReactNode;
    href?: string;
    ariaLabel?: string;
    className?: string;
    title?: string;
    target?: HTMLAttributeAnchorTarget;
  }[];
}

export const ListDots = ({
  title,
  titleClassName,
  listClassName,
  items,
}: ListDotsProps) => {
  return (
    <div className={scss["list-dots"]}>
      {title && <p className={titleClassName}>{title}</p>}

      <ul className={classNames(scss["list-dots__list"], listClassName)}>
        {items.map((item, index) => {
          const {
            as = "link",
            label,
            href,
            ariaLabel,
            className,
            target,
            title,
            icon,
          } = item;

          const content = (
            <>
              <div className={scss["list-dots__icon"]}>{icon}</div>

              <p className={className}>{label}</p>
            </>
          );

          return (
            <li className={scss["list-dots__link"]} key={index}>
              {as === "link" && href ? (
                <Link
                  className={classNames(scss["list-dots__item"], "link")}
                  href={href}
                  aria-label={ariaLabel}
                  target={target}
                  title={title}
                >
                  {content}
                </Link>
              ) : (
                content
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

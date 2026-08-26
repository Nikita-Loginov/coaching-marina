import Link from "next/link";
import classNames from "classnames";
import { HTMLAttributeAnchorTarget } from "react";

import scss from "./ListNumber.module.scss";


export interface ListNumberProps {
  title?: string;
  titleClassName?: string;
  items: {
    as?: "link" | "text";
    label: string;
    href?: string;
    ariaLabel?: string;
    className?: string;
    title?: string;
    target?: HTMLAttributeAnchorTarget
  }[];
}

export const ListNumber = ({
  title,
  titleClassName,
  items,
}: ListNumberProps) => {
  return (
    <div className={scss["list-number"]}>
      {title && <p className={titleClassName}>{title}</p>}

      <ol className={scss["list-number__list"]}>
        {items.map((item, index) => {
          const { as = "link", label, href, ariaLabel, className, target, title} = item;

          const content = <p className={className}>{label}</p>;

          return (
            <li className={scss["list-number__link"]} key={index}>
              {as === "link" && href ? (
                <Link
                  className={classNames(scss["list-number__item"], 'link')}
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
      </ol>
    </div>
  );
};

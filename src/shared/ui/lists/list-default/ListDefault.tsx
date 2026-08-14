import Link from "next/link";
import classNames from "classnames";
import { HTMLAttributeAnchorTarget } from "react";

import scss from "./ListDefault.module.scss";


interface ListDefaultProps {
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

export const ListDefault = ({
  title,
  titleClassName,
  items,
}: ListDefaultProps) => {
  return (
    <div className={scss["list-default"]}>
      {title && <p className={titleClassName}>{title}</p>}

      <ul className={scss["list-default__list"]}>
        {items.map((item) => {
          const { as = "link", label, href, ariaLabel, className, target, title} = item;

          const content = <p className={className}>{label}</p>;

          return (
            <li className={scss["list-default__link"]}>
              {as === "link" && href ? (
                <Link
                  className={classNames(scss["list-default__item"], 'link')}
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

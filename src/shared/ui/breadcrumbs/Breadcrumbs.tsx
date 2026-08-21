"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import classNames from "classnames";

import { getBreadcrumbs } from "@/shared/lib/breadcrumbs";

import scss from "./Breadcrumbs.module.scss";

export const Breadcrumbs = () => {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname || "/");

  return (
    <nav className={scss["breadcrumbs"]}>
      <ul className={scss["breadcrumbs__list"]}>
        {breadcrumbs.map((breadcrumb, index) => {
          const { label, href } = breadcrumb;

          const isLast = breadcrumbs.length - 1 === index;

          return (
            <li key={index} className={scss["breadcrumbs__link"]}>
              <Link
                href={href}
                className={classNames(
                  scss["breadcrumbs__item"],
                  isLast ? scss["last"] : null
                )}
              >
                <p className="p3">
                  {label} {!isLast ? " /" : null}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

import Link from "next/link";
import classNames from "classnames";

import { Icons } from "@/shared/icons/index.icons";

import { PERSON_CONFIG } from "@/shared/config/person.config";

import scss from "./Logo.module.scss";

interface LogoProps {
  variant?: "accent" | "white";
  as?: "icon" | "text";
}

export const Logo = ({ variant = "accent", as = "icon" }: LogoProps) => {
  const logoClassNames = classNames(
    scss.logo,
    scss[`logo--as-${as}`],
  )

  return (
    <Link
      href={"/"}
      className={logoClassNames}
      title={`${PERSON_CONFIG.name} ${PERSON_CONFIG.middlename}`}
      aria-label="Перейти на главную"
    >
      {as === "icon" ? (
        variant === "accent" ? (
          <Icons.LogoAccent />
        ) : null
      ) : (
        <p className="h4">
          {PERSON_CONFIG.name} {PERSON_CONFIG.middlename}
        </p>
      )}
    </Link>
  );
};

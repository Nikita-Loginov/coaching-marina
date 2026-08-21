import Link from "next/link";
import classNames from "classnames";

import { Icons } from "@/shared/icons/index.icons";

import scss from "./Logo.module.scss";

interface LogoProps {
  variant?: "accent" | "white";
  as?: "icon" | "text";
  name: string;
  middlename: string;
}

export const Logo = ({
  variant = "accent",
  as = "icon",
  name,
  middlename,
}: LogoProps) => {
  const logoClassNames = classNames(scss.logo, scss[`logo--as-${as}`]);

  const fullName = `${name} ${middlename}`;

  return (
    <Link
      href="/"
      className={logoClassNames}
      title={fullName}
      aria-label="Перейти на главную"
    >
      {as === "icon" ? (
        variant === "accent" ? (
          <Icons.LogoAccent />
        ) : null
      ) : (
        <p className="h4 font-text-second">{fullName}</p>
      )}
    </Link>
  );
};

export default Logo;

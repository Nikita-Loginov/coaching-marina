// import { Tooltip } from "../../toltips/Tooltip";

import classNames from "classnames";
import Link from "next/link";

import scss from "./Button.module.scss";

export interface ButtonProps {
  children?: React.ReactNode;
  typeBtn?: "submit" | "reset" | "button";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  disabled?: boolean;
  variant?: "text" | "icon";
  as?: "button" | "link";
  size?: "small" | "medium";
  theme?: "primary" | "secondary";
  to?: string;
  iconSize?: "small" | "medium" | "big";
  ariaLabel?: string;
  target?: "_blank" | "_parent";
  tooltip?: string;
  onClick?: () => void;
  className?: string;
}

export const Button = ({
  typeBtn = "button",
  variant = "text",
  as = "button",
  size = "small",
  theme = "primary",
  iconSize = "medium",
  children,
  disabled,
  iconLeft,
  iconRight,
  className,
  onClick,
  target,
  tooltip,
  ariaLabel,
  ...restProps
}: ButtonProps) => {
  const iconClassNames = classNames({
    icon: true,
    [`icon--${iconSize}`]: true,
  });

  const buttonClassNames = classNames(
    scss.button,
    scss[`button--size-${size}`],
    scss[`button--variant-${variant}`],
    scss[`button--theme-${theme}`],
    {
      [scss["button--disabled"]]: disabled,
    },
    className
  );

  const content = (
    <>
      {iconLeft && <span className={iconClassNames}>{iconLeft}</span>}

      {variant !== "icon" && children}

      {iconRight && <span className={iconClassNames}>{iconRight}</span>}
    </>
  );

  const buttonElement =
    as === "link" ? (
      <Link
        href={restProps.to || "#"}
        {...restProps}
        className={buttonClassNames}
        target={target}
        aria-label={ariaLabel || ""}
      >
        {content}
      </Link>
    ) : (
      <button
        type={typeBtn}
        onClick={onClick}
        {...restProps}
        className={buttonClassNames}
      >
        {content}
      </button>
    );

  // if (tooltip) {
  //   return (
  //     <Tooltip title={tooltip}>
  //       {buttonElement}
  //     </Tooltip>
  //   );
  // }

  return buttonElement;
};

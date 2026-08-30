import classNames from "classnames";

import scss from "./CardBox.module.scss";

interface CardBoxProps {
  children: React.ReactNode;
  className?: string;
  variant?: "small" | "big";
}

export const CardBox = ({
  children,
  className,
  variant = "small",
}: CardBoxProps) => {
  return (
    <div
      className={classNames(
        scss["card-box"],
        className,
        scss[`card-box--${variant}`]
      )}
    >
      {children}
    </div>
  );
};

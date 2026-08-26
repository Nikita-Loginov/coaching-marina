import classNames from "classnames";

import scss from "./CardBox.module.scss";

interface CardBoxProps {
  children: React.ReactNode;
  className?: string;
}

export const CardBox = ({ children, className }: CardBoxProps) => {
  return <div className={classNames(scss["card-box"], className)}>{children}</div>;
};

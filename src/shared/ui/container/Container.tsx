import classNames from "classnames";

import scss from "./Container.module.scss";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ className, children }: ContainerProps) => {
  return (
    <div className={classNames(scss.container, className)}>{children}</div>
  );
};

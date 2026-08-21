import classNames from "classnames";

import scss from "../../MultiBox.module.scss";

interface MultiBoxItemProps {
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export const MultiBoxItem = ({
  children,
  actions,
  className,
}: MultiBoxItemProps) => {
  return (
    <div className={classNames(scss["multi-box__item"], className)}>
      <div className={scss["multi-box__item-content"]}>{children}</div>
      
      {actions && (
        <div className={scss["multi-box__item-actions"]}>{actions}</div>
      )}
    </div>
  );
};

import classNames from "classnames";
import type { InputHTMLAttributes, ReactNode } from "react";

import scss from "./Check.module.scss";

interface CheckProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "content"
> {
  error?: string;
  content?: ReactNode;
}

export const Check = ({
  error,
  content,
  className,
  ...inputProps
}: CheckProps) => {
  return (
    <label
      className={classNames(
        scss["check"],
        error && scss["check--error"],
        className
      )}
    >
      <div className={scss["check__content"]}>
        <div className={scss["check__custom"]}>
          <input
            {...inputProps}
            className={scss["check__input"]}
            type="checkbox"
          />

          <span className={scss["check__decor"]} />
        </div>

        {content && <div className={scss["check__info"]}>{content}</div>}
      </div>

      {error && <p className={scss["check__error"]}>{error}</p>}
    </label>
  );
};

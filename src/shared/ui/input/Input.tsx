"use client";

import classNames from "classnames";
import { forwardRef } from "react";

import scss from "./Input.module.scss";

interface InputAction {
  icon: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  tooltip?: string;
}

interface InputProps {
  typeInput?: "text" | "email" | "tel" | "checkbox" | 'password';
  error?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  actionLeft?: InputAction;
  actionRight?: InputAction;
  as?: "input" | "textarea";
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  theme?: "primary" | "flat";
  iconSize?: "small" | "medium" | "big";
  className?: string;
  autoComplete?: 'email' | 'name';
  name?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onKeyDown?: (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  value?: string;
}

export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(
  (
    {
      typeInput = "text",
      theme = "primary",
      iconSize = "small",
      as = "input",
      label,
      placeholder,
      disabled,
      autoComplete,
      error,
      iconLeft,
      iconRight,
      actionLeft,
      actionRight,
      className,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const iconClassNames = classNames(
      scss["input-box__icon"],
      scss[`input-box__icon--${iconSize}`]
    );

    const actionClassNames = classNames(
      scss["input-box__action"],
      scss[`input-box__action--${iconSize}`],
      {
        [scss["input-box__action--disabled"]]: disabled || actionLeft?.disabled,
      }
    );

    const inputClassNames = classNames(
      scss["input-box"],
      scss[`input-box--theme-${theme}`],
      {
        [scss["input-box--disabled"]]: disabled,
        [scss["input-box--error"]]: error,
        [scss["input-box--textarea"]]: as === "textarea",
      },
      className
    );

    const renderIcon = (icon: React.ReactNode, isAction?: boolean) => {
      if (!icon) return null;

      if (isAction) {
        return <span className={iconClassNames}>{icon}</span>;
      }

      return <span className={iconClassNames}>{icon}</span>;
    };

    const renderAction = (
      action: InputAction | undefined,
      position: "left" | "right"
    ) => {
      if (!action) return null;

      const isDisabled = disabled || action.disabled;

      return (
        <button
          type="button"
          onClick={action.onClick}
         
          disabled={isDisabled}
          className={actionClassNames}
          aria-label={action.tooltip}
        >
          {action.icon}
        </button>
      );
    };

    return (
      <label className={inputClassNames}>
        {/* {label && <p className="p2">{label}</p>} */}

        <div className={scss["input-box__content"]}>
          {iconLeft && renderIcon(iconLeft)}

          {/* {renderAction(actionLeft, "left")} */}

          {as === "input" ? (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              type={typeInput}
              placeholder={placeholder}
              disabled={disabled}
              onKeyDown={onKeyDown}
              autoComplete={autoComplete}
              {...props}
            />
          ) : (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              placeholder={placeholder}
              disabled={disabled}
              onKeyDown={onKeyDown}
              {...props}
            />
          )}

          {iconRight && renderIcon(iconRight)}

          {/* {renderAction(actionRight, "right")} */}
        </div>

        {error && (
          <p className={classNames("p3", scss["input-box__error"])}>{error}</p>
        )}
      </label>
    );
  }
);

Input.displayName = "Input";

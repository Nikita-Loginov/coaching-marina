"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";

import scss from "./Select.module.scss";

interface SelectItem {
  value: string;
  label: string;
}

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  items: SelectItem[];
  className?: string;
  label?: string;
  disabled?: boolean;
}

export const Select = ({
  value,
  onValueChange,
  placeholder = "Выберите...",
  items,
  label,
  className,
  disabled,
}: SelectProps) => {
  const currentValue = items.some((item) => item.value === value)
    ? value
    : undefined;

    // console.log(items, value)

  // console.log({
  //   value,
  //   currentValue,
  //   items
  // })

  return (
    <SelectPrimitive.Root
      value={currentValue}
      onValueChange={(val) => {
        if (val) {
          onValueChange?.(val);
        }
      }}
      disabled={disabled}
    >
      <div className={scss["select"]}>
        {label && <p className="p2 primary-color-400">{label}</p>}

        <SelectPrimitive.Trigger
          className={`${scss["select__trigger"]} ${className || ""}`}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon className={scss["select__icon"]}>
            <div className="icon">
              <ChevronDown size={16} />
            </div>
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className={scss["select__content"]}
            position="popper"
            sideOffset={8}
          >
            <SelectPrimitive.Viewport className={scss["select__viewport"]}>
              {items.map((item) => (
                <SelectPrimitive.Item
                  key={item.value}
                  value={item.value}
                  className={scss["select__item"]}
                >
                  <SelectPrimitive.ItemText>
                    {item.label}
                  </SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </div>
    </SelectPrimitive.Root>
  );
};

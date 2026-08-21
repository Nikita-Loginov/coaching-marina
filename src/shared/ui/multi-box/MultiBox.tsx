"use client";

import { Plus } from "lucide-react";
import classNames from "classnames";
import { ReactNode, useState } from "react";

import { Button } from "../button/Button";

import scss from "./MultiBox.module.scss";

interface MultiBoxItem {
  id: string;
  [key: string]: any;
}

interface MultiBoxProps<T extends MultiBoxItem = MultiBoxItem> {
  label?: string;
  btnAddText?: string;
  items?: T[];
  renderItem: (
    item: T,
    index: number,
    onRemove: (id: string) => void
  ) => ReactNode;
  renderEmpty?: () => ReactNode;
  onAdd?: () => void;
  onRemove?: (id: string) => void;
  createNewItem?: () => T;
  error?: string;
}

export const MultiBox = <T extends MultiBoxItem = MultiBoxItem>({
  btnAddText = "Добавить",
  label,
  items = [],
  renderItem,
  renderEmpty,
  onAdd,
  onRemove,
  createNewItem,
  error,
}: MultiBoxProps<T>) => {
  const [localItems, setLocalItems] = useState<T[]>(items);

  const handleAdd = () => {
    if (onAdd) {
      onAdd();
    } else if (createNewItem) {
      setLocalItems((prev) => [...prev, createNewItem()]);
    }
  };

  const handleRemove = (id: string) => {
    if (onRemove) {
      onRemove(id);
    } else {
      setLocalItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const currentItems = onAdd ? items : localItems;

  return (
    <div
      className={classNames(
        scss["multi-box"],
        error ? scss["multi-box--error"] : null
      )}
    >
      {label && <p className="p1 font-text-second">{label}</p>}

      <div className={scss["multi-box__content"]}>
        {currentItems.length === 0 && renderEmpty && renderEmpty()}

        {currentItems.map((item, index) =>
          renderItem(item, index, handleRemove)
        )}

        {error && (
          <p className={classNames("p3", scss["multi-box__error"])}>{error}</p>
        )}
      </div>

      <div className={scss["multi-box__footer"]}>
        <div className={scss["multi-box__btns"]}>
          <Button
            iconLeft={<Plus />}
            iconSize="medium"
            size="medium"
            theme="secondary"
            typeBtn="button"
            onClick={handleAdd}
          >
            <p className="p3">{btnAddText}</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

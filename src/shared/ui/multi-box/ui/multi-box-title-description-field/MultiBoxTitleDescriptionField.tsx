import { Trash } from "lucide-react";

import { Button } from "@/shared/ui/button/Button";
import { Input } from "@/shared/ui/input/Input";
import { MultiBox } from "../../MultiBox";
import { MultiBoxItem } from "../multi-box-item/MultiBoxItem";

import scss from "../../MultiBox.module.scss";

interface TitleDescriptionItem {
  id: string;
  title: string;
  description: string;
}

type TitleDescriptionField = "title" | "description";

interface MultiBoxTitleDescriptionFieldProps {
  label: string;
  btnAddText?: string;
  items: TitleDescriptionItem[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: TitleDescriptionField, value: string) => void;
  titlePlaceholder?: string;
  descriptionPlaceholder?: string;
  emptyText?: string;
  error?: string;
}

export const MultiBoxTitleDescriptionField = ({
  label,
  btnAddText = "Добавить",
  items,
  onAdd,
  onRemove,
  onUpdate,
  titlePlaceholder = "Заголовок",
  descriptionPlaceholder = "Описание",
  emptyText = "Нет добавленных элементов",
  error,
}: MultiBoxTitleDescriptionFieldProps) => {
  return (
    <MultiBox<TitleDescriptionItem>
      label={label}
      btnAddText={btnAddText}
      items={items}
      createNewItem={() => ({
        id: Date.now().toString(),
        title: "",
        description: "",
      })}
      onAdd={onAdd}
      onRemove={onRemove}
      renderItem={(item, index, removeItem) => (
        <MultiBoxItem
          key={item.id}
          actions={
            <Button
              theme="remove"
              variant="icon"
              size="small"
              typeBtn="button"
              iconLeft={<Trash />}
              onClick={() => removeItem(item.id)}
            />
          }
        >
          <div className={scss["multi-box__item-inputs"]}>
            <Input
              value={item.title}
              onChange={(e) => onUpdate(item.id, "title", e.target.value)}
              placeholder={titlePlaceholder}
              name={`${label}-${item.id}-title`}
            />
            <Input
              value={item.description}
              onChange={(e) => onUpdate(item.id, "description", e.target.value)}
              placeholder={descriptionPlaceholder}
              as="textarea"
              name={`${label}-${item.id}-description`}
            />
          </div>
        </MultiBoxItem>
      )}
      renderEmpty={() => <p className="p3">{emptyText}</p>}
      error={error}
    />
  );
};

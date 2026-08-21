import { Trash } from "lucide-react";

import { Button } from "@/shared/ui/button/Button";
import { Input } from "@/shared/ui/input/Input";
import { MultiBox } from "../../MultiBox";
import { MultiBoxItem } from "../multi-box-item/MultiBoxItem";

interface MultiBoxTextFieldProps {
  label: string;
  btnAddText?: string;
  items: Array<{ id: string; value: string }>;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, value: string) => void;
  placeholder?: string;
  emptyText?: string;
  error?: string;
}

export const MultiBoxTextField = ({
  label,
  btnAddText = "Добавить",
  items = [],
  onAdd,
  onRemove,
  onUpdate,
  placeholder = "Введите значение",
  emptyText = "Нет добавленных элементов",
  error
}: MultiBoxTextFieldProps) => {
  return (
    <MultiBox<{ id: string; value: string }>
      label={label}
      btnAddText={btnAddText}
      items={items}
      createNewItem={() => ({ id: Date.now().toString(), value: "" })}
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
          <Input
            value={item.value}
            onChange={(e) => onUpdate(item.id, e.target.value)}
            placeholder={placeholder}
            name={`${label}-${item.id}`}
          />
        </MultiBoxItem>
      )}
      renderEmpty={() => (
        <p
          className="p3"
        >
          {emptyText}
        </p>
      )}
    />
  );
};

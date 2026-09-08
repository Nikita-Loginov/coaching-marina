"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useEffect, useState, type ReactNode } from "react";

import { AdminItems } from "@/screens/admin";

interface SortableItem {
  id: string;
}

interface SortableAdminListProps<T extends SortableItem> {
  items: T[];
  onReorder: (
    items: Array<{
      id: string;
      order: number;
    }>
  ) => void;
  renderItem: (item: T) => ReactNode;
}

export const SortableAdminList = <T extends SortableItem>({
  items: initialItems,
  onReorder,
  renderItem,
}: SortableAdminListProps<T>) => {
  const [items, setItems] = useState<T[]>(initialItems);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const updated = arrayMove(items, oldIndex, newIndex);

    setItems(updated);

    onReorder(
      updated.map((item, index) => ({
        id: item.id,
        order: index,
      }))
    );
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <AdminItems>{items.map((item) => renderItem(item))}</AdminItems>
      </SortableContext>
    </DndContext>
  );
};

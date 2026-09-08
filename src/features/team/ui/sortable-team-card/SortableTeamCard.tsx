"use client";

import classNames from "classnames";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { TeamCard } from "@/entities/team/ui";

import type { TeamItem } from "@/entities/team/model/team.types";

import scss from "./SortableTeamCard.module.scss";


interface SortableTeamCardProps {
  team: TeamItem;

  onDelete?: (id: string) => void;

  deleteStatus?: {
    isPending: boolean;
    id?: string;
  };
}

export const SortableTeamCard = ({
  team,
  onDelete,
  deleteStatus,
}: SortableTeamCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: team.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className={classNames(scss["sortable-team-card"], {
        [scss["sortable-team-card--dragging"]]: isDragging,
      })}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <TeamCard
        card={team}
        variant="admin"
        onDelete={onDelete}
        deleteStatus={deleteStatus}
      />
    </div>
  );
};

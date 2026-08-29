"use client";

import classNames from "classnames";
import Image from "next/image";

import type { TeamItem } from "../../model/team.types";

import { Button } from "@/shared/ui/index.ui";

import { Icons } from "@/shared/icons/index.icons";

import scss from "./TeamCard.module.scss";

interface TeamCardProps {
  card: TeamItem;
  variant?: "default" | "admin";
  onDelete?: (id: string) => void;

  deleteStatus?: {
    isPending: boolean;
    id?: string;
  };
}

export const TeamCard = ({
  card,
  variant = "default",
  onDelete,
  deleteStatus,
}: TeamCardProps) => {
  const { id, name, middlename, img, post } = card;
  const { src, alt } = img;

  const isDeleting = deleteStatus?.isPending && deleteStatus.id === id;

  return (
    <div
      className={classNames(
        scss["team-card"],
        variant === "admin" ? scss["team-card--admin"] : null
      )}
    >
      <div className={scss["team-card__img"]}>
        <Image src={src} alt={alt} fill />
      </div>

      <div className={scss["team-card__content"]}>
        <div className={scss["team-card__block"]}>
          <p className="p1 font-text-second">
            {name} {middlename}
          </p>

          <div className={scss["team-card__block-info"]}>
            <p className="p3">{post}</p>
          </div>
        </div>
      </div>

      <div className={scss["team-card__btns"]}>
        {variant === "admin" && (
          <>
          <Button
            theme="remove"
            // size="medium"
            typeBtn="submit"
            disabled={isDeleting}
            onClick={() => onDelete?.(id)}
          >
            <p className="p3">{isDeleting ? "Удаление..." : "Удалить"}</p>
          </Button>

          <Button
            theme="secondary"
            // size="medium"
            as="link"
            to={`/admin/teams/edit/${id}`}
            typeBtn="submit"
          >
            <p className="p3">Редактировать</p>
          </Button>
          </>
        )}
      </div>
    </div>
  );
};

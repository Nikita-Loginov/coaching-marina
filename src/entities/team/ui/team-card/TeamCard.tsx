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

  return (
    <div className={scss["team-card"]}>
      <div className={scss["team-card__img"]}>
        <Image src={src} alt={alt} />
      </div>

      <div className={scss["team-card__content"]}>
        <div className={scss["team-card__block"]}>
          <p className="p1 font-text-second">{name} {middlename}</p>

          <div className={scss["team-card__block-info"]}>
            <p className="p3">{post}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

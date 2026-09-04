"use client";

import classNames from "classnames";
import Image from "next/image";

import type { ProgramItem } from "../../model/program.types";

import { Button } from "@/shared/ui/index.ui";

import { Icons } from "@/shared/icons/index.icons";

import { useModalStore } from "@/shared/store/modal/modal.store";

import scss from "./ProgramCard.module.scss";

interface ProgramCardProps {
  card: ProgramItem & { badge?: string; linkFrom?: string };
  variant?: "default" | "admin";
  onDelete?: (id: string) => void;

  deleteStatus?: {
    isPending: boolean;
    id?: string;
  };
}

export const ProgramCard = ({
  card,
  variant = "default",
  onDelete,
  deleteStatus,
}: ProgramCardProps) => {
  const { id, name, description, as, btnText, img, badge } = card;
  const { src, alt } = img;

  const isDeleting = deleteStatus?.isPending && deleteStatus.id === id;

  const isModal = as === "modal";
  const hasLinkFrom = Boolean(card.linkFrom);

  const lastWord = name.split(" ").at(-1);
  const wordsWithoutLastWord = name.split(" ").slice(0, -1).join(" ");

  const { open } = useModalStore();

  const isAdmin = variant === "admin";

  return (
    <div
      className={classNames(
        scss["program"],
        isAdmin ? scss["program--admin"] : null
      )}
    >
      <div className={scss["program__img"]}>
        <Image src={src} alt={alt} fill />
      </div>

      <div className={scss["program__content"]}>
        <div className={scss["program__block"]}>
          {badge && (
            <p className="p3 uppercase-text medium-font primary-color-70">
              {badge}
            </p>
          )}

          <h2
            className={classNames(
              isAdmin ? "p1" : "h3",
              scss["program__title"]
            )}
          >
            {wordsWithoutLastWord} <br />{" "}
            <span className={scss["program__title-sub"]}>{lastWord}</span>
          </h2>

          <div className="textbox textbox--second">
            {description.map((text, index) => {
              return (
                <p className="p1" key={index}>
                  {text}
                </p>
              );
            })}
          </div>
        </div>

        {!isAdmin ? (
          <div className={scss["program__footer"]}>
            <Button
              theme="flat"
              as={hasLinkFrom ? "link" : isModal ? "button" : "link"}
              to={
                hasLinkFrom
                  ? card.linkFrom
                  : isModal
                    ? undefined
                    : `/programs/${id}`
              }
              iconSize="small"
              iconRight={<Icons.ArrowRight />}
              onClick={() => {
                if (!hasLinkFrom && isModal) {
                  open("program", {
                    id,
                  });
                }
              }}
            >
              <p className="p3">{btnText}</p>
            </Button>
          </div>
        ) : (
          <div className={scss["program__footer"]}>
            <div className={scss["program__btns"]}>
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
                to={`/admin/programs/edit/${id}`}
                typeBtn="submit"
              >
                <p className="p3">Редактировать</p>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

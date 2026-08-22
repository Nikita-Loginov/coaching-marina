"use client";

import classNames from "classnames";
import Image from "next/image";
import { Play } from "lucide-react";

import type { ReviewItem } from "../../model/review.types";

import { useModalStore } from "@/shared/store/modal/modal.store";

import scss from "./ReviewCard.module.scss";

interface ReviewCardProps {
  card: ReviewItem;

  variant?: "default" | "admin";

  onDelete?: (id: string) => void;

  deleteStatus?: {
    isPending: boolean;
    id?: string;
  };
}

export const ReviewCard = ({
  card,
  variant = "default",
  onDelete,
  deleteStatus,
}: ReviewCardProps) => {
  const { id, name, post, text, personImgSrc, videoSrc, videoPoster } = card;

  const isDeleting = deleteStatus?.isPending && deleteStatus.id === id;

  const { open } = useModalStore();

  return (
    <div className={scss["review-card"]}>
      <div className={scss["review-card__top"]}>
        <div className={scss["review-card__block"]}>
          <p className={classNames("p1", scss["review-card__title"])}>{name}</p>

          <p className={classNames("p3", scss["review-card__subtitle"])}>
            {post}
          </p>
        </div>

        <div className={scss["review-card__person"]}>
          <Image src={personImgSrc} alt={name} fill />
        </div>
      </div>

      {text || videoSrc ? (
        <div className={scss["review-card__content"]}>
          {text && text.length > 0 ? (
            <div className="textbox textbox--second">
              {text.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>
          ) : null}

          {videoSrc && videoPoster ? (
            <div
              className={scss["review-card__video"]}
              onClick={() => {
                open("video", {
                  videoSrc: videoSrc,
                  videoPoster: videoPoster,
                });
              }}
            >
              <div className={scss["review-card__video-controls"]}>
                <Play />
              </div>

              <div className={classNames(scss["review-card__video-box"])}>
                <Image src={videoPoster} alt={name} fill />
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

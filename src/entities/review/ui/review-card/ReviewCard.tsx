"use client";

import classNames from "classnames";
import Image from "next/image";
import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { ReviewItem } from "../../model/review.types";
import { Button } from "@/shared/ui/index.ui";

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
  const { id, name, post, text, personImgSrc, videoSrc, videoPoster, type } =
    card;

  const isDeleting = deleteStatus?.isPending && deleteStatus.id === id;

  const { open } = useModalStore();

  const textRef = useRef<HTMLDivElement>(null);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);
  const [isTextReady, setIsTextReady] = useState<boolean>(false);

  useEffect(() => {
    const element = textRef.current;

    if (!element) return;

    setIsTextReady(false);

    const checkOverflow = () => {
      const lineHeight = parseFloat(getComputedStyle(element).lineHeight);

      if (!lineHeight || Number.isNaN(lineHeight)) {
        setIsOverflowing(false);
        return;
      }

      const maxHeight = lineHeight * 10;

      setIsOverflowing(element.scrollHeight > maxHeight + 1);
      setIsTextReady(true);
    };

    checkOverflow();

    const resizeObserver = new ResizeObserver(checkOverflow);

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [text]);

  const shouldShowReadMore = isOverflowing || isExpanded;

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
            <div>
              <div
                ref={textRef}
                className={classNames(
                  "textbox textbox--second",
                  !isTextReady && scss["review-card__text--checking"],
                  isTextReady &&
                    !isExpanded &&
                    isOverflowing &&
                    scss["review-card__text--collapsed"]
                )}
              >
                {text.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>

              {shouldShowReadMore && (
                <div className={scss["review-card__btns"]}>
                  <Button
                    typeBtn="button"
                    onClick={() => setIsExpanded((prev) => !prev)}
                    theme="primary"
                  >
                    {isExpanded ? "Скрыть" : "Читать полностью"}
                  </Button>
                </div>
              )}
            </div>
          ) : null}

          {videoSrc && videoPoster ? (
            <div
              className={scss["review-card__video"]}
              onClick={() => {
                open("video", {
                  videoSrc,
                  videoPoster,
                  type,
                });
              }}
            >
              <div className={scss["review-card__video-controls"]}>
                <Play />
              </div>

              <div className={scss["review-card__video-box"]}>
                <Image src={videoPoster} alt={name} fill />
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

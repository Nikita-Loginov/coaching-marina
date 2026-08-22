"use client";

import { useRef } from "react";

import { Container, TopInner, Swiper, Modal } from "@/shared/ui/index.ui";

import type { ReviewItem } from "@/entities/review/model/review.types";

import { ReviewCard } from "@/entities/review/ui";

import { useModalStore } from "@/shared/store/modal/modal.store";

import scss from "./ReviewsSection.module.scss";

interface ReviewsSectionProps {
  reviews?: ReviewItem[];
}

export const ReviewsSection = ({ reviews }: ReviewsSectionProps) => {
  const { activeModal, close, modalProps } = useModalStore();

  if (!reviews || reviews?.length < 1) return;

  const [videoSrc, videoPoster] =
    modalProps?.modal === "video"
      ? [modalProps.props.videoSrc, modalProps.props.videoPoster]
      : "1";

  return (
    <>
      <section className={scss["reviews-section"]}>
        <Container>
          <TopInner
            items={[
              {
                title: {
                  label: "Реальные",
                  labelAccent: "истории клиентов",
                },
                label: "Отзывы",
              },
            ]}
          >
            <div className={scss["reviews-section__content"]}>
              <Swiper
                config={{
                  spaceBetween: 20,
                  slidesPerView: 1,
                  breakpoints: {
                    1024: {
                      slidesPerView: 3,
                    },
                    768: {
                      slidesPerView: 2,
                    }
                  }
                }}
                arrows
                items={reviews.map((review) => (
                  <ReviewCard key={review.id} card={{ ...review }} />
                ))}
                grid="three"
              />
            </div>
          </TopInner>
        </Container>
      </section>

      <Modal isOpen={activeModal === "video"} onClose={close}>
        <div className={scss["reviews-modal"]}>
          <div className={scss["reviews-modal__box"]}>
            <video
              src={videoSrc}
              poster={videoPoster}
              controls
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

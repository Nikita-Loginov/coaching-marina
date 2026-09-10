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

  const [videoSrc, videoPoster, typeVideo] =
    modalProps?.modal === "video"
      ? [
          modalProps.props.videoSrc,
          modalProps.props.videoPoster,
          modalProps.props.type,
        ]
      : [undefined, undefined, undefined];

  console.log(reviews);

  const reviewsText = reviews.filter(
    (review) => review.text && review.text[0]?.length > 0
  );
  const reviewsVideo = reviews.filter((review) => review.videoSrc?.length);

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
              {reviewsVideo.length > 0 ? (
                <div className={scss["reviews-section__items"]}>
                  {reviewsVideo.map((review) => (
                    <ReviewCard key={review.id} card={{ ...review }} />
                  ))}
                </div>
              ) : null}

              <div className={scss["reviews-section__items"]}></div>
              {reviewsText.length > 0 ? (
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
                      },
                    },
                  }}
                  arrows
                  items={reviewsText.map((review) => (
                    <ReviewCard key={review.id} card={{ ...review }} />
                  ))}
                  grid="three"
                />
              ) : null}
            </div>
          </TopInner>
        </Container>
      </section>

      <Modal isOpen={activeModal === "video"} onClose={close}>
        <div className={scss["reviews-modal"]}>
          <div className={scss["reviews-modal__box"]}>
            {typeVideo === "vk" ? (
              <iframe
                src={videoSrc}
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={videoSrc}
                poster={videoPoster}
                controls
                playsInline
                preload="metadata"
              />
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

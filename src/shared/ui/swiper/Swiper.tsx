"use client";

import classNames from "classnames";
import { useId, useState } from "react";
import { Swiper as SwiperJs, SwiperSlide } from "swiper/react";
import type { SwiperOptions } from "swiper/types";
import { Mousewheel, A11y, Pagination, Navigation } from "swiper/modules";

import { Button } from "../index.ui";
import { Icons } from "@/shared/icons/index.icons";

import "swiper/css";
import "swiper/css/pagination";

import scss from "./Swiper.module.scss";

interface SwiperProps {
  config: SwiperOptions;
  items: React.ReactElement[];
  pagination?: boolean;
  arrows?: boolean;
}

export const Swiper = ({ config, items, pagination, arrows }: SwiperProps) => {
  const [isInit, setIsInit] = useState(false);

  const id = useId().replace(/:/g, "");

  const paginationSelector = `.swiper-pagination-${id}`;
  const prevSelector = `.swiper-prev-${id}`;
  const nextSelector = `.swiper-next-${id}`;

  if (!items.length) return null;

  const modules = [Mousewheel, A11y];

  if (pagination) {
    modules.push(Pagination);
  }

  if (arrows) {
    modules.push(Navigation);
  }

  return (
    <div className={classNames(scss["swiper"], isInit && scss["swiper--init"])}>
      <SwiperJs
        {...config}
        modules={modules}
        pagination={
          pagination
            ? {
                el: paginationSelector,
                clickable: true,
              }
            : false
        }
        navigation={
          arrows
            ? {
                prevEl: prevSelector,
                nextEl: nextSelector,
              }
            : false
        }
        mousewheel={{
          enabled: true,
          forceToAxis: true,
          sensitivity: 1,
          eventsTarget: "container",
        }}
        onInit={() => setIsInit(true)}
      >
        {items.map((slide, index) => (
          <SwiperSlide key={index} className={scss["swiper__slide"]}>
            {slide}
          </SwiperSlide>
        ))}
      </SwiperJs>

      {(pagination || arrows) && (
        <div className={scss["swiper__controls"]}>
          {arrows && (
            <Button
              className={classNames(
                scss["swiper__arrow"],
                scss["prev"],
                `swiper-prev-${id}`
              )}
              typeBtn="button"
              iconLeft={<Icons.ArrowChevronBottom />}
              variant="icon"
              size="medium"
              theme="secondary"
              iconSize="big"
              animationIconHover="default"
            />
          )}

          {pagination && (
            <div
              className={classNames(
                scss["swiper__pagination"],
                `swiper-pagination-${id}`
              )}
            />
          )}

          {arrows && (
            <Button
              className={classNames(
                scss["swiper__arrow"],
                scss["next"],
                `swiper-next-${id}`
              )}
              typeBtn="button"
              iconLeft={<Icons.ArrowChevronBottom />}
              variant="icon"
              size="medium"
              theme="secondary"
              iconSize="big"
              animationIconHover="default"
            />
          )}
        </div>
      )}
    </div>
  );
};

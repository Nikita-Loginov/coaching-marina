import Image from "next/image";
import classNames from "classnames";

import { HeroImgItem, HeroImgCardItem } from "../../lib/hero.types";

import scss from "./HeroImg.module.scss";

interface HeroImgProps {
  img: HeroImgItem;
  items: HeroImgCardItem[];
}

export const HeroImg = ({ img, items }: HeroImgProps) => {
  if (items.length > 2) return null;

  const { src, alt } = img;

  return (
    <div className={scss["hero-img"]}>
      <div className={scss["hero-img__box"]}>
        <Image src={src} alt={alt} />
      </div>

      <div className={scss["hero-img__items"]}>
        {items.map((item) => {
          const { title, desc } = item;

          return (
            <div className={scss["hero-img__card"]} key={title}>
              <p className={classNames("p4", scss["hero-img__card-title"])}>
                {title}
              </p>

              <p className={classNames("p2", scss["hero-img__card-desc"])}>
                {desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

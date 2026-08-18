import classNames from "classnames";

import { Container } from "../index.ui";
import { HeroImg } from "./parts/hero-img/HeroImg";

import { HeroImgCardItem, HeroImgItem } from "./lib/hero.types";

import scss from "./Hero.module.scss";

export interface HeroProps {
  title: {
    label: string;
    labelAccent: string;
  };
  desc: string[];
  badge?: string;
  img?: HeroImgItem;
  itemsImg?: HeroImgCardItem[];
  bottomInfo?: {
    position: "bottom" | "left";
    content: React.ReactNode;
  };
  innerGrid?: "default" | "grid";
}

export const Hero = ({
  title,
  desc,
  badge,
  img,
  bottomInfo,
  innerGrid = "grid",
  itemsImg,
}: HeroProps) => {
  const { label, labelAccent } = title;

  return (
    <section className={scss["hero"]}>
      <Container>
        <div
          className={classNames(
            scss["hero__inner"],
            scss[`hero__inner--${innerGrid}`]
          )}
        >
          <div className={scss["hero__content"]}>
            <div className={scss["hero__block"]}>
              {badge && (
                <p className="p3 primary-color-40 uppercase-text">{badge}</p>
              )}

              <h1 className={classNames("h1", scss['hero__title'])}>
                {label} <br />{" "}
                <span className="primary-color-40">{labelAccent}</span>
              </h1>
            </div>

            <div className={scss["hero__footer"]}>
              <div className={classNames("textbox", scss["hero__textbox"])}>
                {desc.map((text, index) => {
                  return (
                    <p className="p1" key={index}>
                      {text}
                    </p>
                  );
                })}
              </div>

              {bottomInfo?.content && bottomInfo.position === "left"
                ? bottomInfo.content
                : null}
            </div>
          </div>

          {(img && itemsImg) ? <HeroImg img={img} items={itemsImg} /> : null}

          {bottomInfo?.content && bottomInfo.position === "bottom"
            ? bottomInfo.content
            : null}
        </div>
      </Container>
    </section>
  );
};

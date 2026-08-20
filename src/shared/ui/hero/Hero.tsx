import classNames from "classnames";

import { Container } from "../index.ui";
import { HeroImg } from "./parts/hero-img/HeroImg";

import { HeroImgCardItem, HeroImgItem } from "./lib/hero.types";

import scss from "./Hero.module.scss";

export interface HeroProps {
  title: {
    label: string;
    labelAccent?: string;
    variant?: "h1" | "h2";
  };
  desc?: string[];
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
  const { label, labelAccent, variant = "h1" } = title;

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

              <h1 className={classNames(variant, scss["hero__title"])}>
                {label}
                {labelAccent ? (
                  <>
                    <br />{" "}
                    <span className="primary-color-40">{labelAccent}</span>
                  </>
                ) : null}
              </h1>
            </div>

            {desc ?  <div className={scss["hero__footer"]}>
              {desc.length > 0 ? (
                <div className={classNames("textbox", "textbox--second")}>
                  {desc.map((text, index) => {
                    return (
                      <p className="p1" key={index}>
                        {text}
                      </p>
                    );
                  })}
                </div>
              ) : null}

              {bottomInfo?.content && bottomInfo.position === "left"
                ? bottomInfo.content
                : null}
            </div> : null}

           
          </div>

          {img && itemsImg ? <HeroImg img={img} items={itemsImg} /> : null}

          {bottomInfo?.content && bottomInfo.position === "bottom"
            ? bottomInfo.content
            : null}
        </div>
      </Container>
    </section>
  );
};

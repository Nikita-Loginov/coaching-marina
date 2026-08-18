import type { StaticImageData } from "next/image";

export type HeroImgItem = {
  src: string | StaticImageData;
  alt: string;
};

export type HeroImgCardItem = {
  title: string;
  desc: string;
};

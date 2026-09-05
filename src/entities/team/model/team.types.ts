import { StaticImageData } from "next/image";

export type TeamItem = {
  post: string;
  name: string;
  middlename: string;
  desc: string;
  id: string;
  img: {
    src: string | StaticImageData;
    alt: string;
  };
};

export type TeamRow = {
  id: string;
  name: string;
  middlename: string;
  desc: string;
  post: string;
  img: string;
  imgAlt: string;
};

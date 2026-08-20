import { StaticImageData } from "next/image";

export type TeamItem = {
  post: string;
  name: string;
  middlename: string;
  id: string;
  img: {
    src: string | StaticImageData;
    alt: string;
  };
};

import { StaticImageData } from "next/image";

export type ProgramItem = {
  id: string;
  name: string;
  description: string[];
  as: 'modal' | 'page',
  btnText: string;
  img: {
    src: string | StaticImageData;
    alt: string;
  }
};
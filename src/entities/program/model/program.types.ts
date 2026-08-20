import { StaticImageData } from "next/image";

export type ProgramContentItem = {
  title?: string;
  desc: string[];
  as?: "default" | "list";
};

export type ProgramContent = {
  title: string;
  items: ProgramContentItem[];
};

export type ProgramItem = {
  id: string;
  name: string;
  description: string[];
  descriptionFull: string[];
  as: "modal" | "page";
  btnText: string;
  img: {
    src: string | StaticImageData;
    alt: string;
  };
  forWhom: ProgramContent;
  suitableRequests: ProgramContent;
  workflow: ProgramContent;
  cooperationFormat: ProgramContent;
  benefits: ProgramContent;
};

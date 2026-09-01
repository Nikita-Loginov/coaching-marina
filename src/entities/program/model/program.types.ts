import type { ReviewItem } from "@/entities/review/model/review.types";

export type ProgramContentItem = {
  title?: string;
  desc: string[];
  as?: "default" | "list";
};

export type ProgramContent = {
  title: string;
  items: ProgramContentItem[];
  showed: boolean;
  variant: "small" | "big";
};

export type ProgramImage = {
  src: string;
  alt: string;
};

export type ProgramItem = {
  id: string;

  name: string;

  description: string[];

  descriptionFull: string[];

  as: "modal" | "page";

  btnText: string;

  btnTextInner: string;

  teamShowed: boolean;

  type: "GENERAL" | "EDUCATION";

  img: ProgramImage;

  forWhom: ProgramContent;

  suitableRequests: ProgramContent;

  workflow: ProgramContent;

  cooperationFormat: ProgramContent;

  benefits: ProgramContent;

  skills?: ProgramContent;

  learningValue?: ProgramContent;

  reviews?: ReviewItem[];
};

export type ProgramRow = {
  id: string;

  name: string;

  description: string[];

  descriptionFull: string[];

  as: string;

  btnText: string;

  btnTextInner: string;

  teamShowed: boolean;

  type: "GENERAL" | "EDUCATION";

  img: unknown;

  forWhom: unknown;

  suitableRequests: unknown;

  workflow: unknown;

  cooperationFormat: unknown;

  benefits: unknown;

  skills: unknown;

  learningValue: unknown;

  reviews: unknown;

  createdAt: Date;

  updatedAt: Date;
};

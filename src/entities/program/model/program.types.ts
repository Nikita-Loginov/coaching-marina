import type { ReviewItem } from "@/entities/review/model/review.types";

export type ProgramContentItem = {
  title?: string;
  desc: string[];
  as?: "default" | "list";
};

export type ProgramContent = {
  title: string;
  items: ProgramContentItem[];
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

  img: ProgramImage;

  forWhom: ProgramContent;

  suitableRequests: ProgramContent;

  workflow: ProgramContent;

  cooperationFormat: ProgramContent;

  benefits: ProgramContent;

  reviews?: ReviewItem[];
};

export type ProgramRow = {
  id: string;

  name: string;

  description: string[];

  descriptionFull: string[];

  as: string;

  btnText: string;

  img: unknown;

  forWhom: unknown;

  suitableRequests: unknown;

  workflow: unknown;

  cooperationFormat: unknown;

  benefits: unknown;

  reviews: unknown;

  createdAt: Date;

  updatedAt: Date;
};

import type {
  ProgramContent,
  ProgramImage,
  ProgramItem,
  ProgramRow,
} from "./program.types";

import type { ReviewItem } from "@/entities/review/model/review.types";

const mapContent = (value: unknown): ProgramContent => {
  return value as ProgramContent;
};

const mapImage = (value: unknown): ProgramImage => {
  return value as ProgramImage;
};

const mapReviews = (value: unknown): ReviewItem[] | undefined => {
  if (!value) return undefined;

  return value as ReviewItem[];
};

export const mapProgram = (row: ProgramRow): ProgramItem => ({
  id: row.id,

  name: row.name,

  description: row.description,

  descriptionFull: row.descriptionFull,

  as: row.as as ProgramItem["as"],

  btnText: row.btnText,

  btnTextInner: row.btnTextInner,

  img: mapImage(row.img),

  teamShowed: row.teamShowed,

  forWhom: mapContent(row.forWhom),

  suitableRequests: mapContent(row.suitableRequests),

  workflow: mapContent(row.workflow),

  cooperationFormat: mapContent(row.cooperationFormat),

  benefits: mapContent(row.benefits),

  reviews: mapReviews(row.reviews),
});

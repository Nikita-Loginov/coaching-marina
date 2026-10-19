import type { ProgramContent } from "./program.types";

export const PROGRAM_CONTENT_KEYS = [
  "forWhom",
  "suitableRequests",
  "workflow",
  "cooperationFormat",
  "benefits",
  "skills",
  "learningValue",
] as const;

export type ProgramContentKey = (typeof PROGRAM_CONTENT_KEYS)[number];

const emptyCardButton = {
  buttonShowed: false,
  buttonText: "",
};

type ProgramButtonSource = {
  id: string;
  type: "GENERAL" | "EDUCATION";
  btnTextInner: string;
};

export const cardButtonPreset = (
  program: ProgramButtonSource,
  key: ProgramContentKey
) => {
  if (key === "cooperationFormat" && program.btnTextInner.trim()) {
    return {
      buttonShowed: true,
      buttonText: program.btnTextInner,
    };
  }

  if (
    key === "workflow" &&
    program.type === "EDUCATION" &&
    program.id !== "training-programs"
  ) {
    return {
      buttonShowed: true,
      buttonText: "Заказать тест-драйв",
    };
  }

  return emptyCardButton;
};

export const withCardButton = <T extends ProgramContent>(
  content: T,
  preset = emptyCardButton
): T => {
  if (typeof content.buttonShowed === "boolean") {
    return {
      ...content,
      buttonText: content.buttonText ?? "",
    };
  }

  return {
    ...content,
    buttonShowed: preset.buttonShowed,
    buttonText: preset.buttonText,
  };
};

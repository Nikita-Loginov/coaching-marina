const NON_BREAKING_WORDS = [
  "а",
  "в",
  "и",
  "к",
  "о",
  "с",
  "у",
  "во",
  "до",
  "за",
  "из",
  "на",
  "не",
  "ни",
  "но",
  "об",
  "от",
  "по",
  "под",
  "без",
  "со",
  "над",
  "при",
  "для",
  "же",
  "бы",
  "ли",
  "то",
  "ну",
  "да",
];

export const preventOrphans = (text: string): string => {
  const textWithNewLines = text.replace(/<br\s*\/?>/gi, "\n");
  
  const regex = new RegExp(`\\s(${NON_BREAKING_WORDS.join("|")})\\s`, "gi");
  return textWithNewLines.replace(regex, " $1\u00A0");
};

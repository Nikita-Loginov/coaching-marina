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

export const preventOrphans = (text: string) => {
  const regex = new RegExp(`\\s(${NON_BREAKING_WORDS.join("|")})\\s`, "gi");

  return text.replace(regex, " $1\u00A0");
};

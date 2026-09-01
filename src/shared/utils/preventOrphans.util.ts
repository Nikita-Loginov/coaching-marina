const NON_BREAKING_WORDS = [
  "а",
  "и",
  "но",
  "да",
  "в",
  "во",
  "к",
  "ко",
  "с",
  "со",
  "у",
  "о",
  "об",
  "от",
  "до",
  "из",
  "за",
  "на",
  "по",
  "под",
  "над",
  "при",
  "для",
  "не",
];

export const preventOrphans = (text: string) => {
  const regex = new RegExp(`\\s(${NON_BREAKING_WORDS.join("|")})\\s`, "gi");

  return text.replace(regex, " $1\u00A0");
};

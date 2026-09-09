export const replaceBrWithNewLine = (text: string): string => {
  return text.replace(/<br\s*\/?>/gi, "\n");
};

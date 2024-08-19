export const splitThousandSeparator = (num: number): string => {
  let prefix = "";
  if (num < 0) {
    num *= -1;
    prefix = "-";
  }
  let DIGIT_PATTERN = /(^|\s)\d+(?=\.?\d*($|\s))/g;
  let MILI_PATTERN = /(?=(?!\b)(\d{3})+\.?\b)/g;
  let str = num
    .toString()
    .replace(DIGIT_PATTERN, (m) => m.replace(MILI_PATTERN, ","));
  return prefix + str;
};

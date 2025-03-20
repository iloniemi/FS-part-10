export const numberToText = number => {
  if (number < 1000) return number;
  const hundreds = Math.round(number/100);
  const thousands = hundreds/10;
  return `${thousands} k`
};
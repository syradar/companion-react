export const displaySign = (value: number): string => {
  if (value > 0) return '+';
  if (value === 0) return '±';
  return '';
};

export const replaceZeroWithDash = (value: number) =>
  value === 0 ? '–' : value;

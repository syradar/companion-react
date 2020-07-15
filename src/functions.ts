export const displaySign = (value: number): string => {
  if (value > 0) return '+';
  if (value === 0) return '±';
  return '';
};

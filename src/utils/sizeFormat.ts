

export const sizeFormat = (num: number, fixed = 2) => {
  if (!num || isNaN(num)) {
    return 0;
  }

  const rounded = num.toFixed(fixed);
  return parseFloat(rounded);
};

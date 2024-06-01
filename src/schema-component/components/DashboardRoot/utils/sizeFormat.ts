

export const sizeFormat = (num: number) => {
  if (!num || isNaN(num)) {
    return 0;
  }

  const rounded = num.toFixed(2);
  return parseFloat(rounded);
};

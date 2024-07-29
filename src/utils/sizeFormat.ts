export function sizeFormat(num: number, fixed = 2) {
  if (!num || Number.isNaN(num)) {
    return 0
  }

  const rounded = num.toFixed(fixed)
  return Number.parseFloat(rounded)
}

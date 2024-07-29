import Decimal from 'decimal.js'

export function getPercent(value = 0, total = 0, { fixed = 1 }: { fixed?: number } = { fixed: 1 }) {
  if (!total || !value || Number(total) === 0 || Number(value) === 0) {
    return 0
  }
  return new Decimal(Decimal.mul(Decimal.div(value || 0, total || 0), 100).toFixed(fixed)).toNumber()
}

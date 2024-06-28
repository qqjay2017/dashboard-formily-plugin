import Decimal from 'decimal.js'
import React from 'react'

export const getPercent = (value = 0, total = 0, { fixed = 0 }: { fixed?: number }) => {
    if (total == 0 || value == 0) {
        return 0
    }
    return new Decimal(Decimal.mul(Decimal.div(value || 0, total || 0), 100).toFixed(fixed)).toNumber()
}

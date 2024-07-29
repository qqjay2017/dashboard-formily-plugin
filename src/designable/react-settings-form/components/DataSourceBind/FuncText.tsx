import { css } from '@emotion/css'
import React from 'react'

export function FuncText({
  text = '',
  indent = 0,
}: {
  text?: string
  indent?: number
}) {
  return (
    <div
      className={css`
        margin-left: ${indent}px;
        margin-bottom: 4px;
        margin-top: 4px;
        font-size: 14px;
        line-height: 16px;
      `}
    >
      {text}
    </div>
  )
}

import { css } from '@emotion/css'
import type { PropsWithChildren } from 'react'
import React from 'react'

export function FormButtonGroupWrap({ children }: PropsWithChildren) {
  return (
    <div
      className={css`
        padding-right: 30px;
        height: 40px;
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 10;
      `}
    >
      {children}
    </div>
  )
}

import { css } from '@emotion/css'
import type { PropsWithChildren } from 'react'
import React from 'react'

export function FormSubmitBtnWrap({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={css`
        height: 56px;
        padding: 12px 24px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 12px;
        ${className}
      `}
    >
      {children}
    </div>
  )
}

import { css } from '@emotion/css'
import type { PropsWithChildren } from 'react'

export function CreateBtnWrap({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={css`
        padding: 24px;
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

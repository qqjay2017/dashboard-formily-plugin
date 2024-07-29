import type { FC, ReactNode } from 'react'
import React from 'react'

export const BlankComponent: FC<{ children?: ReactNode }> = ({ children }) => (
  <>{children}</>
)

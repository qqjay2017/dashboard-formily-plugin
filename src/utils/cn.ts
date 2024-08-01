import { type ClassValue, clsx } from 'clsx'

import { cx as cxFun } from '@emotion/css'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export const cx = cxFun

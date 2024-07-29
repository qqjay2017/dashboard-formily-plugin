import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { cx as cxFun } from '@emotion/css'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cx = cxFun

import { BASE_URL, isProduct } from '@/utils/env'

export function resolveStatic(path = '') {
  if (isProduct) {
    return BASE_URL.substring(0, BASE_URL.length - 1) + path
  }
  else {
    return path
  }

  // if (import.meta.env.PROD) {

  // }
  // return path
}
export const rs = resolveStatic

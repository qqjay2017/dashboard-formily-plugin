import { useLayout } from './useLayout'

export function useTheme() {
  return useLayout()?.theme
}

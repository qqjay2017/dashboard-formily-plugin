import { useApp } from './useApp'

export function useRouter() {
  const app = useApp()
  return app?.router
}

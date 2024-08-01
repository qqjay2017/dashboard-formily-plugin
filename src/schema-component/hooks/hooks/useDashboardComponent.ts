import { useContext } from 'react'
import { DashboardComponentContext } from '@/schema-component/components/context'

export function useDashboardComponent() {
  const ctx = useContext(DashboardComponentContext)
  if (!ctx) {
    throw new Error('useDashboardComponent  must in DashboardRootRendererContext')
  }
  return ctx
}

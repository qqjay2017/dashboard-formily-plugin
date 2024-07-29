import { useContext } from 'react'
import { DashboardRootContext } from '../context'

export function useDashboardRoot() {
  const ctx = useContext(DashboardRootContext)
  if (!ctx) {
    throw new Error('useDashboardRoot must in DashboardRootRendererContext')
  }
  return ctx
}

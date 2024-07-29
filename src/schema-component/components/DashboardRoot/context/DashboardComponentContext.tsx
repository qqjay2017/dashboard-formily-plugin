import { createContext } from 'react'
import type { DashboardComponentContextValue } from '../../PositionDecorator/types'

export const DashboardComponentContext
  = createContext<DashboardComponentContextValue>({})

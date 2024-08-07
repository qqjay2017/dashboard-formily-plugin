import { createContext } from 'react'
import type Application from './Application'

export const ApplicationContext = createContext<Application | null>({} as any)
ApplicationContext.displayName = 'ApplicationContext'

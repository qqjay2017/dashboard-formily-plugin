import { useContext } from 'react'

import { ApplicationContext } from '../context'
import type Application from '../Application'

export function useApp() {
  return useContext(ApplicationContext) || ({} as Application)
}

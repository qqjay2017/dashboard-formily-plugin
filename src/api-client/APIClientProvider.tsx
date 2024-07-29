import type { ReactNode } from 'react'
import React from 'react'
import type { APIClient } from './APIClient'
import { APIClientContext } from './context'

export interface APIClientProviderProps {
  apiClient: APIClient
  children?: ReactNode
}

export const APIClientProvider: React.FC<APIClientProviderProps> = (props) => {
  const { apiClient, children } = props
  return <APIClientContext.Provider value={apiClient}>{children}</APIClientContext.Provider>
}

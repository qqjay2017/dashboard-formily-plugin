import { SchemaOptionsContext } from '@formily/react'
import { useContext } from 'react'

export function useSchemaOptionsContext() {
  const options = useContext(SchemaOptionsContext)
  return options || {}
}

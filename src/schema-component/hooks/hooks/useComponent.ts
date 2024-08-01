import { SchemaOptionsContext } from '@formily/react'
import { get } from 'lodash-es'
import { useContext } from 'react'

export function useComponent(component: any, defaults?: any) {
  const { components } = useContext(SchemaOptionsContext)
  if (!component) {
    return defaults
  }
  if (typeof component !== 'string') {
    return component
  }
  return get(components, component) || defaults
}

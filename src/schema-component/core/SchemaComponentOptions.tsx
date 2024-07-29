import {
  ExpressionScope,
  SchemaComponentsContext,
  SchemaOptionsContext,
} from '@formily/react'
import React, { memo, useMemo } from 'react'
import type { ISchemaComponentOptionsProps } from '../types'
import { useSchemaOptionsContext } from './useSchemaOptionsContext'

export const SchemaComponentOptions: React.FC<ISchemaComponentOptionsProps>
  = memo((props) => {
    const { children } = props
    const options = useSchemaOptionsContext()
    const components = useMemo(() => {
      return { ...options.components, ...props.components }
    }, [options.components, props.components])

    const scope = useMemo(() => {
      return { ...options.scope, ...props.scope }
    }, [options.scope, props.scope])

    const schemaOptionsContextValue = useMemo(() => {
      return { scope, components }
    }, [scope, components])

    return (
      <SchemaOptionsContext.Provider value={schemaOptionsContextValue}>
        <SchemaComponentsContext.Provider value={components}>
          <ExpressionScope value={scope}>{children}</ExpressionScope>
        </SchemaComponentsContext.Provider>
      </SchemaOptionsContext.Provider>
    )
  })

SchemaComponentOptions.displayName = 'SchemaComponentOptions'

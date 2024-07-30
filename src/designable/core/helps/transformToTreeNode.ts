import { type ISchema, Schema } from '@formily/react'

import { uid } from '@formily/shared'
import type { ITreeNode } from '../models'

export interface IFormilySchema {
  schema?: ISchema
  root?: Record<string, any>
}
export interface ITransformerOptions {
  designableFieldName?: string
  designableFormName?: string
}

function createOptions(options: ITransformerOptions): ITransformerOptions {
  return {
    designableFieldName: 'Field',
    designableFormName: 'Root',
    ...options,
  }
}
export function transformToTreeNode(
  formily: IFormilySchema = {},
  options?: ITransformerOptions,
) {
  const realOptions = createOptions(options)

  const root: ITreeNode = {
    componentName: realOptions.designableFormName,
    props: formily.root,
    children: [],
  }
  const schema = new Schema(formily.schema)
  const cleanProps = (props: any) => {
    if (props.name === props['x-designable-id']) {
      delete props.name
    }
    delete props.version
    delete props._isJSONSchemaObject
    return props
  }
  const appendTreeNode = (parent: ITreeNode, schema: Schema) => {
    if (!schema)
      return

    const current = {
      id: schema['x-designable-id'] || uid(),
      componentName: realOptions.designableFieldName,
      props: cleanProps(schema.toJSON(false)),
      children: [],
    }
    parent.children.push(current)
    if (schema.items && !Array.isArray(schema.items)) {
      appendTreeNode(current, schema.items)
    }
    schema.mapProperties((schema) => {
      schema['x-designable-id'] = schema['x-designable-id'] || uid()
      appendTreeNode(current, schema)
    })
  }
  schema.mapProperties((schema) => {
    schema['x-designable-id'] = schema['x-designable-id'] || uid()
    appendTreeNode(root, schema)
  })
  return root
}

import type { ISchema } from '@formily/react'
import getDataSourceBindSchema from '../../getDataSourceBindSchema'

function getCompomentTypeInfoSchema(properties = {}, properties2 = {}): any {
  return {
    type: 'object',
    properties: {
      componentType: {
        'type': 'string',
        'title': '组件类型',
        'required': false,
        'x-decorator': 'FormItem',
        'x-component': 'ComponentAddressFormItem',
      },
      componentAddress: {
        'type': 'string',
        'title': '组件路径',
        'required': false,
        'x-decorator': 'FormItem',
        'x-component': 'ComponentTypeFormItem',
      },
      ...properties,
      dependencies: {
        'type': 'object',
        'title': '查询',
        'required': false,
        'x-decorator': 'FormItem',
        'x-component': 'DepFieldSetFormItem',
      },
      decoratorProps: {
        'type': 'object',
        'title': '位置/尺寸信息',
        'required': false,
        'x-decorator': 'FormItem',
        'x-component': 'PositionDecoratorFormItem',
      },
      decoratorPadding: {
        'name': 'decoratorProps',
        'type': 'array',
        'title': '间距',
        'required': false,
        'x-decorator': 'FormItem',
        'x-component': 'DecoratorPaddingFormItem',
      },
      ...properties2,
    },
  }
}

export const settingSchema: ISchema = getCompomentTypeInfoSchema({
  ...getDataSourceBindSchema(),
})

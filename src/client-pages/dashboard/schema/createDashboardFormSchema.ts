import type { ISchema } from '@formily/react'

export const createDashboardFormSchema: ISchema = {
  type: 'object',
  properties: {
    name: {
      'type': 'string',
      'title': '名称',
      'required': true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    themeProvider: {
      'type': 'string',
      'title': '主题颜色',
      'required': true,
      'default': 'technologyBlue',
      'x-decorator': 'FormItem',
      'x-component': 'ColorTypeSelect',
    },
    isDarkTheme: {
      'type': 'boolearn',
      'title': '主题风格',
      'required': true,
      'default': true,
      'x-decorator': 'FormItem',
      'x-component': 'IsDarkThemeSelect',
    },
    designWidthEnum: {
      'type': 'string',
      'title': '设计稿尺寸',
      'required': true,
      'default': '1920',
      'x-decorator': 'FormItem',
      'x-component': 'DesignWidthEnumSelect',
    },
    description: {
      'type': 'string',
      'title': '描述',
      'required': true,
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
    },

  },
}

export const updateDashboardFormSchema: ISchema = {
  type: 'object',
  properties: {
    name: {
      'type': 'string',
      'title': '名称',
      'required': true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },

    description: {
      'type': 'string',
      'title': '描述',
      'required': true,
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
    },
  },
}

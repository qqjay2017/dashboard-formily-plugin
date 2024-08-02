/* eslint-disable no-template-curly-in-string */
import type { FormConfig } from 'antd/es/config-provider/context'
import React from 'react'

export const globalFormConfig: FormConfig = {

    validateMessages: {
        default: '字段验证错误${label}',
        required: '请输入${label}',
        enum: '${label}必须是其中一个[${enum}]',
        whitespace: '${label}不能为空字符',
        date: {
            format: '${label}日期格式无效',
            parse: '${label}不能转换为日期',
            invalid: '${label}是一个无效日期',
        },
    },

}

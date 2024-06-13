import { ISchema } from '@formily/react';
import { ApiGroupFormItem } from './ApiGroupFormItem';
import { ApiBaseNameFormItem } from './ApiBaseNameFormItem';
import { ApiOriginFormItem } from './ApiOriginFormItem';
import { ApiHeadersFormItem } from './ApiHeadersFormItem';


export const editApiFormSchema: ISchema = {
    type: "object",
    properties: {
        name: {
            type: "string",
            title: "API标题",
            required: true,
            "x-decorator": "FormItem",
            "x-component": "Input",
        },
        description: {
            type: "string",
            title: "API说明",
            required: false,
            "x-decorator": "FormItem",
            "x-component": "Input.TextArea",
        },
        groupId: {
            type: "string",
            title: "API分组",
            required: false,
            "x-decorator": "FormItem",
            "x-component": ApiGroupFormItem,
        },
        originId: {
            type: 'string',
            title: "API域名",
            required: false,
            "x-decorator": "FormItem",
            "x-component": ApiOriginFormItem,
        },
        baseNameId: {
            type: 'string',
            title: "API前缀",
            required: false,
            "x-decorator": "FormItem",
            "x-component": ApiBaseNameFormItem,
        },
        url: {
            type: "string",
            title: "请求地址",
            required: true,
            "x-decorator": "FormItem",
            "x-component": "Input",
            "x-validator": {
                "type": "string",
                "pattern": "^/.*$",
                message: "以/开头"
            }
        },
        method: {
            type: "string",
            title: "请求地址",
            required: true,
            "x-decorator": "FormItem",
            "x-component": "Radio.Group",
            enum: [
                {
                    label: 'GET',
                    value: "GET",
                },
                {
                    label: 'POST',
                    value: "POST",
                },
                {
                    label: 'PUT',
                    value: "PUT",
                },
                {
                    label: 'DELETE',
                    value: "DELETE",
                },
            ]
        },
        headers: {
            type: "array",
            title: "自定义请求头",
            required: false,
            "x-decorator": "FormItem",
            "x-component": ApiHeadersFormItem,
            "x-validator": {
                type: 'array',
                validator: (value: any) => {

                    if (value.find(v => !v.headerKey || !v.headerKey)) {
                        return Promise.reject("请输入字段名和值")
                    }


                }

            },

        }

    },
};

import { ISchema } from '@formily/react'
import React from 'react'

const ClassicFrame: ISchema = {
    type: "object",
    properties: {
        title: {
            type: "string",
            title: "标题",
            required: true,
            "x-decorator": "FormItem",
            "x-component": "Input",

        },

    },
};

const Statistic: ISchema = {
    type: "object",
    properties: {
        title: {
            type: "string",
            title: "标题",
            required: true,
            "x-decorator": "FormItem",
            "x-component": "Input",

        },
        amount: {
            type: "string",
            title: "值",
            required: true,
            "x-decorator": "FormItem",
            "x-component": "Input",

        },
        busType: {
            type: "string",
            title: "绑定业务",
            required: true,
            "x-decorator": "FormItem",
            "x-component": "Select",
            'x-component-props': {
                options: [
                    {
                        label: '安全',
                        value: 'aq'
                    },
                    {
                        label: '项目',
                        value: 'xm'
                    },
                ]
            }

        },
        busField: {
            type: "string",
            title: "绑定字段",
            required: true,
            "x-decorator": "FormItem",
            "x-component": "Select",
            'x-component-props': {
                options: [
                    {
                        label: '工程造价',
                        value: 'gczj'
                    },
                    {
                        label: '剩余工期',
                        value: 'gq'
                    },
                ]
            }

        },

    },
};

const dashboardRootFormSchema: ISchema = {
    type: "object",
    properties: {
        designWidth: {
            type: "number",
            title: "设计稿尺寸-宽度",
            required: true,
            "x-decorator": "FormItem",
            "x-component": "NumberPicker",
            "x-component-props": {
                addonAfter: "px",
            },
        },
        designHeight: {
            type: "number",
            title: "设计稿尺寸-高度",
            required: true,
            "x-decorator": "FormItem",
            "x-component": "NumberPicker",
            "x-component-props": {
                addonAfter: "px",
            },
        },
        themeProvider: {
            type: "string",
            title: "主题颜色",
            required: true,
            "x-decorator": "FormItem",
            "x-component": "ColorTypeSelect",
        },
        isDarkTheme: {
            type: "boolearn",
            title: "主题风格",
            required: true,
            "x-decorator": "FormItem",
            "x-component": "IsDarkThemeSelect",
        },
    },
};

export const allComponentTypeSettingSchema: Record<string, ISchema> = {
    "ClassicFrame": ClassicFrame,
    "DashboardRoot": dashboardRootFormSchema,
    Statistic

}

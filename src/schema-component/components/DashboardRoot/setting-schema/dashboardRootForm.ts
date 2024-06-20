import { ISchema } from "@formily/react";

export const dashboardRootFormSchema: ISchema = {
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
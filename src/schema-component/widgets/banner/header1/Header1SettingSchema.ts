import { positionDecoratorFormItemSchema } from "@/schema-component/components/DashboardRoot/setting-schema";
import { ISchema } from "@formily/react";



export const Header1SettingSchema: ISchema = {
    type: "object",
    properties: {
        title: {
            type: "string",
            title: "标题",
            required: true,
            "x-decorator": "FormItem",
            "x-component": "Input",

        },
        ...positionDecoratorFormItemSchema,
        dependencies: {
            type: "object",
            title: "查询",
            required: false,
            "x-decorator": "FormItem",
            "x-component": "DepFieldSetFormItem",
        },

    },
};

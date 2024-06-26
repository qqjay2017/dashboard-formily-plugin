import { ISchema } from "@formily/react";
import { positionDecoratorFormItemSchema } from "../../components/DashboardRoot/setting-schema";


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
        ...positionDecoratorFormItemSchema

    },
};

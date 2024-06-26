import { ISchema } from "@formily/react";
import { compomentTypeInfoSchema, positionDecoratorFormItemSchema } from "../../../components/DashboardRoot/setting-schema";


export const ClassicFrameSettingSchema: ISchema = {
    type: "object",
    properties: {
        ...compomentTypeInfoSchema,
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

import { ISchema } from "@formily/react";
import { positionDecoratorFormItemSchema } from "./positionDecoratorFormItemSchema";

export const Header1: ISchema = {
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

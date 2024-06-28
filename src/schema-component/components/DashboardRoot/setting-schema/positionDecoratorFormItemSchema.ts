import { ISchema } from "@formily/react";
import { DecoratorPaddingFormItem } from "./DecoratorPaddingFormItem";
import { PositionDecoratorFormItem } from "./PositionDecoratorFormItem";

export const positionDecoratorFormItemSchema: ISchema['properties'] = {
    decoratorProps: {
        type: "object",
        title: "位置/尺寸信息",
        required: false,
        "x-decorator": "FormItem",
        "x-component": PositionDecoratorFormItem,
    },
    decoratorPadding: {
        name: 'decoratorProps',
        type: "array",
        title: "间距",
        required: false,
        "x-decorator": "FormItem",
        "x-component": DecoratorPaddingFormItem,
    }
}
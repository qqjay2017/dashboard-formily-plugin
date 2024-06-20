import { PositionDecoratorFormItem } from "../PositionDecoratorFormItem";

export const positionDecoratorFormItemSchema = {
    decoratorProps: {
        type: "object",
        title: "位置/尺寸信息",
        required: false,
        "x-decorator": "FormItem",
        "x-component": PositionDecoratorFormItem,
    }
}
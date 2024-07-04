

export const positionDecoratorFormItemSchema = {
    decoratorProps: {
        type: "object",
        title: "位置/尺寸信息",
        required: false,
        "x-decorator": "FormItem",
        "x-component": "PositionDecoratorFormItem",
    },
    decoratorPadding: {
        name: 'decoratorProps',
        type: "array",
        title: "间距",
        required: false,
        "x-decorator": "FormItem",
        "x-component": "DecoratorPaddingFormItem",
    }
}
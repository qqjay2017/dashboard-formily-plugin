import type { ISchema } from "@formily/react";

export const positionDecoratorPropsSchema: ISchema = {
  type: "object",
  properties: {
    w: {
      title: "宽度",
      type: "number",
      "x-decorator": "FormItem",
      "x-component": "NumberPicker",
    },
    h: {
      title: "高度",
      type: "number",
      "x-decorator": "FormItem",
      "x-component": "NumberPicker",
    },
    x: {
      title: "X坐标",
      type: "number",
      "x-decorator": "FormItem",
      "x-component": "NumberPicker",
    },
    y: {
      title: "Y坐标",
      type: "number",
      "x-decorator": "FormItem",
      "x-component": "NumberPicker",
    },

    padding: {
      title: "内边距",
      "x-component": "BoxStyleSetter",
    },
    zIndex: {
      title: "展示层级",
      "x-decorator": "FormItem",
      "x-component": "NumberPicker",
    },
  },
};

import type { ISchema } from "@formily/react";

export const createAppGroupSchema: ISchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      title: "名称",
      required: true,
      "x-decorator": "FormItem",
      "x-component": "Input",
    },
    sortNum: {
      type: "number",
      title: "排序码",

      "x-decorator": "FormItem",
      "x-component": "NumberPicker",
    },
    icon: {
      type: "string",
      title: "图标",
      required: false,
      "x-decorator": "FormItem",
      "x-component": "Input",
    },
    description: {
      type: "string",
      title: "描述",
      required: false,
      "x-decorator": "FormItem",
      "x-component": "Input.TextArea",
    },
  },
};

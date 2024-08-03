import type { ISchema } from "@formily/react";
import { chartTypeOptions } from "./consts";

export const createChartSchema: ISchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      title: "名称",
      required: true,
      "x-decorator": "FormItem",
      "x-component": "Input",
    },
    type: {
      type: "string",
      title: "类型",
      required: true,
      "x-decorator": "FormItem",
      "x-component": "Select",
      "x-component-props": {
        options: chartTypeOptions,
      },
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

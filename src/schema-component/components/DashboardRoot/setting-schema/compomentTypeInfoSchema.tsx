import { theme } from "antd";

import { get } from "lodash-es";
import { useApp } from "@/application";
import { PositionDecoratorFormItem } from "./PositionDecoratorFormItem";
import { DecoratorPaddingFormItem } from "./DecoratorPaddingFormItem";

function InfoCom({ value }) {
  const app = useApp();
  const { token } = theme.useToken();
  const zhName = get(app.components || {}, `${value}.menuItem.label`, "");
  if (!zhName) {
    return (
      <div
        style={{
          color: token.colorText,
        }}
      >
        {value}
      </div>
    );
  }
  return (
    <div
      style={{
        color: token.colorText,
      }}
    >
      {`${zhName}(${value})`}
    </div>
  );
}

function InfoCom2({ value }) {
  const { token } = theme.useToken();

  return (
    <div
      style={{
        color: token.colorText,
      }}
    >
      {value}
    </div>
  );
}
export function getCompomentTypeInfoSchema(properties: any = {}) {
  return {
    type: "object",
    properties: {
      componentType: {
        type: "string",
        title: "组件类型",
        required: false,
        "x-decorator": "FormItem",
        "x-component": InfoCom,
      },
      componentAddress: {
        type: "string",
        title: "组件路径",
        required: false,
        "x-decorator": "FormItem",
        "x-component": InfoCom2,
      },
      ...properties,
      decoratorProps: {
        type: "object",
        title: "位置/尺寸信息",
        required: false,
        "x-decorator": "FormItem",
        "x-component": PositionDecoratorFormItem,
      },
      decoratorPadding: {
        name: "decoratorProps",
        type: "array",
        title: "间距",
        required: false,
        "x-decorator": "FormItem",
        "x-component": DecoratorPaddingFormItem,
      },
    },
  };
}

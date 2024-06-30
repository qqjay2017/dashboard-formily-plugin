import { theme } from "antd";

import { get } from "lodash-es";
import { useApp } from "@/application";

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
export function getCompomentTypeInfoSchema() {
  return {
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
  };
}

import { theme } from "antd";

function InfoCom({ value }) {
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
export const compomentTypeInfoSchema = {
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
    "x-component": InfoCom,
  },
};

import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/zh-cn";
import { FormItemComponentProps } from "../../types";
import { message } from "antd";

export const JsonInput = ({ value, onChange }: FormItemComponentProps) => {
  return (
    <JSONInput
      width="100%"
      height="350px"
      locale={locale}
      placeholder={value}
      onChange={(e) => {
        console.log(e, "eee");
        if (!e) {
          return false;
        }
        const { error, jsObject = {} } = e;
        if (error) {
          message.warning("line" + error.line + ": " + error.reason);
          return false;
        }
        onChange && onChange(jsObject);
      }}
    />
  );
};

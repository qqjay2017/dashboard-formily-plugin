import { FormItemComponentProps } from "@/types";

import { MonacoEditor } from "../../DataSourceBind/MyEditorComponent";

export const JsonInput = ({ value, onChange }: FormItemComponentProps) => {
  return (
    <MonacoEditor
      theme="vs-dark"
      language="json"
      value={value || ""}
      onChange={(e) => {
        onChange && onChange(e);
      }}
    />
  );
};

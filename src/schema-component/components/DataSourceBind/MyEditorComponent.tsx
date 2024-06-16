import Editor from "@monaco-editor/react";
import { FormItemComponentProps } from "../../../types";

export function MonacoEditor({ value, onChange }: FormItemComponentProps) {
  return (
    <Editor
      options={{
        scrollbar: {
          alwaysConsumeMouseWheel: false,
        },
        minimap: {
          enabled: false,
        },

        scrollBeyondLastLine: false,
      }}
      height="300px"
      defaultLanguage="javascript"
      defaultValue=""
      value={value}
      onChange={onChange}
    />
  );
}

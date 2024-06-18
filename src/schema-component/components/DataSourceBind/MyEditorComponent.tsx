import Editor from "@monaco-editor/react";
import { FormItemComponentProps } from "../../../types";

interface MonacoEditorProps extends FormItemComponentProps {
  language?: string;
  theme?: "vs-dark" | "light";
  readOnly?: boolean;
  height?: string;
  scrollBeyondLastLine?: boolean;
  defaultValue?: string;
}

export function MonacoEditor({
  value,
  onChange,
  language = "javascript",
  theme = "light",
  readOnly = false,
  height = "300px",
  scrollBeyondLastLine = false,
  defaultValue,
}: MonacoEditorProps) {
  // 初始化后自动格式化
  const handleEditorMount = (editor) => {
    console.log(editor, "editor");
    setTimeout(function () {
      editor.getAction("editor.action.formatDocument").run();
    }, 500);
  };
  return (
    <Editor
      onMount={handleEditorMount}
      theme={theme}
      options={{
        formatOnType: true,
        formatOnPaste: true,
        automaticLayout: true,
        readOnly: readOnly,
        scrollbar: {
          alwaysConsumeMouseWheel: false,
        },
        minimap: {
          enabled: false,
        },

        scrollBeyondLastLine: scrollBeyondLastLine,
      }}
      language={language}
      height={height}
      defaultValue={defaultValue}
      value={value}
      onChange={(e) => {
        onChange && onChange(e);
      }}
    />
  );
}

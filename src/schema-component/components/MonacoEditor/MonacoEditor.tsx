import Editor, { loader } from "@monaco-editor/react";
import { forwardRef, useImperativeHandle, useRef } from "react";

import type { FormItemComponentProps } from "../../../types";
import { BASE_URL } from "@/env";

interface MonacoEditorProps extends FormItemComponentProps {
  language?: string;
  theme?: "vs-dark" | "light";
  readOnly?: boolean;
  height?: string;
  scrollBeyondLastLine?: boolean;
  defaultValue?: string;
  wordWrap?: "off" | "on" | "wordWrapColumn" | "bounded";
}

loader.config({
  paths: {
    vs: `${window.location.origin}${BASE_URL}unpkg/vs`,
  },
  "vs/nls": {
    availableLanguages: {
      "*": "zh-cn",
    },
  },
});

export interface MonacoEditorHandles {
  formatDocument: Function;
}

export const MonacoEditor = forwardRef<MonacoEditorHandles, MonacoEditorProps>(
  (
    {
      value,
      onChange,
      language = "javascript",
      theme = "light",
      readOnly = false,
      height = "300px",
      scrollBeyondLastLine = false,
      defaultValue,
      wordWrap = "off",
    },
    reff
  ) => {
    const editorRef = useRef(null);

    // 初始化后自动格式化
    const handleEditorMount = (editor) => {
      editorRef.current = editor;
      setTimeout(() => {
        editor.getAction("editor.action.formatDocument").run();
      }, 200);
    };

    useImperativeHandle(reff, () => {
      return {
        formatDocument: () => {
          setTimeout(() => {
            editorRef.current?.getAction("editor.action.formatDocument").run();
          }, 500);
        },
      };
    }, [editorRef.current]);

    return (
      <Editor
        className="monaco-editor"
        onMount={handleEditorMount}
        theme={theme}
        options={{
          formatOnType: true,
          formatOnPaste: true,
          automaticLayout: true,
          wordWrap,
          readOnly,
          scrollbar: {
            alwaysConsumeMouseWheel: false,
          },
          minimap: {
            enabled: false,
          },

          scrollBeyondLastLine,
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
);

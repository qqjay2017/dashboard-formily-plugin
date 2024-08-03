import type { EditorProps, Monaco } from "@monaco-editor/react";
import Editor, { loader } from "@monaco-editor/react";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { uid } from "@formily/shared";
import type { IDisposable } from "monaco-editor";
import type { FormItemComponentProps } from "../../../types";
import { format } from "./format";
import { initMonaco } from "./config";
import { BASE_URL } from "@/utils/env";

import "./styles.less";
import { usePrefix, useTheme } from "@/designable/react";
import { cn } from "@/utils";

interface MonacoEditorProps
  extends FormItemComponentProps,
    Omit<EditorProps, "onChange" | "value"> {
  language?: string;
  theme?: "vs-dark" | "light";
  readOnly?: boolean;
  height?: string;
  scrollBeyondLastLine?: boolean;
  defaultValue?: string;
  wordWrap?: "off" | "on" | "wordWrapColumn" | "bounded";
  extraLib?: string;
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

const MonacoEditor = forwardRef<MonacoEditorHandles, MonacoEditorProps>(
  (props, reff) => {
    const {
      value,
      onChange,
      language = "javascript",
      theme: _theme,
      readOnly = false,
      height = "100%",
      width = "100%",
      scrollBeyondLastLine = false,
      defaultValue,
      wordWrap = "off",
      onMount,
      defaultLanguage,
      className,
    } = props;
    const theme = useTheme();
    const [loaded, setLoaded] = useState(false);
    const unmountedRef = useRef(false);
    const editorRef = useRef(null);
    const uidRef = useRef(uid());
    const monacoRef = useRef<Monaco>();
    const extraLibRef = useRef<IDisposable>(null);
    const computedLanguage = useRef<string>(language || defaultLanguage);
    const prefix = usePrefix("monaco-input");
    const formatDocument = () => {
      const editor = editorRef.current;
      if (!editor) {
        return false;
      }
      const currentValue = editor.getValue();
      if (currentValue) {
        format(computedLanguage.current, currentValue)
          .then((content) => {
            editor.setValue(content);
            setLoaded(true);
          })
          .catch(() => {
            setLoaded(true);
          });
      } else {
        setLoaded(true);
      }
    };
    // 初始化后自动格式化
    const onMountHandler = (editor: any, monaco: Monaco) => {
      editorRef.current = editor;
      monacoRef.current = monaco;
      const model = editor.getModel();
      // @ts-ignore
      model.getDesignerLanguage = () => computedLanguage.current;
      onMount?.(editor, monaco);

      formatDocument();
    };

    useImperativeHandle(reff, () => {
      return {
        formatDocument,
      };
    }, [editorRef.current, monacoRef.current]);

    useEffect(() => {
      unmountedRef.current = false;
      initMonaco();
      return () => {
        if (extraLibRef.current) {
          extraLibRef.current.dispose();
        }
        unmountedRef.current = true;
      };
    }, []);
    const updateExtraLib = () => {
      if (extraLibRef.current) {
        extraLibRef.current.dispose();
      }
      extraLibRef.current =
        monacoRef.current.languages.typescript.typescriptDefaults.addExtraLib(
          props.extraLib,
          `${uidRef.current}.d.ts`
        );
    };
    useEffect(() => {
      if (monacoRef.current && props.extraLib) {
        updateExtraLib();
      }
    }, [props.extraLib]);

    return (
      <div
        className={cn(prefix, className, {
          loaded,
        })}
        style={{ width, height }}
      >
        <div className={`${prefix}-view`}>
          <Editor
            className="monaco-editor"
            onMount={onMountHandler}
            theme={
              theme === "dark" || _theme?.includes("dark")
                ? "monokai"
                : "chrome-devtools"
            }
            language={language}
            height={height}
            defaultValue={defaultValue}
            value={value}
            onChange={(e) => {
              onChange && onChange(e);
            }}
            width={width}
            options={{
              glyphMargin: true,
              ...props.options,
              tabSize: 2,
              smoothScrolling: true,

              automaticLayout: true,
              wordWrap,
              readOnly,
              scrollbar: {
                verticalScrollbarSize: 10,
                horizontalScrollbarSize: 10,
                alwaysConsumeMouseWheel: false,
              },
              minimap: {
                enabled: false,
              },

              scrollBeyondLastLine,
            }}
          />
        </div>
      </div>
    );
  }
);

export default MonacoEditor;

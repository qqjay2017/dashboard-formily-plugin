import { css } from "@emotion/css";
import MonacoEditor from "@/schema-component/components/MonacoEditor";
import type { FormItemComponentProps } from "@/types";

export function JsonInput({
  value,
  onChange,
  ...props
}: FormItemComponentProps) {
  return (
    <div
      className={css`
        border: 1px solid rgb(217, 217, 217);
      `}
    >
      <MonacoEditor
        {...props}
        theme="vs-dark"
        language="json"
        value={value || ""}
        onChange={(e) => {
          onChange && onChange(e);
        }}
      />
    </div>
  );
}

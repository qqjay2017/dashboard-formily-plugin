import MonacoEditor from "@/schema-component/components/MonacoEditor";
import type { FormItemComponentProps } from "@/types";

export function JsonInput({
  value,
  onChange,
  ...props
}: FormItemComponentProps) {
  return (
    <MonacoEditor
      {...props}
      theme="vs-dark"
      language="json"
      value={value || ""}
      onChange={(e) => {
        onChange && onChange(e);
      }}
    />
  );
}

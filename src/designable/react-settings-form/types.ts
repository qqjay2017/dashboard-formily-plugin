import type React from "react";
import type { Form } from "@formily/core";

export interface ISettingFormProps {
  className?: string;
  style?: React.CSSProperties;
  uploadAction?: string;
  components?: Record<string, React.FC<any>>;
  effects?: (form: Form) => void;
  scope?: any;
}

import type { IFormLayoutProps } from "@formily/antd-v5";
import { FormLayout } from "@formily/antd-v5";
import type { ISchema } from "@formily/react";
import type { PropsWithChildren } from "react";
import { SchemaField } from "@/designable/react-settings-form/SchemaField";

interface IInternalFormLayoutProps extends IFormLayoutProps, PropsWithChildren {
  schema?: ISchema;
}

export default function InternalFormLayout({
  schema,
  children,
  ...props
}: IInternalFormLayoutProps) {
  return (
    <FormLayout
      colon={false}
      labelWidth={120}
      labelAlign="left"
      wrapperAlign="right"
      tooltipLayout="text"
      {...props}
    >
      {schema ? <SchemaField schema={schema} /> : children}
    </FormLayout>
  );
}

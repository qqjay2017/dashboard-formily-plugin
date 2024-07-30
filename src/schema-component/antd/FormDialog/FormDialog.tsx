import type { IModalProps } from "@formily/antd-v5";
import { FormDialog as AntdFormDialog, FormLayout } from "@formily/antd-v5";

import type { ISchema } from "@formily/react";
import { SchemaOptionsContext } from "@formily/react";

import { useContext } from "react";
import { SchemaField2 } from "@/schema-component/core";

export function useFormDialog() {
  const options = useContext(SchemaOptionsContext);
  const getFormDialog = (modalProps: IModalProps, schema: ISchema) =>
    AntdFormDialog(
      {
        width: "70%",
        centered: true,
        bodyProps: {
          style: {
            padding: 10,
            minHeight: "400px",
          },
        },
        transitionName: "",
        maskTransitionName: "",
        destroyOnClose: true,
        ...modalProps,
      },
      () => {
        return (
          <FormLayout
            colon={false}
            labelWidth={120}
            labelAlign="left"
            wrapperAlign="right"
            tooltipLayout="text"
          >
            <SchemaField2
              components={options?.components}
              scope={options?.scope}
              schema={schema}
            />
          </FormLayout>
        );
      }
    );
  return {
    getFormDialog,
  };
}

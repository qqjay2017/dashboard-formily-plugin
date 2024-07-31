import type { IModalProps } from "@formily/antd-v5";
import { FormDialog as AntdFormDialog, FormLayout } from "@formily/antd-v5";

import type { ISchema } from "@formily/react";

import { css } from "@emotion/css";

import { cx } from "@/utils";
import { SchemaField } from "@/designable/react-settings-form/SchemaField";

/**
 * 弹窗表单规范
 * @param modalProps
 * @param schema
 * @returns
 */

export function getFormDialog(modalProps: IModalProps, schema: ISchema) {
  return AntdFormDialog(
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
        <div
          className={cx(css`
            font-size: 13px;
            line-height: 1.5714285714285714;
          `)}
        >
          <FormLayout
            colon={false}
            labelWidth={120}
            labelAlign="left"
            wrapperAlign="right"
            tooltipLayout="text"
          >
            <SchemaField schema={schema} />
          </FormLayout>
        </div>
      );
    }
  );
}

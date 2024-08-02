import type { ISchema } from "@formily/react";
import { observer } from "@formily/react";

import type { ReactNode } from "react";
import { useMemo } from "react";
import type { IFormProps } from "@formily/core";
import { createForm } from "@formily/core";
import type { FormProps } from "@formily/antd-v5";
import { Form } from "@formily/antd-v5";
import { Empty } from "antd";
import { css, cx } from "@emotion/css";
import { cancelIdle, requestIdle } from "../shared";
import { usePrefix } from "../react/hooks";
import { emptyWrapStyle } from "../styles";
import type { ISettingFormProps } from "./types";
import { SettingsFormContext } from "./shared/context";
import SchemaField from "./SchemaField";
import "./styles.less";

const GlobalState = {
  idleRequest: null,
};

export interface ISettingsFormProviderProps extends ISettingFormProps {
  schema?: ISchema;
  createFormOptions?: IFormProps<any>;
  formProps?: FormProps;
  contentTop?: ReactNode | undefined;
}

/**
 * form外壳(formily 设计器专用,样式覆盖)
 */

const SettingsFormProvider = observer(
  (props: ISettingsFormProviderProps) => {
    const prefix = usePrefix("settings-form");
    const isEmpty = !props.schema;
    const form: any = useMemo(() => {
      if (props?.form) {
        return props?.form;
      }
      return createForm({
        ...(props?.createFormOptions || {}),
      });
    }, [props?.schema, props?.form]);

    const render = () => {
      if (!isEmpty) {
        return (
          <div
            className={cx(
              prefix,
              props.className,
              css`
                font-size: 13px;
                line-height: 1.5714285714285714;
              `
            )}
            style={props.style}
          >
            <SettingsFormContext.Provider value={props}>
              <Form
                form={form}
                colon={false}
                labelWidth={120}
                labelAlign="left"
                wrapperAlign="right"
                feedbackLayout="none"
                tooltipLayout="text"
                {...props.formProps}
              >
                <SchemaField
                  schema={props.schema}
                  components={props.components}
                  scope={{ ...props.scope }}
                />
              </Form>
            </SettingsFormContext.Provider>
          </div>
        );
      }
      return (
        <div className={emptyWrapStyle}>
          <Empty />
        </div>
      );
    };
    return (
      <div className={`${prefix}-wrapper`}>
        {props.contentTop}
        <div className={`${prefix}-content`}>{render()}</div>
        {props?.children}
      </div>
    );
  },
  {
    scheduler: (update) => {
      cancelIdle(GlobalState.idleRequest);
      GlobalState.idleRequest = requestIdle(update, {
        timeout: 500,
      });
    },
  }
);

export default SettingsFormProvider;

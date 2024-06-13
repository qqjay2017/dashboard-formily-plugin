import {
  Form,
  FormButtonGroup,
  FormLayout,
  Reset,
  Submit,
} from "@formily/antd-v5";
import { SchemaOptionsContext, useForm } from "@formily/react";
import { memo, useContext, useMemo } from "react";
import { SchemaComponent } from "../../core";
import { ConfigProvider } from "antd";

import { css } from "@emotion/css";

const address = "dashboardRoot";

import { ISchema } from "@formily/react";
import { createForm, onFormValuesChange } from "@formily/core";
import { useSaveAllFieldSchema } from "../../hooks/useSaveAllFieldSchema";

const dashboardRootFormSchema: ISchema = {
  type: "object",
  properties: {
    designWidth: {
      type: "number",
      title: "设计稿尺寸-宽度",
      required: true,
      "x-decorator": "FormItem",
      "x-component": "NumberPicker",
      "x-component-props": {
        addonAfter: "px",
      },
    },
    designHeight: {
      type: "number",
      title: "设计稿尺寸-高度",
      required: true,
      "x-decorator": "FormItem",
      "x-component": "NumberPicker",
      "x-component-props": {
        addonAfter: "px",
      },
    },
    themeProvider: {
      type: "string",
      title: "主题颜色",
      required: true,
      "x-decorator": "FormItem",
      "x-component": "ColorTypeSelect",
    },
    isDarkTheme: {
      type: "boolearn",
      title: "主题风格",
      required: true,
      "x-decorator": "FormItem",
      "x-component": "IsDarkThemeSelect",
    },
  },
};

export const RootComponentSetting = memo(() => {
  const options = useContext(SchemaOptionsContext);
  const { locale } = useContext(ConfigProvider.ConfigContext);
  const outForm = useForm();
  const dashboardRootConfig = outForm.query(address).take();

  const { saveLocalFieldState, saveRemoteFieldSchema } =
    useSaveAllFieldSchema();

  const form = useMemo(() => {
    return createForm({
      initialValues: {
        ...dashboardRootConfig.componentProps,
      },
    });
  }, []);

  return (
    <div
      className={css`
        width: 100%;
        height: 100%;
        background-color: rgb(35, 35, 36);
      `}
    >
      <ConfigProvider locale={locale}>
        <Form
          form={form}
          layout="vertical"
          className={css`
            max-width: 100%;
            width: 100%;
            height: 100%;
            padding: 16px;
            position: relative;
          `}
        >
          <FormLayout
            layout={"vertical"}
            labelCol={4}
            wrapperCol={20}
            className={css`
              width: 100%;
              height: calc(100% - 40px);
              padding: 16px;
            `}
          >
            <SchemaComponent
              components={options.components}
              scope={options.scope}
              schema={dashboardRootFormSchema}
            />
          </FormLayout>
          <div
            className={css`
              padding-right: 16px;
              height: 40px;
              width: 100%;
              position: absolute;
              left: 0;
              bottom: 0;
            `}
          >
            <FormButtonGroup gutter={24} align="right">
              <Reset>重置</Reset>
              <Submit
                onSubmit={async (values) => {
                  saveLocalFieldState({
                    address,
                    schema: {
                      "x-component-props": {
                        ...values,
                      },
                    },
                  });
                  saveRemoteFieldSchema();
                }}
              >
                应用
              </Submit>
            </FormButtonGroup>
          </div>
        </Form>
      </ConfigProvider>
    </div>
  );
});

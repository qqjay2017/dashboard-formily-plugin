import { Form, FormLayout } from "@formily/antd-v5";
import { SchemaOptionsContext, useFieldSchema, useForm } from "@formily/react";
import { memo, useContext, useEffect, useMemo } from "react";
import { SchemaComponent } from "../../core";
import { ConfigProvider } from "antd";
import { observable, autorun } from "@formily/reactive";

import { css } from "@emotion/css";

const address = "dashboardRoot";

import { ISchema } from "@formily/react";
import { createForm, onFormValuesChange } from "@formily/core";
import { useSaveAllFieldSchema } from "../../hooks/useSaveAllFieldSchema";

export const dashboardRootFormSchema: ISchema = {
  type: "object",
  properties: {
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

  const fi = useFieldSchema();
  const { saveLocalFieldState, saveRemoteFieldSchema } =
    useSaveAllFieldSchema();

  const form = useMemo(() => {
    return createForm({
      initialValues: {
        ...dashboardRootConfig.componentProps,
      },

      effects() {
        onFormValuesChange((form) => {
          const { themeProvider, isDarkTheme } = form.values;
          saveLocalFieldState({
            address,
            schema: {
              "x-component-props": {
                themeProvider,
                isDarkTheme,
              },
            },
          });

          saveRemoteFieldSchema();
        });
      },
    });
  }, []);

  return (
    <div
      className={css`
        padding: 24px 16px;
        width: 100%;
      `}
    >
      <ConfigProvider locale={locale}>
        <Form
          form={form}
          layout="vertical"
          style={{
            maxWidth: "100%",
          }}
        >
          <FormLayout layout={"vertical"} labelCol={4} wrapperCol={20}>
            <SchemaComponent
              components={options.components}
              scope={options.scope}
              schema={dashboardRootFormSchema}
            />
          </FormLayout>
        </Form>
      </ConfigProvider>
    </div>
  );
});

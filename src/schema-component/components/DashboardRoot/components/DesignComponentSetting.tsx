import { css } from "@emotion/css";
import { SchemaOptionsContext, useForm } from "@formily/react";
import { ConfigProvider } from "antd";
import { useContext, useEffect, useMemo, useState } from "react";
import { useSaveAllFieldSchema } from "../../../hooks";
import { createForm } from "@formily/core";
import { Form, FormButtonGroup, Reset, Submit } from "@formily/antd-v5";
import { SchemaComponent } from "../../../core";
import { allComponentTypeSettingSchema } from "../allComponentTypeSettingSchema";
import { dispatchInsert } from "../utils";
import { uid } from "@formily/shared";
import { useApp } from "@/application";

export const DesignComponentSetting = ({ address }: { address: string }) => {
  const app = useApp();
  const [formId, setFormId] = useState(uid());
  const globalForm = useForm();
  const compoennt = globalForm.query(address).take();
  const componentType = compoennt?.componentType;

  const typeSettingSchema = {
    ...Object.keys(app.components).reduce((memo, curKey) => {
      const cur = app.components[curKey];
      if (cur && cur.settingSchema) {
        memo[curKey] = cur.settingSchema;
      }
      return memo;
    }, {}),
    ...allComponentTypeSettingSchema,
  };
  const dashboardRootFormSchema =
    typeSettingSchema[componentType] || typeSettingSchema[address] || {};

  const options = useContext(SchemaOptionsContext);
  const { locale } = useContext(ConfigProvider.ConfigContext);

  const dashboardRootConfig = globalForm.query(address).take();
  console.log(dashboardRootConfig, "dashboardRootConfig");
  const { saveLocalFieldState, saveRemoteFieldSchema } =
    useSaveAllFieldSchema();

  const form = useMemo(() => {
    return createForm({
      initialValues: {
        formId,
        ...dashboardRootConfig?.componentProps,

        decoratorProps: dashboardRootConfig?.decoratorProps,
        decoratorPadding: dashboardRootConfig?.decoratorProps?.padding || [],
        componentType,
        componentAddress: address,
      },
    });
  }, [address, formId, dashboardRootConfig, componentType]);

  useEffect(() => {
    const onSchemaChange = () => {
      setFormId(uid());
    };
    document.addEventListener("dispatchFieldSchemaChange", onSchemaChange);
    return () => {
      document.removeEventListener("dispatchFieldSchemaChange", onSchemaChange);
    };
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
          labelCol={4}
          wrapperCol={20}
          className={css`
            max-width: 100%;
            width: 100%;
            height: 100%;
            position: relative;
            overflow: hidden;
            form {
              width: 100%;
              height: 100%;
              overflow: hidden;
            }
          `}
        >
          <div
            className={css`
              padding: 12px 16px;
              height: calc(100% - 40px);
              overflow-x: hidden;
              overflow-y: auto;
            `}
          >
            <SchemaComponent
              components={options.components}
              scope={options.scope}
              schema={dashboardRootFormSchema}
            />
          </div>

          <div
            className={css`
              padding-right: 16px;
              height: 40px;
              width: 100%;
              position: absolute;
              left: 0;
              bottom: 0;
              /* display: flex; */
              /* align-items: center; */
              /* justify-content: flex-end; */
            `}
          >
            <FormButtonGroup gutter={24} align="right">
              <Reset>重置</Reset>
              <Submit
                onSubmit={async ({
                  decoratorProps,
                  decoratorPadding,
                  ...values
                }) => {
                  saveLocalFieldState({
                    address,
                    schema: {
                      "x-component-props": {
                        ...values,
                      },
                      "x-decorator-props": {
                        ...decoratorProps,
                        padding:
                          decoratorPadding ||
                          decoratorProps?.padding ||
                          undefined,
                      },
                    },
                  });
                  await saveRemoteFieldSchema();
                  dispatchInsert();
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
};

import { css } from "@emotion/css";
import { SchemaOptionsContext, useForm } from "@formily/react";
import { ConfigProvider } from "antd";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSaveAllFieldSchema } from "../../hooks";
import { createForm } from "@formily/core";
import {
  Form,
  FormButtonGroup,
  FormLayout,
  Reset,
  Submit,
} from "@formily/antd-v5";
import { SchemaComponent } from "../../core";
import { allComponentTypeSettingSchema } from "./allComponentTypeSettingSchema";
import { dispatchInsert } from "./utils";
import { uid } from "@formily/shared";

export const DesignComponentSetting = ({ address }: { address: string }) => {
  const [formId, setFormId] = useState(uid());
  const globalForm = useForm();
  const { componentType } = globalForm.query(address).take();

  const dashboardRootFormSchema =
    allComponentTypeSettingSchema[componentType] ||
    allComponentTypeSettingSchema[address] ||
    {};

  const options = useContext(SchemaOptionsContext);
  const { locale } = useContext(ConfigProvider.ConfigContext);

  const dashboardRootConfig = globalForm.query(address).take();

  const { saveLocalFieldState, saveRemoteFieldSchema } =
    useSaveAllFieldSchema();

  const form = useMemo(() => {
    return createForm({
      initialValues: {
        ...dashboardRootConfig.componentProps,
        decoratorProps: dashboardRootConfig.decoratorProps,
      },
    });
  }, [address, formId]);

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
              /* display: flex; */
              /* align-items: center; */
              /* justify-content: flex-end; */
            `}
          >
            <FormButtonGroup gutter={24} align="right">
              <Reset>重置</Reset>
              <Submit
                onSubmit={async ({ decoratorProps, ...values }) => {
                  saveLocalFieldState({
                    address,
                    schema: {
                      "x-component-props": {
                        ...values,
                      },
                      "x-decorator-props": {
                        ...decoratorProps,
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

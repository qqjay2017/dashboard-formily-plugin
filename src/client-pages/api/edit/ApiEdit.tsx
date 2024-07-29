import { useContext, useMemo } from "react";
import { SchemaOptionsContext } from "@formily/react";
import { ConfigProvider } from "antd";
import { Form, FormButtonGroup, FormDialog, Submit } from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { css } from "@emotion/css";
import { get } from "lodash-es";
import { useNavigate } from "react-router-dom";
import { editApiFormSchema } from "../main/editApiFormSchema";
import { ApiTest } from "../main/ApiTest";
import { FormButtonGroupWrap, FormDialogPortal } from "@/schema-component";
import { useEditId } from "@/hooks";
import { useAPIClient, useRequest } from "@/api-client";
import {
  SchemaComponent,
  SchemaComponentOptions,
} from "@/schema-component/core";
import { apiBase } from "@/utils";
import { useApp } from "@/application";

function ApiEdit() {
  const app = useApp();
  const id = useEditId();
  const apiClient = useAPIClient();
  const options = useContext(SchemaOptionsContext);
  const { locale } = useContext(ConfigProvider.ConfigContext);
  const navigate = useNavigate();
  const Providers = useMemo(() => app.getComposeProviders(), [app]);
  const { data } = useRequest(`${apiBase}/api-manage/${id}`, {
    enabled: !!id,
    method: "GET",
  });
  const dtData = get(data, "data.data", {});

  const form: any = useMemo(() => {
    if (!id) {
      return createForm({
        initialValues: {},
      });
    }
    return createForm({
      initialValues: {
        ...dtData,
        headers: JSON.parse(dtData?.headers || "[]"),
        mockJson: dtData?.mockJson || "{}",
      },
    });
  }, [dtData, id]);

  const onSubmit = async (values) => {
    const res = await apiClient.request({
      method: id ? "put" : "post",
      url: id
        ? `${apiBase}/api-manage/edit/${id}`
        : `${apiBase}/api-manage/create`,
      data: {
        ...values,
        headers: JSON.stringify(values.headers || []),
        url: (values.url || "").trim(),

        mockJson: values.mockJson || "{}",
      },
    });
    const resId = get(res, "data.data.id", "");
    if (resId) {
      navigate("/dapi/external-data");
    }
  };

  const onTest = async (values) => {
    const dialog = FormDialog(
      {
        title: "测试API",
        width: "80vw",
      },
      () => {
        return (
          <Providers>
            <ApiTest formValues={values} />
          </Providers>
        );
      }
    );
    dialog.open();
  };

  return (
    <div
      className={css`
        padding: 24px;
        width: 100%;
        height: 100%;
        overflow: hidden scroll;
      `}
    >
      <SchemaComponentOptions
        inherit
        scope={options.scope}
        components={options.components}
      >
        <ConfigProvider locale={locale}>
          <Form form={form as any} labelCol={6} wrapperCol={12}>
            <SchemaComponent
              components={options.components}
              scope={options.scope}
              schema={editApiFormSchema}
            />

            <FormButtonGroupWrap>
              <FormButtonGroup gutter={24} align="right">
                <FormDialogPortal>
                  <Submit onSubmit={onTest} type="default">
                    测试
                  </Submit>
                </FormDialogPortal>
                <Submit onSubmit={onSubmit}>提交</Submit>
              </FormButtonGroup>
            </FormButtonGroupWrap>
          </Form>
        </ConfigProvider>
      </SchemaComponentOptions>
    </div>
  );
}
export default ApiEdit;

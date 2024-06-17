import { useContext, useMemo } from "react";
import {
  SchemaComponent,
  SchemaComponentOptions,
} from "../../schema-component/core";
import { SchemaOptionsContext } from "@formily/react";
import { ConfigProvider } from "antd";
import { Form, FormButtonGroup, FormDialog, Submit } from "@formily/antd-v5";
import { editApiFormSchema } from "./editApiFormSchema";
import { createForm } from "@formily/core";
import { css } from "@emotion/css";
import { useAPIClient, useQuery } from "../../api-client";
import { get } from "lodash-es";
import { useNavigate } from "react-router-dom";
import { useEditId } from "../../hooks";
import { FormButtonGroupWrap } from "../../schema-component";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ApiTest } from "./ApiTest";

export const ApiEdit = () => {
  const id = useEditId();
  const apiClient = useAPIClient();
  const options = useContext(SchemaOptionsContext);
  const { locale } = useContext(ConfigProvider.ConfigContext);
  const navigate = useNavigate();

  const { data } = useQuery({
    enabled: !!id,
    queryFn: () =>
      apiClient.request({
        url: "/huang-api/api-manage/" + id,
        method: "get",
      }),
    queryKey: [id, "apiDt"],
  });
  const dtData = get(data, "data.data", {});

  const form = useMemo(() => {
    if (!id) {
      return createForm({
        initialValues: {},
      });
    }
    return createForm({
      initialValues: {
        ...dtData,
        mockJson: JSON.parse(dtData?.mockJson || "{}"),
      },
    });
  }, [dtData, id]);

  const onSubmit = async (values) => {
    console.log(values, "values");
    const res = await apiClient.request({
      method: id ? "put" : "post",
      url: id
        ? `/huang-api/api-manage/edit/${id}`
        : `/huang-api/api-manage/create`,
      data: {
        originId: null,
        baseNameId: null,
        groupId: null,

        ...values,
        url: (values.url || "").trim(),
        baseName: undefined,
        group: undefined,
        origin: undefined,
        mockJson: JSON.stringify(values.mockJson || {}),
      },
    });
    const resId = get(res, "data.data.id", "");
    if (resId) {
      navigate("/dashboard/api");
    }
  };

  const onTest = async (values) => {
    console.log(values, "values");
    const dialog = FormDialog(
      {
        title: "测试API",
        width: "80vw",
      },
      () => {
        return (
          <QueryClientProvider client={new QueryClient()}>
            <ApiTest formValues={values} />
          </QueryClientProvider>
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
          <Form form={form} labelCol={6} wrapperCol={12}>
            <SchemaComponent
              components={options.components}
              scope={options.scope}
              schema={editApiFormSchema}
            />

            <FormButtonGroupWrap>
              <FormButtonGroup gutter={24} align="right">
                <Submit onSubmit={onTest} type="default">
                  测试
                </Submit>
                <Submit onSubmit={onSubmit}>提交</Submit>
              </FormButtonGroup>
            </FormButtonGroupWrap>
          </Form>
        </ConfigProvider>
      </SchemaComponentOptions>
    </div>
  );
};

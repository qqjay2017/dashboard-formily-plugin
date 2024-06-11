import { useContext, useMemo } from "react";
import {
  SchemaComponent,
  SchemaComponentOptions,
} from "../../schema-component/core";
import { SchemaOptionsContext } from "@formily/react";
import { ConfigProvider } from "antd";
import { Form, FormButtonGroup, Submit } from "@formily/antd-v5";
import { editApiFormSchema } from "./editApiFormSchema";
import { createForm } from "@formily/core";
import { css } from "@emotion/css";
import { useAPIClient, useQuery } from "../../api-client";
import { get } from "lodash-es";
import { useNavigate } from "react-router-dom";
import { useEditId } from "../../hooks";

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
  console.log(dtData, "dtData");
  const form = useMemo(() => {
    if (!id) {
      return createForm({
        initialValues: {},
      });
    }
    return createForm({
      initialValues: {
        ...dtData,
      },
    });
  }, [dtData, id]);

  return (
    <div
      className={css`
        padding: 24px;
        width: 100%;
        height: 100%;
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

            <FormButtonGroup.Sticky>
              <FormButtonGroup.FormItem>
                <Submit
                  onSubmit={async (values) => {
                    console.log(values, "values");
                    const res = await apiClient.request({
                      method: id ? "put" : "post",
                      url: id
                        ? `/huang-api/api-manage/edit/${id}`
                        : `/huang-api/api-manage/create`,
                      data: {
                        ...values,
                        url: (values.url || "").trim(),
                        baseName: undefined,
                        group: undefined,
                        origin: undefined,
                      },
                    });
                    console.log(res, "res");
                    const resId = get(res, "data.data.id", "");
                    if (resId) {
                      navigate("/dashboard/api");
                    }
                  }}
                >
                  提交
                </Submit>
              </FormButtonGroup.FormItem>
            </FormButtonGroup.Sticky>
          </Form>
        </ConfigProvider>
      </SchemaComponentOptions>
    </div>
  );
};

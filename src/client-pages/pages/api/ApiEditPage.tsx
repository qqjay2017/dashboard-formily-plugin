import { useMemo } from "react";
import { FormProvider } from "@formily/react";

import { FormDialog } from "@formily/antd-v5";
import { createForm } from "@formily/core";

import { get } from "lodash-es";
import { useNavigate } from "react-router-dom";

import { editApiFormSchema } from "./editApiFormSchema";
import { ApiTest } from "./ApiTest";
import { openApiTestDialog } from "./openApiTestDialog";
import { useEditId } from "@/application/hooks";
import { useAPIClient, useRequest } from "@/api-client";

import { apiBase } from "@/utils";

import PageContainer from "@/client-pages/components/PageContainer";
import InternalFormLayout from "@/client-pages/components/InternalFormLayout";
import Submit from "@/client-pages/components/Submit";
import { getModalDialog } from "@/schema-component/antd";

/**
 * 汇聚出表单页面规范
 * @returns
 */
function ApiEditPage() {
  const id = useEditId();
  const apiClient = useAPIClient();

  const navigate = useNavigate();

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
      navigate(-1);
    }
  };

  const onTest = async (values) => {
    openApiTestDialog(id, values);
  };

  return (
    <FormProvider form={form}>
      <PageContainer
        title={id ? "编辑数据配置" : "新建数据配置"}
        footer={[
          <Submit key="test" onSubmit={onTest}>
            连接
          </Submit>,
          <Submit key="submit" type="primary" onSubmit={onSubmit}>
            提交
          </Submit>,
        ]}
      >
        <InternalFormLayout schema={editApiFormSchema} />
      </PageContainer>
    </FormProvider>
  );
}
export default ApiEditPage;

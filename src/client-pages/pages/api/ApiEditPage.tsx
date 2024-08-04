import { useMemo } from "react";
import { FormProvider } from "@formily/react";

import { createForm } from "@formily/core";

import { get } from "lodash-es";
import { useNavigate } from "react-router-dom";

import { message } from "antd";
import {
  editApiFormSchema,
  editJsApiFormSchema,
  editJsonApiFormSchema,
} from "./editApiFormSchema";

import { openApiTestDialog } from "./openApiTestDialog";
import { useEditId } from "@/application/hooks";
import { useAPIClient, useRequest } from "@/api-client";

import { apiBase } from "@/utils";

import PageContainer from "@/client-pages/components/PageContainer";
import InternalFormLayout from "@/client-pages/components/InternalFormLayout";
import Submit from "@/client-pages/components/Submit";
import { useTypeParam } from "@/client-pages/hooks";
import { defaultMessage } from "@/utils/defaultMessage";

/**
 * 汇聚出表单页面规范
 * @returns
 */
function ApiEditPage() {
  const { typeParam } = useTypeParam();
  const id = useEditId();
  const apiClient = useAPIClient();

  const navigate = useNavigate();

  const { data: dtData } = useRequest(`${apiBase}/api-manage/${id}`, {
    enabled: !!id,
    method: "GET",
  });

  const form: any = useMemo(() => {
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

  const handleSunmit = async (values) => {
    return await apiClient.request({
      method: id ? "put" : "post",
      url: id ? `${apiBase}/api-manage/${id}` : `${apiBase}/api-manage`,
      data: {
        ...values,
        id,
        type: typeParam,
        headers: values.headers
          ? JSON.stringify(JSON.parse(values.headers || "{}"))
          : "{}",
        url: (values.url || "").trim(),
        content: !values.content
          ? ""
          : typeParam === "json"
            ? JSON.stringify(JSON.parse(values.content || "{}"))
            : values.content,
      },
    });
  };
  const onSubmit = async (values) => {
    await handleSunmit(values);
    message.success(defaultMessage.submit);
    navigate(-1);
  };

  const onTest = async (values) => {
    const res = await handleSunmit(values);
    const resId = res.id;
    openApiTestDialog(resId, typeParam);
  };

  return (
    <FormProvider form={form}>
      <PageContainer
        title={id ? "编辑数据配置" : "新建数据配置"}
        footer={[
          <Submit key="test" onSubmit={onTest}>
            测试
          </Submit>,
          <Submit key="submit" type="primary" onSubmit={onSubmit}>
            提交
          </Submit>,
        ]}
      >
        <InternalFormLayout
          schema={
            typeParam === "json"
              ? editJsonApiFormSchema
              : typeParam === "js"
                ? editJsApiFormSchema
                : editApiFormSchema
          }
        />
      </PageContainer>
    </FormProvider>
  );
}
export default ApiEditPage;

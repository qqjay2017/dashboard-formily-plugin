import { useMemo } from "react";
import { FormProvider, SchemaOptionsContext } from "@formily/react";

import {
  FormButtonGroup,
  FormDialog,
  FormLayout,
  Submit,
} from "@formily/antd-v5";
import { createForm } from "@formily/core";
import { css } from "@emotion/css";
import { get } from "lodash-es";
import { useNavigate } from "react-router-dom";
import { editApiFormSchema } from "../main/editApiFormSchema";

import { useApp, useEditId } from "@/application/hooks";
import { useAPIClient, useRequest } from "@/api-client";

import { apiBase, cn } from "@/utils";
import { SchemaField } from "@/designable/react-settings-form/SchemaField";

/**
 * 汇聚出表单页面规范
 * @returns
 */
function ApiEdit() {
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
      navigate("/dapi/external-data");
    }
  };

  const onTest = async (values) => {
    try {
      const dialog = FormDialog(
        {
          title: "测试API",
          width: "80vw",
        },
        () => {
          return <div>123</div>;
        }
      );
      dialog.open();
    } catch (error) {}
  };

  return (
    <div
      className={cn(
        "form-page",
        css`
          padding: 24px;
          width: 100%;
          height: 100%;
          overflow: hidden scroll;
        `
      )}
    >
      <FormProvider form={form}>
        <FormLayout
          colon={false}
          labelWidth={120}
          labelAlign="left"
          wrapperAlign="right"
          tooltipLayout="text"
        >
          <SchemaField schema={editApiFormSchema} />
        </FormLayout>

        <FormButtonGroup.FormItem>
          <Submit onSubmit={onTest}>测试</Submit>
          <Submit onSubmit={onSubmit}>提交</Submit>
        </FormButtonGroup.FormItem>
      </FormProvider>
    </div>
  );
}
export default ApiEdit;

import { css } from "@emotion/css";

import { Button, Select, message } from "antd";

import type { ISchema } from "@formily/react";
import { get } from "lodash-es";
import type { APiWrap } from "@/api-client";
import { useAPIClient } from "@/api-client";

import { apiBase } from "@/utils";
import type { FormItemComponentProps } from "@/types";
import { useGroupList } from "@/application/hooks";
import { getFormDialog } from "@/schema-component/antd";
import { defaultMessage } from "@/utils/defaultMessage";

const createApiGroupSchema: ISchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      title: "分组名称",
      required: true,
      "x-decorator": "FormItem",
      "x-component": "Input",
    },
  },
};

interface ApiGroupFormItemProps extends FormItemComponentProps {}

export function ApiGroupFormItem({
  value,
  onChange,
  onBlur,
}: ApiGroupFormItemProps) {
  const apiClient = useAPIClient();

  const { data, refetch } = useGroupList();

  const options = (data || []).map((item) => {
    return {
      ...item,
      label: item.name,
      value: item.name,
    };
  });

  return (
    <div>
      <div
        className={css`
          margin-bottom: 16px;
        `}
      >
        <Select
          allowClear
          options={options}
          value={value}
          onBlur={onBlur}
          onChange={(e) => {
            onChange && onChange(e || null);
          }}
        />
      </div>
      <div>
        <Button
          type="primary"
          onClick={async () => {
            const dialog = getFormDialog(
              {
                title: "新建分组",
              },
              createApiGroupSchema
            );
            dialog
              .forOpen((payload, next) => {
                next({
                  initialValues: {},
                });
              })
              .forConfirm(async (payload, next) => {
                const { name } = payload.values;
                const res = await apiClient.request<
                  any,
                  APiWrap<{ id: number }>
                >({
                  url: `${apiBase}/api-group`,
                  method: "POST",
                  data: {
                    name: (name || "").trim(),
                  },
                });

                const id = get(res, "id");
                if (id) {
                  refetch();
                  message.success(defaultMessage.submit);
                  return next(payload);
                } else {
                  return Promise.reject();
                }
              })
              .open();
          }}
        >
          新建分组
        </Button>
      </div>
    </div>
  );
}

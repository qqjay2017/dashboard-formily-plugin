import { css } from "@emotion/css";
import { Button, Select, message } from "antd";
import { get } from "lodash-es";
import type { ISchema } from "@formily/react";
import type { APiWrap } from "@/api-client";
import { useAPIClient, useQuery } from "@/api-client";

import type { FormItemComponentProps } from "@/types";
import { apiBase } from "@/utils";
import { getFormDialog } from "@/schema-component/antd";
import { defaultMessage } from "@/utils/defaultMessage";

const createApiBaseNameSchema: ISchema = {
  type: "object",
  properties: {
    baseName: {
      type: "string",
      title: "api前缀",
      required: true,
      "x-decorator": "FormItem",
      "x-component": "Input",
      "x-validator": {
        type: "string",
        pattern: "^/.*[^/]$",
        message: "/开头,不以/结尾",
      },
    },
  },
};

interface ApiBaseNameFormItemProps extends FormItemComponentProps {}
export function ApiBaseNameFormItem({
  value,
  onChange,
  onBlur,
}: ApiBaseNameFormItemProps) {
  const apiClient = useAPIClient();

  const { data, refetch } = useQuery<any, APiWrap<{}[]>>({
    queryKey: ["getApiBaseName"],
    queryFn: () =>
      apiClient.request({
        url: `${apiBase}/api-base`,
        method: "get",
      }),
  });

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
                title: "新建前缀",
              },
              createApiBaseNameSchema
            );
            dialog
              .forOpen((payload, next) => {
                next({
                  initialValues: {},
                });
              })
              .forConfirm(async (payload, next) => {
                const { baseName } = payload.values;
                const res = await apiClient.request<
                  any,
                  APiWrap<{ id: number }>
                >({
                  url: `${apiBase}/api-base`,
                  method: "POST",
                  data: {
                    name: (baseName || "").trim(),
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
          新建前缀
        </Button>
      </div>
    </div>
  );
}

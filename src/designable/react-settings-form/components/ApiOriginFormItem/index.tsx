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

const createApiOriginSchema: ISchema = {
  type: "object",
  properties: {
    origin: {
      type: "string",
      title: "api域名",
      required: true,
      "x-decorator": "FormItem",
      "x-component": "Input",
      "x-validator": {
        type: "string",
        pattern: "^http(?!/).*$",
        message: "以http开头,不以/结尾",
      },
    },
  },
};

interface ApiOriginFormItemProps extends FormItemComponentProps {}
export function ApiOriginFormItem({
  value,
  onChange,
  onBlur,
}: ApiOriginFormItemProps) {
  const apiClient = useAPIClient();

  const { data, refetch } = useQuery<any, APiWrap<{}[]>>({
    queryKey: ["getApiOrigin"],
    queryFn: () =>
      apiClient.request({
        url: `${apiBase}/api-origin`,
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
          onChange={(e) => {
            onChange && onChange(e || null);
          }}
          onBlur={onBlur}
        />
      </div>
      <div>
        <Button
          type="primary"
          onClick={async () => {
            const dialog = getFormDialog(
              {
                title: "新建域名",
              },
              createApiOriginSchema
            );
            dialog
              .forOpen((payload, next) => {
                next({
                  initialValues: {},
                });
              })
              .forConfirm(async (payload, next) => {
                const { origin } = payload.values;
                const res = await apiClient.request<
                  any,
                  APiWrap<{ id: number }>
                >({
                  url: `${apiBase}/api-origin`,
                  method: "POST",
                  data: {
                    name: (origin || "").trim(),
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
          新建域名
        </Button>
      </div>
    </div>
  );
}

import React from "react";
import { FormItemComponentProps } from "../../types";
import { css } from "@emotion/css";
import { Button, Select } from "antd";
import { APiWrap, useAPIClient, useQuery } from "../../api-client";
import { get } from "lodash-es";
import { useFormDialog } from "../../schema-component";
import { ISchema } from "@formily/react";

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
export const ApiBaseNameFormItem = ({
  value,
  onChange,
  onBlur,
}: ApiBaseNameFormItemProps) => {
  const apiClient = useAPIClient();

  const { data, refetch } = useQuery<any, APiWrap<{}[]>>({
    queryKey: ["getApiBaseName"],
    queryFn: () =>
      apiClient.request({
        url: "/huang-api/api-manage/baseName/list",
        method: "get",
      }),
  });

  const options = get(data, "data.data", []).map((item) => {
    return {
      ...item,
      label: item.baseName,
      value: item.id,
    };
  });

  const { getFormDialog } = useFormDialog();

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
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
      <div>
        <Button
          type="primary"
          onClick={async () => {
            const dialog = getFormDialog("新建前缀", createApiBaseNameSchema);
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
                  url: `/huang-api/api-manage/baseName`,
                  method: "POST",
                  data: {
                    baseName: (baseName || "").trim(),
                  },
                });

                const id = get(res, "data.data.id");
                if (id) {
                  refetch();
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
};

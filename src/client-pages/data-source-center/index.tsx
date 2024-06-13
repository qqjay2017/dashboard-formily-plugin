import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import React from "react";
import { useAPIClient } from "../../api-client";
import { get } from "lodash-es";
import { Space, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { FormDialog } from "@formily/antd-v5";
import { ApiTest } from "./ApiTest";

export const DataSourceCenter = () => {
  const navigate = useNavigate();
  const apiClient = useAPIClient();
  const { data } = useQuery({
    queryKey: ["/api-manage/list", "get"],
    queryFn: () =>
      apiClient.request({
        method: "get",
        url: `/huang-api/api-manage/list`,
      }),
  });
  const dataSource = get(data, "data.data", []);

  const handleTestApi = ({ apiId }: { apiId: string }) => {
    if (!apiId) {
      return false;
    }
    const dialog = FormDialog(
      {
        title: "测试API",
        width: "80vw",
      },
      () => {
        return (
          <QueryClientProvider client={new QueryClient()}>
            <ApiTest apiId={apiId} />
          </QueryClientProvider>
        );
      }
    );
    dialog.open();
  };

  return (
    <Table
      pagination={false}
      dataSource={dataSource}
      rowKey={"id"}
      columns={[
        {
          title: "标识码",
          dataIndex: "id",
          width: 130,
          ellipsis: true,
        },
        {
          title: "名称",
          dataIndex: "name",
        },
        {
          title: "分组",
          dataIndex: "group.name",
          render: (_, row) => {
            return get(row, "group.name");
          },
        },
        {
          title: "域名",
          dataIndex: "origin.origin",
          render: (_, row) => {
            return get(row, "origin.origin");
          },
        },
        {
          title: "前缀",
          dataIndex: "baseName.baseName",
          render: (_, row) => {
            return get(row, "baseName.baseName");
          },
        },
        {
          title: "url",
          dataIndex: "url",
        },
        {
          title: "请求方式",
          dataIndex: "method",
        },
        {
          title: "操作",
          dataIndex: "options",
          render: (_, row) => {
            return (
              <Space>
                <a
                  onClick={() => {
                    handleTestApi({ apiId: row.id });
                  }}
                >
                  测试
                </a>
                <a
                  onClick={() => {
                    navigate(`/dashboard/api/edit?id=${row.id}`);
                  }}
                >
                  编辑
                </a>
              </Space>
            );
          },
        },
      ]}
    />
  );
};

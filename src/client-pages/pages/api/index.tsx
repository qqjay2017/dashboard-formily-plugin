import { get } from "lodash-es";
import { Button, Space, Tag, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";

import { useMemo } from "react";

import { CreateApiBtn } from "./CreateApiBtn";

import { openApiTestDialog } from "./openApiTestDialog";
import { shortUid } from "@/utils/shortUid";
import { apiBase, copyTextToClipboard } from "@/utils";
import { useApp, useGroupList } from "@/application/hooks";

import { useRequest } from "@/api-client";

import PageContainer from "@/client-pages/components/PageContainer";

import InternalTable from "@/client-pages/components/InternalTable";

function ApiIndex() {
  const app = useApp();
  app.getComposeProviders;
  const navigate = useNavigate();
  const { data } = useRequest(`${apiBase}/api-manage/list`, {
    method: "GET",
  });
  const { data: groupList, refetch: refetchGroupList } = useGroupList();
  const Providers = useMemo(() => app.getComposeProviders(), [app]);
  const groupFilterOptions = get(groupList, "data.data", []).map((item) => {
    return {
      ...item,
      label: item.name,
      text: item.name,
      value: item.name,
    };
  });
  const dataSource = get(data, "data.data", []) || [];

  return (
    <PageContainer
      title="数据工厂"
      extra={[<CreateApiBtn key="CreateApiBtn" />]}
    >
      <InternalTable
        dataSource={dataSource}
        columns={[
          {
            title: "标识码",
            dataIndex: "id",
            width: 160,
            render: (_, record) => {
              return (
                <Space>
                  <Tooltip title={record.id}>
                    <div>{shortUid(record.id)}</div>
                  </Tooltip>
                  <Button
                    type="link"
                    onClick={() => {
                      copyTextToClipboard(record.id);
                    }}
                  >
                    复制
                  </Button>
                </Space>
              );
            },
          },
          {
            title: "名称",
            dataIndex: "name",
            width: 200,
            render: (_, record) => {
              return (
                <Space>
                  <div>{record.name}</div>
                  {record.isMock ? <Tag color="green">MOCK</Tag> : null}
                </Space>
              );
            },
          },
          {
            title: "分组",

            dataIndex: "group",
            filters: groupFilterOptions,

            onFilter: (value, record) => {
              return record?.group === value;
            },
          },
          {
            title: "域名",
            dataIndex: "origin",
          },
          {
            title: "前缀",
            dataIndex: "baseName",
          },
          {
            title: "url",
            dataIndex: "url",
          },
          {
            title: "请求方式",
            dataIndex: "method",
            width: 100,
          },
          {
            title: "创建时间",
            dataIndex: "createdAt",
            render: (_, record) => {
              return dayjs(record.createdAt).format("YYYY-MM-DD HH:mm:ss");
            },
          },
          {
            title: "修改时间",
            dataIndex: "updateAt",
            render: (_, record) => {
              return dayjs(record.updateAt).format("YYYY-MM-DD HH:mm:ss");
            },
          },
          {
            title: "操作",
            dataIndex: "options",
            fixed: "right",
            width: 120,
            render: (_, row) => {
              return (
                <Space>
                  <a
                    onClick={() => {
                      openApiTestDialog(row.id, {});
                    }}
                  >
                    连接
                  </a>

                  <a
                    onClick={() => {
                      navigate(`/dapi-edit?id=${row.id}`);
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
    </PageContainer>
  );
}
export default ApiIndex;

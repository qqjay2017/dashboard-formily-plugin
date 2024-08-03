import { Button, Space, Tag, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";

import { CreateApiBtn } from "./CreateApiBtn";

import { openApiTestDialog } from "./openApiTestDialog";
import { typeConfig } from "./consts";
import { shortUid } from "@/utils/shortUid";
import { copyTextToClipboard, tableDefaultScroll } from "@/utils";
import { useGroupList } from "@/application/hooks";

import PageContainer from "@/client-pages/components/PageContainer";

import InternalTable from "@/client-pages/components/InternalTable";
import { useApiManageAll, useTypeParam } from "@/client-pages/hooks";

function ApiIndex() {
  const { typeParam } = useTypeParam();
  const navigate = useNavigate();
  const { data } = useApiManageAll(typeParam === "all" ? undefined : typeParam);
  const { data: groupList, refetch: refetchGroupList } = useGroupList();

  const groupFilterOptions = (groupList || []).map((item) => {
    return {
      ...item,
      label: item.name,
      text: item.name,
      value: item.name,
    };
  });
  const dataSource = data || [];

  return (
    <PageContainer
      title="数据工厂"
      extra={[<CreateApiBtn key="CreateApiBtn" />]}
    >
      <InternalTable
        scroll={{
          ...tableDefaultScroll,
          x: undefined,
        }}
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
            ellipsis: true,
            width: 140,
          },
          {
            title: "类型",
            dataIndex: "type",
            width: 100,
            render: (_, record) => {
              const typeName = typeConfig[record.type]?.title;
              return <Space>{typeName ? <Tag>{typeName}</Tag> : null}</Space>;
            },
          },
          {
            title: "分组",

            dataIndex: "groupName",
            filters: groupFilterOptions,

            onFilter: (value, record) => {
              return record?.groupName === value;
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
            title: "操作",
            dataIndex: "options",
            fixed: "right",
            width: 150,
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
                      navigate(`/dapi-edit?id=${row.id}&type=${row.type}`);
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

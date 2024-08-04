import { Button, Space, Tag, Tooltip, message } from "antd";
import { useNavigate } from "react-router-dom";

import { CreateApiBtn } from "./CreateApiBtn";

import { openApiTestDialog } from "./openApiTestDialog";
import { typeConfig } from "./consts";
import { useRemoveAppManage } from "./useRemoveAppManage";
import { apiInfoColumns, typeColumns } from "./apiTableColumns";
import { shortUid } from "@/utils/shortUid";
import { copyTextToClipboard, tableDefaultScroll } from "@/utils";
import { useGroupList } from "@/application/hooks";

import PageContainer from "@/client-pages/components/PageContainer";

import InternalTable from "@/client-pages/components/InternalTable";
import { useApiManageAll, useTypeParam } from "@/client-pages/hooks";
import { showConfirmPromisify } from "@/schema-component/antd";
import { defaultMessage } from "@/utils/defaultMessage";

function ApiIndex() {
  const { typeParam } = useTypeParam();
  const navigate = useNavigate();
  const { data, refetch } = useApiManageAll(
    !typeParam || typeParam === "all" ? undefined : typeParam
  );
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
  const removeAppManage = useRemoveAppManage();
  return (
    <PageContainer
      title="数据工厂"
      extra={[<CreateApiBtn key="CreateApiBtn" />]}
    >
      <InternalTable
        scroll={{
          ...tableDefaultScroll,
          x: 1920,
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
          ...typeColumns,
          {
            title: "分组",

            dataIndex: "groupName",
            filters: groupFilterOptions,

            onFilter: (value, record) => {
              return record?.groupName === value;
            },
          },
          ...apiInfoColumns,

          {
            title: "操作",
            dataIndex: "options",
            fixed: "right",
            width: 165,
            render: (_, record) => {
              return (
                <Space>
                  <a
                    onClick={() => {
                      openApiTestDialog(record.id, record.type);
                    }}
                  >
                    连接
                  </a>

                  <a
                    onClick={() => {
                      navigate(
                        `/dapi-edit?id=${record.id}&type=${record.type}`
                      );
                    }}
                  >
                    编辑
                  </a>
                  <a
                    onClick={async () => {
                      try {
                        await showConfirmPromisify({});
                        await removeAppManage(record);
                        await refetch();
                        message.success(defaultMessage.delete);
                      } catch (error) {}
                    }}
                  >
                    删除
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

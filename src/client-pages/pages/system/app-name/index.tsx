import { Button, Space, message } from "antd";
import { get } from "lodash-es";
import dayjs from "dayjs";
import { useAppGroupAll } from "./useAppGroupAll";
import { createAppGroupSchema } from "./createAppGroupSchema";
import { useUpdateAppGroupApi } from "./useUpdateAppGroupApi";
import { useRemoveAppGroupApi } from "./useRemoveAppGroupApi";
import PageContainer from "@/client-pages/components/PageContainer";

import InternalTable from "@/client-pages/components/InternalTable";
import { tableDefaultScroll } from "@/utils";
import { getFormDialog, showConfirmPromisify } from "@/schema-component/antd";
import { iconColumnRender } from "@/client-pages/components/InternalTable/render/iconColumnRender";
import { defaultMessage } from "@/utils/defaultMessage";

export default function SystemAppName() {
  const updateAppGroupApi = useUpdateAppGroupApi();
  const removeAppGroupApi = useRemoveAppGroupApi();
  const { data, isLoading, refetch } = useAppGroupAll();
  const editAppGroup = (initValue, { isCreate }: { isCreate?: boolean }) => {
    const dialog = getFormDialog(
      {
        title: isCreate ? "新建" : "编辑",
      },
      createAppGroupSchema
    );

    dialog
      .forOpen((payload, next) => {
        next({
          initialValues: isCreate
            ? {
                sortNum:
                  !data || !data.length
                    ? 1
                    : get(data, `[${data.length - 1}].sortNum`, 1) + 1,
              }
            : initValue,
        });
      })
      .forConfirm(async (payload, next) => {
        const values = payload.values;
        await updateAppGroupApi({
          ...values,
        });
        await refetch();
        message.success(defaultMessage.submit);
        next(payload);
      })
      .open({});
  };
  return (
    <PageContainer
      loading={isLoading}
      title="应用分类管理"
      extra={[
        <Button
          type="primary"
          onClick={() =>
            editAppGroup(
              {},
              {
                isCreate: true,
              }
            )
          }
          key="createChartBtn"
        >
          新建
        </Button>,
      ]}
    >
      <InternalTable
        scroll={{
          ...tableDefaultScroll,
          x: undefined,
        }}
        dataSource={data}
        columns={[
          {
            title: "名称",
            dataIndex: "name",
          },
          {
            title: "描述",
            dataIndex: "description",
          },
          {
            title: "图标",
            dataIndex: "icon",
            render: iconColumnRender,
          },
          {
            title: "排序码",
            dataIndex: "sortNum",
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
            fixed: "right",
            width: 150,
            dataIndex: "options",
            render: (_, record) => {
              return (
                <Space>
                  <a
                    onClick={() => {
                      editAppGroup(
                        { ...record },
                        {
                          isCreate: false,
                        }
                      );
                    }}
                  >
                    编辑
                  </a>
                  <a
                    onClick={async () => {
                      try {
                        await showConfirmPromisify({});
                        await removeAppGroupApi(record);
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

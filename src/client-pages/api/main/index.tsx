import { get } from "lodash-es";
import { Button, Space, Table, Tag, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { FormDialog } from "@formily/antd-v5";
import dayjs from "dayjs";
import { css } from "@emotion/css";
import { useEffect, useMemo } from "react";
import { ApiTest } from "./ApiTest";
import { CreateApiBtn } from "./CreateApiBtn";
import { ImportApiBtn } from "./ImportApiBtn";
import { ExportApiBtn } from "./ExportApiBtn";
import { shortUid } from "@/utils/shortUid";
import { apiBase, copyTextToClipboard } from "@/utils";
import { useGroupList } from "@/hooks";
import { FormDialogPortal } from "@/schema-component";
import { useApp } from "@/application";
import { CreateBtnWrap } from "@/style-components";
import { useRequest } from "@/api-client";

export const ApiMain = () => {
  const app = useApp();
  app.getComposeProviders;
  const navigate = useNavigate();
  const { data, refetch } = useRequest(`${apiBase}/api-manage/list`, {
    method: "GET",
  });
  const { data: groupList, refetch: refetchGroupList } = useGroupList();
  const Providers = useMemo(() => app.getComposeProviders(), [app]);
  const groupFilterOptions = get(groupList, "data.data", []).map((item) => {
    return {
      ...item,
      label: item.name,
      text: item.name,
      value: item.id,
    };
  });
  const dataSource = get(data, "data.data", []) || [];

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
          <Providers>
            <ApiTest apiId={apiId} />
          </Providers>
        );
      },
    );
    dialog.open();
  };

  useEffect(() => {
    function refresh() {
      refetch();
      refetchGroupList();
    }
    document.addEventListener("importApi", refresh);
    return () => {
      document.removeEventListener("importApi", refresh);
    };
  }, []);

  return (
    <FormDialogPortal>
      <div>
        <CreateBtnWrap>
          <ExportApiBtn />
          <ImportApiBtn />
          <CreateApiBtn />
        </CreateBtnWrap>
        <div
          className={css`
            padding: 24px;
            padding-top: 0;
          `}
        >
          <Table
            scroll={{
              x: 1800,
              y: 600,
            }}
            pagination={false}
            dataSource={dataSource}
            rowKey={"id"}
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

                dataIndex: "group.name",
                filters: groupFilterOptions,
                render: (_, row) => {
                  return get(row, "group.name");
                },
                onFilter: (value, record) => {
                  return record?.group?.id === value;
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
                          handleTestApi({ apiId: row.id });
                        }}
                      >
                        测试
                      </a>

                      <a
                        onClick={() => {
                          navigate(`/dapi/edit?id=${row.id}`);
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
        </div>
      </div>
    </FormDialogPortal>
  );
};

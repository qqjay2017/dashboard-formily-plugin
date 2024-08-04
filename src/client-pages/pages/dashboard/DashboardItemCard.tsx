import { useNavigate } from "react-router-dom";
import { css } from "@emotion/css";
import { Button, Dropdown, Input, message } from "antd";
import { FormDialog } from "@formily/antd-v5";
import { IoIosMore } from "react-icons/io";
import type { DashboardItem } from "./types";
import { updateDashboardFormSchema } from "./createDashboardFormSchema";
import type { APiWrap } from "@/api-client";
import { useAPIClient } from "@/api-client";
import { useApp, useReportShare } from "@/application/hooks";
import { apiBase, copyTextToClipboard } from "@/utils";
import { getFormDialog, showConfirmPromisify } from "@/schema-component/antd";
import { useUpdateDashboard } from "@/schema-component/hooks";
import { defaultMessage } from "@/utils/defaultMessage";

export default function DashboardItemCard({
  dashboard,
  refetch,
  createEffcts,
}: {
  dashboard: DashboardItem;
  refetch: Function;
  createEffcts: () => void;
}) {
  const navigate = useNavigate();
  const apiClient = useAPIClient();
  const app = useApp();
  const { reportShare } = useReportShare();
  const { updateDashboard } = useUpdateDashboard();
  return (
    <div
      className={css`
        width: 100%;
        height: 207px;
        border: 1px solid #e9ecf1;
        background-color: #fff;
        box-sizing: border-box;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        &:hover {
          box-shadow: 0 6px 18px #1d293924;
        }
      `}
    >
      <div
        onClick={() => {
          navigate(`/dashboard-design/${dashboard.id}`);
        }}
        className={css`
          width: 100%;
          height: 151px;
          background: #081c3d;
          background-image: url(${dashboard.coverThumbnail});
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center center;
        `}
      ></div>
      <div
        className={css`
          width: 100%;
          height: 56px;
          padding: 11px 12px 11px 16px;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          justify-content: space-between;
          border-top: 1px solid #e9ecf1;
        `}
      >
        <div
          className={css`
            flex: 1;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          `}
        >
          {dashboard.name}
        </div>

        <Dropdown
          trigger={["click"]}
          menu={{
            onClick: async ({ key }) => {
              if (key === "share") {
                const url = `${window.location.origin}/dashboard-report/${dashboard.shareURL || dashboard.id}`;
                const dialog = FormDialog(
                  {
                    title: "分享链接",

                    footer: null,
                  },
                  () => {
                    return (
                      <div>
                        <Input.TextArea value={url} disabled />
                        <Button
                          block
                          type="primary"
                          style={{
                            marginTop: "16px",
                          }}
                          onClick={() => {
                            copyTextToClipboard(url);
                          }}
                        >
                          复制链接
                        </Button>
                      </div>
                    );
                  }
                );
                dialog.open();
                return;
              }
              if (key === "delete") {
                try {
                  await showConfirmPromisify({});
                  await apiClient.request({
                    url: `${apiBase}/designer/${dashboard.id}`,
                    method: "delete",
                  });
                  refetch && refetch();
                  message.success(defaultMessage.delete);
                  return;
                } catch (error) {
                  refetch && refetch();
                }
              }
              if (key === "preview") {
                return reportShare(dashboard.shareURL || dashboard.id, {
                  isHref: false,
                });
              }
              if (key === "edit") {
                const dialog = getFormDialog(
                  {
                    title: "编辑",
                  },
                  updateDashboardFormSchema
                );
                dialog

                  .forOpen((payload, next) => {
                    next({
                      effects: createEffcts,
                      initialValues: {
                        appGroupId: dashboard.appGroupId,
                        appGroupName: dashboard.appGroupName,
                        name: dashboard.name,
                        description: dashboard.description,
                      },
                    });
                  })
                  .forConfirm(async (payload, next) => {
                    const { name, description } = payload.values;
                    await updateDashboard(
                      {
                        ...payload.values,
                        id: dashboard.id,
                        name,
                        description,
                      },
                      dashboard.id
                    );

                    message.success(defaultMessage.submit);
                    refetch && refetch();
                    next(payload);
                  })
                  .open();
              }
            },
            items: [
              {
                key: "preview",
                label: "预览",
              },
              {
                key: "share",
                label: "分享",
              },
              {
                key: "edit",
                label: "编辑",
              },
              {
                key: "delete",
                label: "删除",
              },
            ],
          }}
        >
          <IoIosMore />
        </Dropdown>
      </div>
    </div>
  );
}

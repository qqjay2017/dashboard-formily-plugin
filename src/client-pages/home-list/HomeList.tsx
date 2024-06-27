import { APiWrap, useAPIClient, useRequest } from "../../api-client/hooks";
import { get } from "lodash-es";

import { DashboardItem } from "../../demo/types";
import { Col, Dropdown, Row } from "antd";
import { css } from "@emotion/css";
import { IoIosMore } from "react-icons/io";

import { useNavigate } from "react-router-dom";

import { showConfirmPromisify } from "../../schema-component/antd";

export const HomeList = () => {
  const { data, refetch } = useRequest<APiWrap<DashboardItem[]>>(
    "/huang-api/dashboard",
    {
      method: "GET",
    }
  );

  const list = get(data, "data.data", []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Row gutter={16}>
        {list.map((dashboard) => (
          <Col className="gutter-row" key={dashboard.id} span={6}>
            <FormCard dashboard={dashboard} refetch={refetch}></FormCard>
          </Col>
        ))}
      </Row>
    </div>
  );
};

function FormCard({
  dashboard,
  refetch,
}: {
  dashboard: DashboardItem;
  refetch: Function;
}) {
  const navigate = useNavigate();
  const apiClient = useAPIClient();
  return (
    <div
      className={css`
        margin: 16px;
      `}
    >
      <div
        className={css`
          width: 272px;
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
            navigate(`/design/${dashboard.id}`);
          }}
          className={css`
            width: 100%;
            height: 151px;
            background: #f5f5f5;
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
            menu={{
              onClick: async ({ key }) => {
                if (key === "delete") {
                  await showConfirmPromisify({});
                  await apiClient.request({
                    url: `/huang-api/dashboard/${dashboard.id}`,
                    method: "delete",
                  });
                  refetch && refetch();
                  return;
                }
                if (key === "preview") {
                  window.open(
                    `/report/${dashboard.shareURL}`,
                    `/report/${dashboard.shareURL}`
                  );
                  return;
                }
              },
              items: [
                {
                  key: "preview",
                  label: "预览",
                },
                {
                  key: "shared",
                  label: "分享",
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
    </div>
  );
}

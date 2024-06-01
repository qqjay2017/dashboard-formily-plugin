import { APiWrap, useRequest } from "../api-client/hooks";
import { get } from "lodash-es";
import { CreateFormBtn } from "./components/CreateFormBtn";
import { DashboardItem } from "./types";
import { Col, Dropdown, Row } from "antd";
import { css } from "@emotion/css";
import { DashOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { useApp } from "../application/hooks";
import { showConfirmPromisify } from "../schema-component/antd";

// const useHomeListStyle = createStyles({}=> {
//   return css``
// })

export const HomeList = () => {
  const { data, refetch } = useRequest<APiWrap<DashboardItem[]>>(
    "/huang-api/dashboard",
    {
      method: "GET",
    }
  );

  const list = get(data, "data.data", []);

  return (
    <div
      className={css`
        width: 100vw;
        height: 100vh;
      `}
    >
      <div
        className={css`
          width: 100%;
          height: 50px;
          background-color: #fff;
          border-bottom: 1px solid #e4e4e5;
          box-sizing: border-box;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <div
          className={css`
            cursor: pointer;
            height: 40px;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            color: #2f2e3f;
            line-height: 40px;
            word-wrap: break-word;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 230px;
          `}
        >
          可视化大屏搭建
        </div>
        <CreateFormBtn />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Row gutter={16}>
          {list.map((dashboard) => (
            <Col className="gutter-row" key={dashboard.id} span={6}>
              <FormCard dashboard={dashboard} refetch={refetch}></FormCard>
            </Col>
          ))}
        </Row>
      </div>
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
  const { apiClient } = useApp();
  return (
    <div
      className={css`
        margin: 16px;
      `}
    >
      <div
        className={css`
          width: 272px;
          height: 234px;
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
            height: 176px;
            background: #f5f5f5;
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
            <DashOutlined />
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

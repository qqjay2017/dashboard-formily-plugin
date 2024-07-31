import { Outlet, useNavigate, useParams } from "react-router-dom";
import { css } from "@emotion/css";
import { LuDatabase } from "react-icons/lu";
import { Menu } from "antd";
import { allChartType } from "./consts";

import PageLayout from "@/client-pages/components/PageLayout";
import { cx } from "@/utils";
import { designScrollBarStyle } from "@/designable/styles";

function ChartLayout() {
  const navigate = useNavigate();
  const { type: paramType } = useParams<{ type: string }>();

  return (
    <PageLayout>
      <div
        className={css`
          flex-grow: 0;
          flex-shrink: 0;
          height: 100%;
          width: 200px;
          position: relative;
        `}
      >
        <Menu
          selectedKeys={[paramType]}
          defaultSelectedKeys={[paramType]}
          onClick={({ key }) => {
            navigate(`/charts/${key}`);
          }}
          mode="inline"
          items={[
            {
              label: "全部",
              key: "all",
              icon: <LuDatabase />,
            },
            ...allChartType,
          ]}
        ></Menu>
      </div>
      <div
        className={cx(
          designScrollBarStyle,
          css`
            flex-grow: 1;
            overflow: hidden auto;
          `
        )}
      >
        <Outlet />
      </div>
    </PageLayout>
  );
}

export default ChartLayout;

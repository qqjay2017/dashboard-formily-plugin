import { Outlet } from "react-router-dom";

import { BiSolidCategory } from "react-icons/bi";
import { css } from "@emotion/css";
import PageLayout from "../../components/PageLayout";
import { useTypeParam } from "../../hooks";

import { useAppGroupAll } from "../system/app-name/useAppGroupAll";
import { layoutRightContentStyle } from "@/designable/styles";
import LayoutMenuWrap from "@/client-pages/components/LayoutMenuWrap";

function DashboardLayout() {
  const { typeParam, setTypeParam } = useTypeParam("all");
  const { data = [] } = useAppGroupAll();
  return (
    <PageLayout>
      <LayoutMenuWrap
        selectedKeys={[typeParam]}
        onClick={({ key }) => {
          setTypeParam(key);
        }}
        items={[
          {
            label: "全部",
            key: "all",
            icon: <BiSolidCategory />,
          },
          ...data.map((item) => {
            return {
              label: item.name,
              key: item.id,
              icon: item.icon ? (
                <img
                  src={item.icon}
                  className={css`
                    width: 14px;
                    height: 14px;
                    max-width: 14px;
                    max-height: 14px;
                  `}
                />
              ) : null,
            };
          }),
        ]}
      />
      <div className={layoutRightContentStyle}>
        <Outlet />
      </div>
    </PageLayout>
  );
}

export default DashboardLayout;

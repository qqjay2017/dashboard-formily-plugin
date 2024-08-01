import { Outlet } from "react-router-dom";

import { LuDatabase } from "react-icons/lu";

import { BiSolidCategory } from "react-icons/bi";
import { allChartType } from "./consts";

import PageLayout from "@/client-pages/components/PageLayout";

import { layoutRightContentStyle } from "@/designable/styles";
import { useTypeParam } from "@/client-pages/hooks";
import LayoutMenuWrap from "@/client-pages/components/LayoutMenuWrap";

function ChartsLayout() {
  const { typeParam, setTypeParam } = useTypeParam("all");
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
          ...allChartType,
        ]}
      />

      <div className={layoutRightContentStyle}>
        <Outlet />
      </div>
    </PageLayout>
  );
}

export default ChartsLayout;

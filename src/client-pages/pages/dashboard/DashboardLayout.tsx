import { Outlet } from "react-router-dom";

import { BiSolidCategory } from "react-icons/bi";
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
          ...data.map((d) => {
            return {
              label: d.name,
              key: d.id,
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

import { Outlet } from "react-router-dom";
import { BiSolidCategory } from "react-icons/bi";
import PageLayout from "../../components/PageLayout";

import { useTypeParam } from "../../hooks";
import { allApiType } from "./consts";
import { layoutRightContentStyle } from "@/designable/styles";
import LayoutMenuWrap from "@/client-pages/components/LayoutMenuWrap";

function ApiLayout() {
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
          ...allApiType,
        ]}
      />

      <div className={layoutRightContentStyle}>
        <Outlet />
      </div>
    </PageLayout>
  );
}

export default ApiLayout;

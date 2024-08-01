import { Menu } from "antd";
import {
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { LuDatabase } from "react-icons/lu";
import PageLayout from "../components/PageLayout";
import { useTypeParam } from "../hooks";
import LayoutMenuWrap from "../components/layout/LayoutMenuWrap";
import {
  layoutRightContentStyle,
  sideMenuWrapStyle,
} from "@/designable/styles";

function DashboardLayout() {
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
            icon: <LuDatabase />,
          },
        ]}
      />
      <div className={layoutRightContentStyle}>
        <Outlet />
      </div>
    </PageLayout>
  );
}

export default DashboardLayout;

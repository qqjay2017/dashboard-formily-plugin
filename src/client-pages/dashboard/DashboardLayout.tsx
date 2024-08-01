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
import {
  layoutRightContentStyle,
  sideMenuWrapStyle,
} from "@/designable/styles";

function DashboardLayout() {
  const navigate = useNavigate();

  const { type: paramType } = useParams<{ type: string }>();
  const { typeParam, setTypeParam } = useTypeParam("all");
  return (
    <PageLayout>
      <div className={sideMenuWrapStyle}>
        <Menu
          selectedKeys={[typeParam]}
          defaultSelectedKeys={[paramType]}
          onClick={({ key }) => {
            setTypeParam(key);
          }}
          mode="inline"
          items={[
            {
              label: "全部",
              key: "all",
              icon: <LuDatabase />,
            },
          ]}
        />
      </div>
      <div className={layoutRightContentStyle}>
        <Outlet />
      </div>
    </PageLayout>
  );
}

export default DashboardLayout;

import { css } from "@emotion/css";

import { Outlet } from "react-router-dom";
import { HomeMenu } from "./layout";
import { Layout, StudioPanel } from "@/designable/react";

function DashboardLayout() {
  return (
    <Layout theme="light">
      <StudioPanel logo={<HomeMenu />}>
        <Outlet />
      </StudioPanel>
    </Layout>
  );
}
export default DashboardLayout;

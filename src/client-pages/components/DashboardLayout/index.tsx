import type { PropsWithChildren } from "react";
import HomeMenu from "../HomeMenu";
import { Layout, StudioPanel } from "@/designable/react";

function DashboardLayout(props: PropsWithChildren) {
  return (
    <Layout theme="light">
      <StudioPanel logo={<HomeMenu />}>
        {/* <Outlet /> */}
        {props.children}
      </StudioPanel>
    </Layout>
  );
}
export default DashboardLayout;

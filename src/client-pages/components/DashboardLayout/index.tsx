import type { PropsWithChildren } from "react";
import { css } from "@emotion/css";
import HomeMenu from "../HomeMenu";
import PageLayout from "../PageLayout";
import { Layout, StudioPanel } from "@/designable/react";

function DashboardLayout(props: PropsWithChildren) {
  return (
    <PageLayout hasSiderMenu={false}>
      <Layout theme="light">
        <StudioPanel
          logo={<HomeMenu />}
          className={css`
            font-size: 14px;
            background: linear-gradient(#ffffff, #f5f5f5 28%);
          `}
        >
          {props.children}
        </StudioPanel>
      </Layout>
    </PageLayout>
  );
}
export default DashboardLayout;

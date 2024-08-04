import type { PropsWithChildren } from "react";
import { css } from "@emotion/css";
import HomeMenu from "../HomeMenu";
import PageLayout from "../PageLayout";
import { Layout, StudioPanel } from "@/designable/react";

/**
 * AdminLayoutContainer 入口容器
 * @param props
 * @returns
 */
function AdminLayoutContainer(props: PropsWithChildren) {
  return (
    <PageLayout hasSiderMenu={false}>
      <Layout theme="light">
        <StudioPanel
          logo={<HomeMenu />}
          className={css`
            font-size: 14px;
            /* background: linear-gradient(#ffffff, #f5f5f5 28%); */
            background-color: rgb(240, 242, 245);
          `}
        >
          {props.children}
        </StudioPanel>
      </Layout>
    </PageLayout>
  );
}
export default AdminLayoutContainer;

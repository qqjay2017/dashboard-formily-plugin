import { css } from "@emotion/css";
import { Outlet } from "react-router-dom";
import type { PropsWithChildren } from "react";
import { PageLayoutContext } from "./context";

interface IPageLayoutProps extends PropsWithChildren {}

function PageLayout({ children }: IPageLayoutProps) {
  return (
    <PageLayoutContext.Provider value={{}}>
      {children}
    </PageLayoutContext.Provider>
  );
}

export default PageLayout;

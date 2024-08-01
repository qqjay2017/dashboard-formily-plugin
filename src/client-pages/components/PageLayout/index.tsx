import { type PropsWithChildren, useContext, useState } from "react";
import { PageLayoutContext } from "./context";

interface IPageLayoutProps extends PropsWithChildren {}

function PageLayout({ children }: IPageLayoutProps) {
  const value = useContext(PageLayoutContext);
  const [collapsed, seCollapsed] = useState(false);

  return (
    <PageLayoutContext.Provider
      value={{
        menuCollapsed: collapsed,
        setMenuCollapsed: seCollapsed,
        ...value,
      }}
    >
      {children}
    </PageLayoutContext.Provider>
  );
}

export default PageLayout;

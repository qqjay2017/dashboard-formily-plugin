import { type PropsWithChildren, useContext, useMemo, useState } from "react";
import { PageLayoutContext } from "./context";

interface IPageLayoutProps extends PropsWithChildren {
  hasSiderMenu?: boolean;
}

function PageLayout({ children, hasSiderMenu = true }: IPageLayoutProps) {
  const value = useContext(PageLayoutContext);
  const [collapsed, seCollapsed] = useState(false);
  const [hasFooterToolbar, setHasFooterToolbar] = useState(true);

  return (
    <PageLayoutContext.Provider
      value={{
        ...value,
        hasSiderMenu,
        menuCollapsed: collapsed,
        setMenuCollapsed: seCollapsed,
        siderWidth: useMemo(() => {
          if (collapsed) {
            return 60;
          }
          return 200;
        }, [collapsed]),
        hasFooterToolbar,
        setHasFooterToolbar,
      }}
    >
      {children}
    </PageLayoutContext.Provider>
  );
}

export default PageLayout;

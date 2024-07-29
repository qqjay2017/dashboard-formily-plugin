import type { PropsWithChildren } from "react";
import React, { Suspense, useMemo } from "react";

import { useApp } from "../hooks";
import { AppSpin } from "./defaultAppSpin";

/**
 * app核心容器
 */
export const MainComponent = React.memo(({ children }: PropsWithChildren) => {
  const app = useApp();
  const Router = useMemo(() => app.router.getRouterComponent(children), [app]);
  const Providers = useMemo(() => app.getComposeProviders(), [app]);
  return (
    <Suspense fallback={<AppSpin />}>
      <Router BaseLayout={Providers} />
    </Suspense>
  );
});

MainComponent.displayName = "MainComponent";

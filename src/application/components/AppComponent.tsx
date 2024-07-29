import { observer } from "@formily/reactive-react";
import type { FC, PropsWithChildren } from "react";
import React, { useCallback, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { ApplicationContext } from "../context";
import type Application from "../Application";

export interface AppComponentProps extends PropsWithChildren {
  app: Application;
}

export const AppComponent: FC<AppComponentProps> = observer(
  ({ children, ...props }) => {
    const { app } = props;
    const handleErrors = useCallback(
      (error: Error, info: { componentStack: string }) => {
        console.error(error);
        const err = new Error("err");
        err.stack = info.componentStack.trim();
        console.error(err);
      },
      []
    );
    useEffect(() => {
      app.load();
    }, [app]);
    const AppError = app.getComponent("AppError");
    if (app.loading) return app.renderComponent("AppSpin", { app });
    if (!app.maintained && app.maintaining)
      return app.renderComponent("AppMaintaining", { app });
    if (app.error?.code === "LOAD_ERROR" || app.error?.code === "APP_ERROR") {
      return <AppError app={app} error={app.error} />;
    }
    return (
      <ErrorBoundary
        FallbackComponent={(props) => (
          <AppError app={app} error={app.error} {...props} />
        )}
        onError={handleErrors}
      >
        <ApplicationContext.Provider value={app}>
          {app.maintained &&
            app.maintaining &&
            app.renderComponent("AppMaintainingDialog", { app })}
          {app.renderComponent("AppMain", undefined, children)}
        </ApplicationContext.Provider>
      </ErrorBoundary>
    );
  },
  { displayName: "AppComponent" }
);

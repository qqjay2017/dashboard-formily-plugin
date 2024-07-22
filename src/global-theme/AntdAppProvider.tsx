import { App } from "antd";
import React, { memo, useEffect } from "react";
import { useAPIClient } from "../api-client";
import { useApp } from "../application";

const AppInner = memo(({ children }: { children: React.ReactNode }) => {
  const app = useApp();

  const { notification, message } = App.useApp();
  const apiClient = useAPIClient();

  useEffect(() => {
    try {
      apiClient.notification = notification;
      apiClient.message = message;
      //@ts-expect-error
      app.notification = notification;
      //@ts-expect-error
      app.message = message;
    } catch (error) {}
  }, [notification, message, app]);

  return <>{children}</>;
});
AppInner.displayName = "AppInner";

const AntdAppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <App
      style={{
        height: "100%",
      }}
    >
      <AppInner>{children}</AppInner>
    </App>
  );
};

AntdAppProvider.displayName = "AntdAppProvider";

export default AntdAppProvider;

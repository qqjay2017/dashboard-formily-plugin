import { App, ConfigProvider } from "antd";
import React, { memo, useEffect } from "react";
import zh_CN from "antd/es/locale/zh_CN";
import { useApp } from "../../application/hooks";
import { useAPIClient } from "@/api-client";
import { globalFormConfig } from "@/utils";

const AppInner = memo(({ children }: { children: React.ReactNode }) => {
  const app = useApp();

  const { notification, message } = App.useApp();
  const apiClient = useAPIClient();

  useEffect(() => {
    try {
      ConfigProvider.config({
        holderRender: (children) => (
          <ConfigProvider locale={zh_CN} form={globalFormConfig}>
            <App>{children}</App>
          </ConfigProvider>
        ),
      });
      apiClient.notification = notification;
      apiClient.message = message;
      (app as any).notification = notification;
      (app as any).message = message;
    } catch (error) {}
  }, [notification, message, app]);

  return <>{children}</>;
});
AppInner.displayName = "AppInner";

function AntdAppProvider({ children }: { children: React.ReactNode }) {
  return (
    <App
      style={{
        height: "100%",
        width: "100%",
        background: "rgba(0 ,0 ,0, 0.4)",
      }}
    >
      <AppInner>{children}</AppInner>
    </App>
  );
}

AntdAppProvider.displayName = "AntdAppProvider";

export default AntdAppProvider;

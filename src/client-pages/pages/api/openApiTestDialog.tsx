import React from "react";
import { ApiTest } from "./ApiTest";
import { getModalDialog } from "@/schema-component/antd";

export function openApiTestDialog(apiId = "", type) {
  try {
    const dialog = getModalDialog(
      {
        title: "测试连接",
      },
      <ApiTest apiId={apiId} type={type} />
    );
    dialog.open();
  } catch (error) {}
}

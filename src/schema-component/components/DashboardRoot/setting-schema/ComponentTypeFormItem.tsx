import { useApp } from "@/application";
import { useToken } from "@/style";
import { get } from "lodash-es";
import React from "react";

export const ComponentTypeFormItem = ({ value = "" }: { value?: string }) => {
  const app = useApp();
  const { token } = useToken();
  const zhName = get(app.components || {}, `${value}.menuItem.label`, "");
  if (!zhName) {
    return (
      <div
        style={{
          color: token.colorText,
        }}
      >
        {value}
      </div>
    );
  }
  return (
    <div
      style={{
        color: token.colorText,
      }}
    >
      {`${zhName}(${value})`}
    </div>
  );
};

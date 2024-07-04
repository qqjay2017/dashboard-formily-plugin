import { useToken } from "@/style";
import React from "react";

export const ComponentAddressFormItem = ({ value }: { value?: string }) => {
  const { token } = useToken();

  return (
    <div
      style={{
        color: token.colorText,
      }}
    >
      {value}
    </div>
  );
};

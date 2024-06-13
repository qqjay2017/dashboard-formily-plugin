import { css } from "@emotion/css";
import React, { PropsWithChildren } from "react";

export const FormButtonGroupWrap = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={css`
        padding-right: 16px;
        height: 40px;
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
      `}
    >
      {children}
    </div>
  );
};

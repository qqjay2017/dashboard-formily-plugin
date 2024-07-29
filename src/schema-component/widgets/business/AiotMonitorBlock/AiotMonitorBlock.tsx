import React from "react";
import { css } from "@emotion/css";

import { AiotTypeChange } from "./AiotTypeChange";
import { useFrameSizeStyle } from "@/schema-component";

export function AiotMonitorBlock() {
  const { headStyle, bodyStyle } = useFrameSizeStyle();
  return (
    <>
      <div
        style={headStyle}
        className={css`
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 0.16rem;
        `}
      >
        <AiotTypeChange />
      </div>
      <div
        style={bodyStyle}
        className={css`
          width: 100%;
          padding: 0.14rem 0.16rem;
          overflow: hidden hidden;
        `}
      >
        234
      </div>
    </>
  );
}

AiotMonitorBlock.displayName = "AiotMonitorBlock";

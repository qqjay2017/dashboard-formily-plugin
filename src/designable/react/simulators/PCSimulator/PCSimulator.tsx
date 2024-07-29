import type { PropsWithChildren } from "react";

import { css } from "@emotion/css";
import { cn } from "@/utils";

export interface IPCSimulatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {
  className?: string;
  style?: React.CSSProperties;
}
export const PCSimulator: React.FC<IPCSimulatorProps> = (props) => {
  return (
    <div
      id="dn-pc-simulator"
      className={cn(
        "dn-pc-simulator-overlay",
        css`
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          box-sizing: border-box;
          height: 100%;
          width: 100%;
          overflow: auto;
        `
      )}
      {...props}
    >
      {props.children}
    </div>
  );
};

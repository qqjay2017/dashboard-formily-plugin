import type { PropsWithChildren } from "react";
import cls from "classnames";
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
      {...props}
      id="dn-pc-simulator"
      className={css`
        height: 100%;
        width: 100%;
        min-height: 100px;
        position: relative;
        overflow: hidden;
        background-color: #18181c;
        background-image: linear-gradient(#18181c 14px, transparent 0),
          linear-gradient(90deg, transparent 14px, #86909c 0);
        background-size:
          15px 15px,
          15px 15px;
      `}
    >
      <div
        className={cn(css`
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          box-sizing: border-box;
          height: 100%;
          width: 100%;
          overflow: overlay;
        `)}
      >
        <div
          className={css`
            width: 1920px;
            height: 1080px;
            margin: 0px;

            position: relative;
            box-sizing: border-box;
            overflow: hidden;
          `}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};

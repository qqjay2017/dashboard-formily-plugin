import { cn } from "@/utils";
import { css } from "@emotion/css";
import { Spin } from "antd";
import React, { PropsWithChildren } from "react";

interface ConetentSpinProps extends PropsWithChildren {
  isLoading?: boolean;
  className?: string;
}

export const ConetentSpin = ({
  isLoading,
  className,
  children,
}: ConetentSpinProps) => {
  return (
    <div
      className={cn(
        className,
        css`
          width: 100%;
          height: 100%;
          position: relative;
        `
      )}
    >
      {isLoading ? (
        <div
          className={css`
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 88;
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          <Spin spinning></Spin>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

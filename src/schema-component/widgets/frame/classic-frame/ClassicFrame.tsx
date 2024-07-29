import type { PropsWithChildren } from "react";
import React from "react";

import { css } from "@emotion/css";
import { useClassicFrameStyle } from "./styles";

import { cn } from "@/utils";
import { useToken } from "@/schema-component/antd/style";

import { useFrameSizeStyle } from "@/schema-component/hooks";

export interface ClassicFrameProps extends PropsWithChildren {
  title?: string;
  subTitle?: string;
  extra?: string;
  extraProps?: any;
  style?: React.CSSProperties;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
}

export function ClassicFrame({
  children,

  title,
  subTitle,
  extra,
  extraProps,
  style,
  className,
  titleClassName,
  contentClassName,
}: ClassicFrameProps) {
  const { token } = useToken();

  const hasTitle = title || extra;
  const classicFrameStyle = useClassicFrameStyle({ hasTitle: !!hasTitle });
  const { headStyle, bodyStyle } = useFrameSizeStyle();

  return (
    <div
      className={cn("nodeContentRenderer", classicFrameStyle.styles, className)}
      style={style}
    >
      {hasTitle ? (
        <div
          className={cn("nodeContentRendererTitle", titleClassName)}
          style={headStyle}
        >
          <div className={cn("nodeContentRendererTitleBg")}></div>
          {title ? <div className={cn("nrtTitle")}>{title}</div> : null}
          {subTitle ? (
            <div
              className={cn("nrtSubTitle")}
              style={{
                color: token.textCommon,
              }}
            >
              {subTitle}
            </div>
          ) : null}
          {extra ? <div className={cn("nrtExtra")}>{extra}</div> : null}
        </div>
      ) : null}

      <div
        className={cn(
          "nodeContentRendererContent",
          contentClassName
          // css`
          //   border-width: ${droppable.isOver ? "1px" : "0px"}!important;
          // `
        )}
        style={bodyStyle}
        // ref={droppable.setNodeRef}
      >
        <div
          className={css`
            width: 100%;
            height: 100%;
            position: relative;
          `}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

import React, { PropsWithChildren } from "react";
import { cn } from "../../../../utils";
import { useClassicFrameStyle } from "./styles";

import { Schema } from "@formily/react";

interface ClassicFramePropw extends PropsWithChildren {
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
}: ClassicFramePropw) {
  const hasTitle = title || extra;
  const classicFrameStyle = useClassicFrameStyle({ hasTitle: !!hasTitle });

  //
  return (
    <div
      className={cn("nodeContentRenderer", classicFrameStyle.styles, className)}
      style={style}
    >
      {hasTitle ? (
        <div className={cn("nodeContentRendererTitle", titleClassName)}>
          <div className={cn("nodeContentRendererTitleBg")}></div>
          {title ? <div className={cn("nrtTitle")}>{title}</div> : null}
          {subTitle ? (
            <div
              className={cn("nrtSubTitle")}
              style={{
                color: "#C3D4E5",
              }}
            >
              {subTitle}
            </div>
          ) : null}
          {extra ? <div className={cn("nrtExtra")}>{extra}</div> : null}
        </div>
      ) : null}

      <div className={cn("nodeContentRendererContent", contentClassName)}>
        <div
          onClick={(e) => {
            console.log(e, "ee");
          }}
        >
          123
        </div>
        {children}
      </div>
    </div>
  );
}
export function ClassicFrameSchemeWrap(inject: any = {}) {
  return new Schema({
    _isJSONSchemaObject: true,
    version: "2.0",
    type: "void",
    "x-component": "ClassicFrame",
    "x-settings": "settings:block",
    "x-decorator": "PositionDecorator",
    "x-component-props": {
      title: "默认标题",
    },
    ...inject,
  });
}
ClassicFrame.schema = ClassicFrameSchemeWrap();

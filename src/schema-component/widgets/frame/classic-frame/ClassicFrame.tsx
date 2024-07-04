import React, { PropsWithChildren, useEffect, useMemo } from "react";
import { cn, sizeFormat } from "@/utils";
import { useClassicFrameStyle } from "./styles";

import { Schema } from "@formily/react";
import { css } from "@emotion/css";

import { ClassicFrameMenuItem } from "./ClassicFrameMenuItem";
import { ClassicFrameSettingSchema } from "./ClassicFrameSettingSchema";
import { useToken } from "@/style";

import { useDashboardRoot } from "@/schema-component/components";

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
  const { rowHeight } = useDashboardRoot();
  const { token } = useToken();
  // const fieldSchema = useFieldSchema();
  const hasTitle = title || extra;
  const classicFrameStyle = useClassicFrameStyle({ hasTitle: !!hasTitle });

  // const droppable = useDroppable({
  //   id: `ClassicFrame-${field.address.toString()}`,
  //   data: {
  //     address: field.address.toString(),
  //     field,
  //     fieldSchema,
  //     type: "insert",
  //   },
  // });

  //
  const headerHeight = useMemo(() => {
    return sizeFormat(rowHeight * 0.5111);
  }, [rowHeight]);

  return (
    <div
      className={cn("nodeContentRenderer", classicFrameStyle.styles, className)}
      style={style}
    >
      {hasTitle ? (
        <div
          className={cn("nodeContentRendererTitle", titleClassName)}
          style={{
            height: headerHeight,
          }}
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
        style={{
          height: `calc( 100% - ${headerHeight}px )`,
        }}
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
    "x-decorator-props": {
      padding: [0, 0, 0, 0],
      w: 3,
      h: 3,
      ...inject?.["x-decorator-props"],
    },
  });
}

ClassicFrame.displayName = "ClassicFrame";
ClassicFrame.schemaFn = ClassicFrameSchemeWrap;
ClassicFrame.menuItem = ClassicFrameMenuItem;
ClassicFrame.settingSchema = ClassicFrameSettingSchema;

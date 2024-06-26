import React, { PropsWithChildren, useEffect } from "react";
import { cn } from "../../../../utils";
import { useClassicFrameStyle } from "./styles";

import { Schema, useField, useFieldSchema } from "@formily/react";
import { css } from "@emotion/css";
import { useDroppable } from "@dnd-kit/core";

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
  const field = useField();
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
  useEffect(() => {
    console.log("重新渲染 ClassicFrame", field.address.toString());
  }, []);
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

      <div
        className={cn(
          "nodeContentRendererContent",
          contentClassName
          // css`
          //   border-width: ${droppable.isOver ? "1px" : "0px"}!important;
          // `
        )}
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
      ...inject?.["x-decorator-props"],
      w: 3,
      h: 3,
    },
  });
}
ClassicFrame.schema = ClassicFrameSchemeWrap();

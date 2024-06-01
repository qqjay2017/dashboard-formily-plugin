import { PropsWithChildren, useMemo, useRef } from "react";

import { DragOutlined } from "@ant-design/icons";
import { Rnd } from "react-rnd";
import { useField, useFieldSchema } from "@formily/react";
import { createStyles } from "antd-style";
import { PositionDecoratorOptions, SchemaToolbarProps } from "./types";
import { useDashboardRoot } from "../DashboardRoot";
import { sizeFormat } from "../DashboardRoot/utils";
import { cn } from "../../../utils";
import Moveable from "react-moveable";

const resizeHandleStyles1: React.CSSProperties = {
  height: "7px",
  width: "30px",
  left: "50%",
  transform: "translate(-50%, -1px )",
  backgroundColor: "#fff",
  border: "3px solid var(--colorSettings)",
  borderRadius: "5px",
};
const resizeHandleStyles2: React.CSSProperties = {
  height: "30px",
  width: "7px",
  transform: `translate( -1px , -50% )`,
  top: "50%",
  backgroundColor: "#fff",
  border: "3px solid var(--colorSettings)",
  borderRadius: "5px",
};

const useRndStyle = createStyles(
  ({ css }, { toolbarActive }: { toolbarActive?: boolean }) => {
    return css`
      border-width: 1px;
      border-style: solid;
      border-color: ${toolbarActive
        ? "var( --colorBorderSettingsHover )"
        : "transparent"};
      &:hover {
        ${toolbarActive
          ? ""
          : " border-radius:5px; border-style:dashed; border-color:var( --colorBorderSettingsHover )"};
      }
    `;
  }
);
// TODO 编辑++
export const PositionDecoratorHandle = (
  props: PropsWithChildren<PositionDecoratorOptions>
) => {
  //   const { patch } = useDesignable();
  const {
    children,
    x = 0,
    y = 0,
    w = 0,
    h = 0,
    zIndex = 2,
    style,
    padding = 12,
    className,
  } = props;
  const targetRef = useRef<HTMLDivElement>(null);
  const { colWidth, rowHeight } = useDashboardRoot();

  const field = useField();
  const fieldSchema = useFieldSchema();
  const eid = field.address.toString();
  const dragHandleClassName = `dragHandle-${eid}`.replace(/\./g, "-");

  const { draggable = true, resizable = true } = {
    ...props,
    ...(fieldSchema["x-toolbar-props"] || {}),
  } as SchemaToolbarProps;

  const width = sizeFormat(colWidth * w);
  const height = sizeFormat(rowHeight * h);
  const rndStyle = useRndStyle({
    toolbarActive: false,
  });

  const styleMemo = useMemo(() => {
    const s: React.CSSProperties = {
      ...style,
    };
    if (zIndex) {
      s.zIndex = zIndex;
    }
    if (padding) {
      s.padding = Array.isArray(padding)
        ? padding.map((p) => (p || 0) + "px").join(" ")
        : padding;
    }

    return s;
  }, [padding, style, zIndex]);

  return (
    <div
      ref={targetRef}
      className={cn("positionDecoratorHandle", rndStyle.styles, className)}
      style={{
        position: "absolute",
        width,
        height,
        zIndex,
        padding: styleMemo.padding,
        left: sizeFormat(x * colWidth),
        top: sizeFormat(y * rowHeight),
      }}
    >
      {children}
    </div>
  );
};

export function PositionDecorator(
  props: PropsWithChildren<PositionDecoratorOptions>
) {
  return <PositionDecoratorHandle {...props} />;
}

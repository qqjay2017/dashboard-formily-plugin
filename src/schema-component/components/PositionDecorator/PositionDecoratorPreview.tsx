import { PropsWithChildren, useMemo } from "react";
import { PositionDecoratorOptions } from "./types";
import { useField } from "@formily/react";
import { cn, eidToElementId } from "../../../utils";
import { useDashboardRoot } from "../DashboardRoot";
import { sizeFormat } from "../DashboardRoot/utils";

export const PositionDecoratorPreview = (
  props: PropsWithChildren<PositionDecoratorOptions>
) => {
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
  const field = useField();

  const eid = field.address.toString();
  const elementId = eidToElementId(eid);
  const { colWidth, rowHeight } = useDashboardRoot();

  const width = sizeFormat(colWidth * w);
  const height = sizeFormat(rowHeight * h);
  const styleMemo = useMemo(() => {
    const s: React.CSSProperties = {
      ...style,
    };
    if (zIndex) {
      s.zIndex = zIndex;
    }
    if (padding) {
      s.padding = Array.isArray(padding)
        ? padding
            .map((p) => (typeof p === "number" ? (p || 0) + "px" : p))
            .join(" ")
        : padding;
    }

    return s;
  }, [padding, style, zIndex]);
  return (
    <div
      id={elementId}
      className={cn("positionDecoratorHandle", className)}
      style={{
        position: "absolute",
        width,
        height,
        zIndex,
        padding: styleMemo.padding,
        left: 0,
        top: 0,
        transform: `translate( ${sizeFormat(x * colWidth)}px,  ${sizeFormat(
          y * rowHeight
        )}px )`,
      }}
    >
      {children}
    </div>
  );
};

import { type PropsWithChildren, useMemo } from "react";
import { useDesigner, useViewport } from "../react";
import type { PositionDecoratorOptions } from "@/schema-component/components/PositionDecorator/types";
import { cn, sizeFormat } from "@/utils";

interface PositionDecoratorProps
  extends PropsWithChildren,
    PositionDecoratorOptions {}
export function PositionDecorator(props: PositionDecoratorProps) {
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
  const designer = useDesigner();
  const viewport = useViewport();
  const colWidth = viewport.width / 12;
  const rowHeight = viewport.height / 12;

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
            .map((p) =>
              typeof p === "number"
                ? p > 0
                  ? `${p / 100}rem`
                  : `${p || 0}px`
                : p
            )
            .join(" ")
        : padding;
    }

    return s;
  }, [padding, style, zIndex]);
  const designProps = {
    [designer.props.nodeIdAttrName]: props["data-designer-node-id"],
  };
  return (
    <div
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
      {...designProps}
    >
      {children}
    </div>
  );
}

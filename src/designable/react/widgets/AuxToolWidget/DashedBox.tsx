import React from "react";
import { observer } from "@formily/reactive-react";
import { css } from "@emotion/css";
import { useHover, useSelection, useValidNodeOffsetRect } from "../../hooks";
import { cx } from "@/utils";
import { GlobalRegistry } from "@/designable/core";

export const DashedBox = observer(() => {
  const hover = useHover();
  const prefix = "aux-dashed-box";
  const selection = useSelection();
  const rect = useValidNodeOffsetRect(hover?.node);
  const createTipsStyle = () => {
    const baseStyle: React.CSSProperties = {
      top: 0,
      left: 0,
      pointerEvents: "none",
      boxSizing: "border-box",
      visibility: "hidden",
      zIndex: 2,
    };
    if (rect) {
      baseStyle.transform = `perspective(1px) translate3d(${rect.x}px,${rect.y}px,0)`;
      baseStyle.height = rect.height;
      baseStyle.width = rect.width;
      baseStyle.visibility = "visible";
    }
    return baseStyle;
  };

  if (!hover.node) return null;
  if (hover.node.hidden) return null;
  if (selection.selected.includes(hover.node.id)) return null;

  return (
    <div
      className={cx(
        prefix,
        css`
          border: 1px dashed var(--dn-aux-dashed-box-color);
        `
      )}
      style={createTipsStyle()}
    >
      {/* <span
        color={css`
          color: var(--dn-aux-dashed-box-title-color);
        `}
        className={`${prefix}-title`}
        style={{
          position: "absolute",
          bottom: "100%",
          left: 0,
          fontSize: 12,
          userSelect: "none",
          fontWeight: "lighter",
          whiteSpace: "nowrap",
        }}
      ></span> */}
    </div>
  );
});

DashedBox.displayName = "DashedBox";

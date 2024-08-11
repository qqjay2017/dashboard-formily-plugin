import React from "react";
import { observer } from "@formily/react";
import { css, cx } from "@emotion/css";
import {
  useCursor,
  useMoveHelper,
  useValidNodeOffsetRect,
  useViewport,
} from "../../hooks";
import type { TreeNode } from "@/designable/core";
import { CursorStatus } from "@/designable/core";

interface ICoverRectProps {
  node: TreeNode;
  dragging?: boolean;
  dropping?: boolean;
}

const CoverRect: React.FC<ICoverRectProps> = (props) => {
  const rect = useValidNodeOffsetRect(props.node);
  const createCoverStyle = () => {
    const baseStyle: React.CSSProperties = {
      position: "absolute",
      top: 0,
      left: 0,
      pointerEvents: "none",
    };
    if (rect) {
      baseStyle.transform = `perspective(1px) translate3d(${rect.x}px,${rect.y}px,0)`;
      baseStyle.height = rect.height;
      baseStyle.width = rect.width;
    }
    return baseStyle;
  };

  return (
    <div
      className={cx(
        props.dragging &&
          css`
            background-color: var(
              --dn-aux-cover-rect-dragging-color,
              rgba(24, 144, 255, 0.26)
            );
          `,
        props.dropping &&
          css`
            background-color: var(
              --dn-aux-cover-rect-dropping-color,
              rgba(24, 144, 255, 0.34)
            );
          `
      )}
      style={createCoverStyle()}
    ></div>
  );
};

export const Cover = observer(() => {
  const viewportMoveHelper = useMoveHelper();
  const viewport = useViewport();
  const cursor = useCursor();
  const renderDropCover = () => {
    if (
      !viewportMoveHelper.touchNode ||
      !viewportMoveHelper.closestNode ||
      !viewportMoveHelper.closestNode?.allowAppend(viewportMoveHelper.dragNodes)
    ) {
      return null;
    }
    return <CoverRect node={viewportMoveHelper.closestNode} dropping />;
  };

  if (cursor.status !== CursorStatus.Dragging) return null;
  if (!viewportMoveHelper.touchNode) {
    return null;
  }
  return (
    <>
      {viewportMoveHelper.dragNodes.map((node) => {
        if (!node) return null;

        if (!viewport.findElementById(node.id)) return null;
        return <CoverRect key={node.id} node={node} dragging />;
      })}
      {renderDropCover()}
    </>
  );
});

import React from "react";
import cls from "classnames";
import { injectGlobal } from "@emotion/css";
import { useDesigner } from "../../hooks";
import type { TreeNode } from "@/designable/core";

injectGlobal`
.aux-node-resize-handler {
  position: absolute;
  width: 10px;
  height: 10px;
  pointer-events: all;
  border-radius: 10px;
  background-color: #fff;
  border: 1px solid var(--dn-brand-color);

  &.left-center {
    left: 0;
    top: 50%;
    transform: translate(calc(-50% - 1px), -50%);
    cursor: ew-resize;
  }

  &.right-center {
    left: 100%;
    top: 50%;
    transform: translate(calc(-50% + 1px), -50%);
    cursor: ew-resize;
  }

  &.center-top {
    left: 50%;
    top: 0;
    transform: translate(-50%, calc(-50% - 1px));
    cursor: ns-resize;
  }

  &.center-bottom {
    left: 50%;
    top: 100%;
    transform: translate(-50%, calc(-50% + 1px));
    cursor: ns-resize;
  }

  &.left-top {
    left: 0;
    top: 0;
    transform: translate(calc(-50% + 1px), calc(-50% + 1px));
    cursor: nwse-resize;
  }

  &.left-bottom {
    left: 0;
    top: 100%;
    transform: translate(-50%, -50%);
    cursor: nesw-resize;
  }

  &.right-bottom {
    left: 100%;
    top: 100%;
    transform: translate(-50%, -50%);
    cursor: nwse-resize;
  }

  &.right-top {
    left: 100%;
    top: 0;
    transform: translate(-50%, -50%);
    cursor: nesw-resize;
  }
}`;

export interface IResizeHandlerProps {
  node: TreeNode;
}

export const ResizeHandler: React.FC<IResizeHandlerProps> = (props) => {
  const designer = useDesigner();
  const prefix = "aux-node-resize-handler";
  const createHandler = (value: string) => {
    return {
      [designer.props.nodeResizeHandlerAttrName]: value,
      className: cls(prefix, value),
    };
  };
  const allowResize = props.node.allowResize();
  if (!allowResize) return null;
  const allowX = allowResize.includes("x");
  const allowY = allowResize.includes("y");
  return (
    <>
      {allowX && <div {...createHandler("left-center")}></div>}
      {allowX && <div {...createHandler("right-center")}></div>}
      {allowY && <div {...createHandler("center-top")}></div>}
      {allowY && <div {...createHandler("center-bottom")}></div>}
      {allowX && allowY && <div {...createHandler("left-top")}></div>}
      {allowY && allowY && <div {...createHandler("right-top")}></div>}
      {allowX && allowY && <div {...createHandler("left-bottom")}></div>}
      {allowY && allowY && <div {...createHandler("right-bottom")}></div>}
    </>
  );
};

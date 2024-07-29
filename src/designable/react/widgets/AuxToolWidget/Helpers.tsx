import React, { useLayoutEffect, useRef, useState } from "react";
import { reaction } from "@formily/reactive";
import cls from "classnames";
import { css } from "@emotion/css";
import { usePrefix, useViewport } from "../../hooks";
import { Selector } from "./Selector";
import { Copy } from "./Copy";
import { Delete } from "./Delete";
import { DragHandler } from "./DragHandler";
import type { TreeNode } from "@/designable/core";

const HELPER_DEBOUNCE_TIMEOUT = 100;

export interface IHelpersProps {
  node: TreeNode;
  nodeRect: DOMRect;
}
export interface IViewportState {
  viewportWidth?: number;
  viewportHeight?: number;
  viewportScrollX?: number;
  viewportScrollY?: number;
  viewportIsScrollTop?: boolean;
  viewportIsScrollBottom?: boolean;
}

export const Helpers: React.FC<IHelpersProps> = ({ node, nodeRect }) => {
  const prefix = "aux-helpers";
  const viewport = useViewport();
  const unmountRef = useRef(false);
  const ref = useRef<HTMLDivElement>();
  const [position, setPosition] = useState("inner-top-right");

  useLayoutEffect(() => {
    let request = null;

    const update = () => {};

    update();

    return reaction(
      () => [
        viewport.width,
        viewport.height,
        viewport.scrollX,
        viewport.scrollY,
        viewport.isScrollBottom,
        viewport.isScrollTop,
      ],
      () => {
        clearTimeout(request);
        request = setTimeout(update, HELPER_DEBOUNCE_TIMEOUT);
      }
    );
  }, [viewport, nodeRect]);

  if (!nodeRect || !node) return null;

  return (
    <div
      className={cls(
        prefix,
        {
          [position]: true,
        },
        css`
          position: absolute;
          pointer-events: all;
          z-index: 10;

          user-select: none;
          top: -2px;
          right: 2px;
        `
      )}
      ref={ref}
    >
      <div
        className={cls(
          `${prefix}-content`,
          css`
            display: flex;
            flex-wrap: nowrap;
            white-space: nowrap;
            button {
              font-size: 12px !important;
              display: flex;
              align-items: center;
              padding: 0 3px;
              height: 20px;
            }

            & > * {
              margin-top: 4px;
              margin-bottom: 4px;
              margin-left: 2px;

              &:first-child {
                margin-left: 0;
              }
            }
          `
        )}
      >
        <Selector node={node} />
        {node?.allowClone() === false ? null : <Copy node={node} />}

        {node?.allowDelete() === false ? null : <Delete node={node} />}
      </div>
    </div>
  );
};

Helpers.displayName = "Helpers";

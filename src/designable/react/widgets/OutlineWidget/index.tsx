import React, { useLayoutEffect, useRef } from "react";

import { observer } from "@formily/reactive-react";
import { css } from "@emotion/css";
import { useOutline, useTree, useWorkbench } from "../../hooks";
import { OutlineTreeNode } from "./OutlineNode";
import { Insertion } from "./Insertion";
import { NodeContext } from "./context";
import type { TreeNode, Viewport } from "@/designable/core";
import { globalThisPolyfill } from "@/designable/shared";
import { cn } from "@/utils";

export interface IOutlineTreeWidgetProps {
  className?: string;
  style?: React.CSSProperties;
  onClose?: () => void;
  renderTitle?: (node: TreeNode) => React.ReactNode;
  renderActions?: (node: TreeNode) => React.ReactNode;
}

export const OutlineTreeWidget: React.FC<IOutlineTreeWidgetProps> = observer(
  ({ onClose, style, renderActions, renderTitle, className, ...props }) => {
    const ref = useRef<HTMLDivElement>();
    const prefix = "dn-outline-tree";
    const workbench = useWorkbench();
    const current = workbench?.activeWorkspace || workbench?.currentWorkspace;
    const workspaceId = current?.id;
    const tree = useTree(workspaceId);
    const outline = useOutline(workspaceId);
    const outlineRef = useRef<Viewport>();
    useLayoutEffect(() => {
      if (!workspaceId) return;
      if (outlineRef.current && outlineRef.current !== outline) {
        outlineRef.current.onUnmount();
      }
      if (ref.current && outline) {
        outline.onMount(ref.current, globalThisPolyfill);
      }
      outlineRef.current = outline;
      return () => {
        outline.onUnmount();
      };
    }, [workspaceId, outline]);

    if (!outline || !workspaceId) return null;
    return (
      <NodeContext.Provider value={{ renderActions, renderTitle }}>
        <div
          {...props}
          className={cn(
            `${prefix}-container`,
            className,
            css`
              position: relative;
              min-height: 100px;
              display: flex;
              flex-direction: column;
              height: 100%;
              width: 100%;
              overflow: hidden;
              background-color: var(--dn-outline-tree-bg-color);
            `
          )}
          style={style}
        >
          <div
            className={cn(
              `${prefix}-content`,
              css`
                position: relative;
                flex-grow: 1;
                height: 100%;
                width: 100%;
                padding-bottom: 20px;
                overflow: overlay;
              `
            )}
            ref={ref}
          >
            <OutlineTreeNode node={tree} workspaceId={workspaceId} />
            <div
              className={cn(
                `${prefix}-aux`,
                css`
                  position: absolute;
                  top: 0;
                  left: 0;
                `
              )}
              style={{
                pointerEvents: "none",
              }}
            >
              <Insertion workspaceId={workspaceId} />
            </div>
          </div>
        </div>
      </NodeContext.Provider>
    );
  }
);

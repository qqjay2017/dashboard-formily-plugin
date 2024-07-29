import React, { useEffect, useState } from "react";
import { observer } from "@formily/reactive-react";
import { css } from "@emotion/css";
import { useTree, useWorkbench } from "../hooks";
import { Viewport } from "../container";
import { requestIdle } from "@/designable/shared";
import type { ITreeNode, TreeNode, WorkbenchTypes } from "@/designable/core";

export interface IViewPanelProps {
  type: WorkbenchTypes;
  children: (
    tree: TreeNode,
    onChange: (tree: ITreeNode) => void
  ) => React.ReactElement;
  scrollable?: boolean;
  dragTipsDirection?: "left" | "right";
}

export const ViewPanel: React.FC<IViewPanelProps> = observer((props) => {
  const scrollable = props.scrollable || true;
  const [visible, setVisible] = useState(true);
  const workbench = useWorkbench();
  const tree = useTree();
  useEffect(() => {
    if (workbench.type === props.type) {
      requestIdle(() => {
        requestAnimationFrame(() => {
          setVisible(true);
        });
      });
    } else {
      setVisible(false);
    }
  }, [workbench.type]);
  if (workbench.type !== props.type) return null;
  const render = () => {
    return props.children(tree, (payload) => {
      tree.from(payload);
      tree.takeSnapshot();
    });
  };
  if (workbench.type === "DESIGNABLE") {
    return (
      <Viewport dragTipsDirection={props.dragTipsDirection}>
        {render()}
      </Viewport>
    );
  }
  return (
    <div
      className={css`
        height: 100%;
        width: 100%;
        min-height: 100px;
        position: relative;
        outline: none;
        box-sizing: border-box;
        user-select: none;
        overflow: overlay;
      `}
      style={{
        overflow: scrollable ? "overlay" : "hidden",
        height: "100%",
        cursor: "auto",
        userSelect: "text",
      }}
    >
      {visible && render()}
    </div>
  );
});

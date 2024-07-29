import React from "react";
import { observer } from "@formily/reactive-react";
import { Button } from "antd";

import { useDesigner } from "../../hooks";
import type { TreeNode } from "@/designable/core";

export interface IDragHandlerProps {
  node: TreeNode;
  style?: React.CSSProperties;
}

export const DragHandler: React.FC<IDragHandlerProps> = observer(
  ({ node, style }) => {
    const designer = useDesigner();
    const prefix = "aux-drag-handler";
    if (node === node.root || !node.allowDrag()) return null;
    const handlerProps = {
      [designer.props.nodeDragHandlerAttrName]: "true",
    };
    return (
      <Button {...handlerProps} className={prefix} style={style} type="primary">
        Move
      </Button>
    );
  }
);

DragHandler.displayName = "DragHandler";

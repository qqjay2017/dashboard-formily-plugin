import React from "react";
import { Button } from "antd";

import IconWidget from "../IconWidget";
import { useTreeNode } from "../../hooks";
import { TreeNode } from "@/designable/core";

export interface ICopyProps {
  node: TreeNode;
  style?: React.CSSProperties;
}

export const Copy: React.FC<ICopyProps> = ({ node, style }) => {
  const treeNode = useTreeNode();
  const prefix = "aux-copy";
  if (node === node.root) return null;
  return (
    <Button
      className={prefix}
      style={style}
      type="primary"
      onClick={() => {
        TreeNode.clone([node]);
      }}
    >
      <IconWidget infer="Copy" size={14} />
    </Button>
  );
};

Copy.displayName = "Copy";

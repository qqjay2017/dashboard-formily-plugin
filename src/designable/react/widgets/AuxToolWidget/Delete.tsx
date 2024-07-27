import React from "react";
import { Button } from "antd";
import { TreeNode } from "@/designable/core";

export interface IDeleteProps {
  node: TreeNode;
  style?: React.CSSProperties;
}

export const Delete: React.FC<IDeleteProps> = ({ node, style }) => {
  const prefix = "aux-copy";
  if (node === node.root) return null;
  return (
    <Button
      className={prefix}
      style={style}
      type="primary"
      onClick={() => {
        TreeNode.remove([node]);
      }}
    >
      Remove
    </Button>
  );
};

Delete.displayName = "Delete";

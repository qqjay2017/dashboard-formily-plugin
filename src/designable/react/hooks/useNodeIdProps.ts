import { useDesigner } from "./useDesigner";
import { useTreeNode } from "./useTreeNode";
import type { TreeNode } from "@/designable/core";

export function useNodeIdProps(node?: TreeNode) {
  const target = useTreeNode();
  const designer = useDesigner();
  return {
    [designer.props.nodeIdAttrName]: node ? node.id : target.id,
  };
}

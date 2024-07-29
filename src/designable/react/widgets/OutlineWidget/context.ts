import type React from "react";
import { createContext } from "react";
import type { TreeNode } from "@/designable/core";

interface INodeContext {
  renderTitle?: (node: TreeNode) => React.ReactNode;
  renderActions?: (node: TreeNode) => React.ReactNode;
}

export const NodeContext = createContext<INodeContext>(null);

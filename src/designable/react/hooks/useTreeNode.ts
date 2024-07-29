import { useContext } from "react";
import { TreeNodeContext } from "../context";

export function useTreeNode() {
  return useContext(TreeNodeContext);
}

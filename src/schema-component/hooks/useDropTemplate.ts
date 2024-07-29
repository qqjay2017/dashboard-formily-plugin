import type { TreeNode } from "@/designable/core";
import { AppendNodeEvent } from "@/designable/core";
import { useDesigner } from "@/designable/react";

export function useDropTemplate(
  name: string,
  getChildren: (source: TreeNode[]) => TreeNode[]
) {
  return useDesigner((designer) => {
    return designer.subscribeTo(AppendNodeEvent, (event) => {
      const { source, target } = event.data;
      if (Array.isArray(target)) return null;
      if (!Array.isArray(source)) return null;
      // if (
      //   matchComponent(
      //     target,
      //     (key) =>
      //       key === name &&
      //       source.every((child) => !matchChildComponent(child, name))
      //   ) &&
      //   target.children.length === 0
      // ) {
      //   target.setChildren(...getChildren(source));
      //   return false;
      // }
    });
  });
}

import { useTree } from "./useTree";

export function useTreeRootProps() {
  const tree = useTree();
  return tree?.root?.props || {};
}

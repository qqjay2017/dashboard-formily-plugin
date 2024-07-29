import { useLayout } from "./useLayout";

export function usePrefix(after = "") {
  return `dn-${after}`;
}

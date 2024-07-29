// @ts-nocheck
import type { IDesignerRegistry } from "@/designable/core";
import { GlobalRegistry } from "@/designable/core";
import { globalThisPolyfill } from "@/designable/shared";

export function useRegistry(): IDesignerRegistry {
  return globalThisPolyfill.__DESIGNER_REGISTRY__ || GlobalRegistry;
}

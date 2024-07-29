import { untracked } from "@formily/reactive";
import { isArr } from "../shared";
import type {
  IBehavior,
  IBehaviorCreator,
  IBehaviorHost,
  IEngineProps,
  IResource,
  IResourceCreator,
  IResourceHost,
} from "./types";
import { Engine, TreeNode } from "./models";
import { DEFAULT_DRIVERS, DEFAULT_EFFECTS, DEFAULT_SHORTCUTS } from "./presets";

export function createDesigner(props: IEngineProps<Engine> = {}) {
  const drivers = props.drivers || [];
  const effects = props.effects || [];
  const shortcuts = props.shortcuts || [];
  return untracked(
    () =>
      new Engine({
        ...props,
        effects: [...effects, ...DEFAULT_EFFECTS],
        drivers: [...drivers, ...DEFAULT_DRIVERS],
        shortcuts: [...shortcuts, ...DEFAULT_SHORTCUTS],
      })
  );
}
export function isBehavior(val: any): val is IBehavior {
  return (
    val?.name ||
    val?.selector ||
    val?.extends ||
    val?.designerProps ||
    val?.designerLocales
  );
}
export function isResourceHost(val: any): val is IResourceHost {
  return val?.Resource && isResourceList(val.Resource);
}
export function isResourceList(val: any): val is IResource[] {
  return Array.isArray(val) && val.every(isResource);
}
export function isResource(val: any): val is IResource {
  return val?.node && !!val.node.isSourceNode && val.node instanceof TreeNode;
}
export function isBehaviorHost(val: any): val is IBehaviorHost {
  return val?.Behavior && isBehaviorList(val.Behavior);
}
export function isBehaviorList(val: any): val is IBehavior[] {
  return Array.isArray(val) && val.every(isBehavior);
}

export function createResource(...sources: IResourceCreator[]): IResource[] {
  return sources.reduce((buf, source) => {
    return buf.concat({
      ...source,
      node: new TreeNode({
        componentName: "$$ResourceNode$$",
        isSourceNode: true,
        children: source.elements || [],
      }),
    });
  }, []);
}
export function createBehavior(
  ...behaviors: Array<IBehaviorCreator | IBehaviorCreator[]>
): IBehavior[] {
  return behaviors.reduce((buf: any[], behavior) => {
    if (isArr(behavior)) return buf.concat(createBehavior(...behavior));
    const { selector } = behavior || {};
    if (!selector) return buf;
    if (typeof selector === "string") {
      behavior.selector = (node) => node.componentName === selector;
    }
    return buf.concat(behavior);
  }, []);
}

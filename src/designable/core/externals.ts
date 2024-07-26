import { untracked } from '@formily/reactive'
import type { IBehavior, IBehaviorHost, IEngineProps, IResource, IResourceHost } from './types'
import { Engine, TreeNode } from './models'

export function createDesigner(props: IEngineProps<Engine> = {}) {
  const drivers = props.drivers || []
  const effects = props.effects || []
  const shortcuts = props.shortcuts || []
  return untracked(
    () =>
      new Engine({
        ...props,
        effects: [...effects],
        drivers: [...drivers],
        shortcuts: [...shortcuts],
      }),
  )
}
export function isBehavior(val: any): val is IBehavior {
  return val?.name
    || val?.selector
    || val?.extends
    || val?.designerProps
    || val?.designerLocales
}
export function isResourceHost(val: any): val is IResourceHost {
  return val?.Resource && isResourceList(val.Resource)
}
export function isResourceList(val: any): val is IResource[] {
  return Array.isArray(val) && val.every(isResource)
}
export function isResource(val: any): val is IResource {
  return val?.node && !!val.node.isSourceNode && val.node instanceof TreeNode
}
export function isBehaviorHost(val: any): val is IBehaviorHost {
  return val?.Behavior && isBehaviorList(val.Behavior)
}
export function isBehaviorList(val: any): val is IBehavior[] {
  return Array.isArray(val) && val.every(isBehavior)
}

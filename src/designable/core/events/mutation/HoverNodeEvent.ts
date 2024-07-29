import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'
import type { ICustomEvent } from '@/designable/shared'

export class HoverNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent {
  type = 'hover:node'
}

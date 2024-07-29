import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'
import type { ICustomEvent } from '@/designable/shared'

export class DragNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent {
  type = 'drag:node'
}

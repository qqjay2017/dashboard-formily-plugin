import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'
import type { ICustomEvent } from '@/designable/shared'

export class UnSelectNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent {
  type = 'unselect:node'
}

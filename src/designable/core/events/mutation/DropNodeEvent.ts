import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'
import type { ICustomEvent } from '@/designable/shared'

export class DropNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent {
  type = 'drop:node'
}

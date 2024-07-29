import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'
import type { ICustomEvent } from '@/designable/shared'

export class WrapNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent {
  type = 'wrap:node'
}

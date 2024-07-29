import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'
import type { ICustomEvent } from '@/designable/shared'

export class PrependNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent {
  type = 'prepend:node'
}

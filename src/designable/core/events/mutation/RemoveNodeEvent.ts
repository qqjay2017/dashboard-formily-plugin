import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'
import type { ICustomEvent } from '@/designable/shared'

export class RemoveNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent {
  type = 'remove:node'
}

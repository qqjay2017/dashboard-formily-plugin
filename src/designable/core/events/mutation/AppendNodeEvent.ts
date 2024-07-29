import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'
import type { ICustomEvent } from '@/designable/shared'

export class AppendNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent {
  type = 'append:node'
}

import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'
import type { ICustomEvent } from '@/designable/shared'

export class SelectNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent {
  type = 'select:node'
}

import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'
import type { ICustomEvent } from '@/designable/shared'

export class CloneNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent {
  type = 'clone:node'
}

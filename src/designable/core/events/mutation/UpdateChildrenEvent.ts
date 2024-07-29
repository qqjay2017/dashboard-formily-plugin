import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'
import type { ICustomEvent } from '@/designable/shared'

export class UpdateChildrenEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent {
  type = 'update:children'
}

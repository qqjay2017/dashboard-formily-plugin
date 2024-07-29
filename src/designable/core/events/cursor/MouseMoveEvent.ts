import { AbstractCursorEvent } from './AbstractCursorEvent'
import type { ICustomEvent } from '@/designable/shared'

export class MouseMoveEvent
  extends AbstractCursorEvent
  implements ICustomEvent {
  type = 'mouse:move'
}

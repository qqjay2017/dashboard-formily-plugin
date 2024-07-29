import { AbstractCursorEvent } from './AbstractCursorEvent'
import type { ICustomEvent } from '@/designable/shared'

export class DragMoveEvent extends AbstractCursorEvent implements ICustomEvent {
  type = 'drag:move'
}

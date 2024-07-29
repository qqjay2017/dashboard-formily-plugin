import { AbstractCursorEvent } from './AbstractCursorEvent'
import type { ICustomEvent } from '@/designable/shared'

export class DragStopEvent extends AbstractCursorEvent implements ICustomEvent {
  type = 'drag:stop'
}

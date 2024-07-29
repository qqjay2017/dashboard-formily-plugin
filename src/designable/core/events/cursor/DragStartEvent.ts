import { AbstractCursorEvent } from './AbstractCursorEvent'
import type { ICustomEvent } from '@/designable/shared'

export class DragStartEvent
  extends AbstractCursorEvent
  implements ICustomEvent {
  type = 'drag:start'
}

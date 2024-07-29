import { AbstractCursorEvent } from './AbstractCursorEvent'
import type { ICustomEvent } from '@/designable/shared'

export class MouseClickEvent
  extends AbstractCursorEvent
  implements ICustomEvent {
  type = 'mouse:click'
}

export class MouseDoubleClickEvent
  extends AbstractCursorEvent
  implements ICustomEvent {
  type = 'mouse:dblclick'
}

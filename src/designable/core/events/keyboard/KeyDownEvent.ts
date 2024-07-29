import { AbstractKeyboardEvent } from './AbstractKeyboardEvent'
import type { ICustomEvent } from '@/designable/shared'

export class KeyDownEvent
  extends AbstractKeyboardEvent
  implements ICustomEvent {
  type = 'key:down'
}

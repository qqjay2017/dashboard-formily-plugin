import { AbstractKeyboardEvent } from './AbstractKeyboardEvent'
import type { ICustomEvent } from '@/designable/shared'

export class KeyUpEvent extends AbstractKeyboardEvent implements ICustomEvent {
  type = 'key:up'
}

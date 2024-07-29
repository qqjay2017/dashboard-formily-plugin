import { AbstractHistoryEvent } from "./AbstractHistoryEvent";
import type { ICustomEvent } from "@/designable/shared";

export class HistoryUndoEvent
  extends AbstractHistoryEvent
  implements ICustomEvent
{
  type = "history:undo";
}

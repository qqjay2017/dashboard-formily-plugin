import { AbstractHistoryEvent } from "./AbstractHistoryEvent";
import type { ICustomEvent } from "@/designable/shared";

export class HistoryRedoEvent
  extends AbstractHistoryEvent
  implements ICustomEvent
{
  type = "history:redo";
}

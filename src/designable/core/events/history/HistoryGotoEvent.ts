import { AbstractHistoryEvent } from "./AbstractHistoryEvent";
import type { ICustomEvent } from "@/designable/shared";

export class HistoryGotoEvent
  extends AbstractHistoryEvent
  implements ICustomEvent
{
  type = "history:goto";
}

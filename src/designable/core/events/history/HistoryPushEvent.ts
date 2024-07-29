import { AbstractHistoryEvent } from "./AbstractHistoryEvent";
import type { ICustomEvent } from "@/designable/shared";

export class HistoryPushEvent
  extends AbstractHistoryEvent
  implements ICustomEvent
{
  type = "history:push";
}

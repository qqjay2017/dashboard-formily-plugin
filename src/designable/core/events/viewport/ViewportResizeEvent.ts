import { AbstractViewportEvent } from "./AbstractViewportEvent";
import type { ICustomEvent } from "@/designable/shared";

export class ViewportResizeEvent
  extends AbstractViewportEvent
  implements ICustomEvent
{
  type = "viewport:resize";
}

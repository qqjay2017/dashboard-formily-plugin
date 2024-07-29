import { AbstractViewportEvent } from "./AbstractViewportEvent";
import type { ICustomEvent } from "@/designable/shared";

export class ViewportScrollEvent
  extends AbstractViewportEvent
  implements ICustomEvent
{
  type = "viewport:scroll";
}

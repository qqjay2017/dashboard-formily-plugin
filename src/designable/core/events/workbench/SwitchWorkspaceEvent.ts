import { AbstractWorkspaceEvent } from "./AbstractWorkspaceEvent";
import type { ICustomEvent } from "@/designable/shared";

export class SwitchWorkspaceEvent
  extends AbstractWorkspaceEvent
  implements ICustomEvent
{
  type = "switch:workspace";
}

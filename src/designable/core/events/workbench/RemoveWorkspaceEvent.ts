import { AbstractWorkspaceEvent } from "./AbstractWorkspaceEvent";
import type { ICustomEvent } from "@/designable/shared";

export class RemoveWorkspaceEvent
  extends AbstractWorkspaceEvent
  implements ICustomEvent
{
  type = "remove:workspace";
}

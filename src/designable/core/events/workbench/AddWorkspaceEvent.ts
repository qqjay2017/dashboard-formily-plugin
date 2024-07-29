import { AbstractWorkspaceEvent } from "./AbstractWorkspaceEvent";
import type { ICustomEvent } from "@/designable/shared";

export class AddWorkspaceEvent
  extends AbstractWorkspaceEvent
  implements ICustomEvent
{
  type = "add:workspace";
}

import { AbstractMutationNodeEvent } from "./AbstractMutationNodeEvent";
import type { ICustomEvent } from "@/designable/shared";

export class InsertAfterEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent
{
  type = "insert:after";
}

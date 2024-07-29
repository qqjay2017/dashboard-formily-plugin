import { AbstractMutationNodeEvent } from "./AbstractMutationNodeEvent";
import type { ICustomEvent } from "@/designable/shared";

export class UpdateNodePropsEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent
{
  type = "update:node:props";
}

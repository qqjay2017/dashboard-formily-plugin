import type { ITreeNode, TreeNode } from "../../models";
import type { IEngineContext } from "../../types";
import type { ICustomEvent } from "@/designable/shared";

export interface IFromNodeEventData {
  // 事件发生的数据源
  source: ITreeNode;
  // 事件发生的目标对象
  target: TreeNode;
}

export class FromNodeEvent implements ICustomEvent {
  type = "from:node";
  data: IFromNodeEventData;
  context: IEngineContext;
  constructor(data: IFromNodeEventData) {
    this.data = data;
  }
}

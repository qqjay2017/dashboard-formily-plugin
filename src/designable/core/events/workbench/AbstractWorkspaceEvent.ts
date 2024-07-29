import type { Workspace } from "../../models";
import type { IEngineContext } from "../../types";

export class AbstractWorkspaceEvent {
  data: Workspace;
  context: IEngineContext;
  constructor(data: Workspace) {
    this.data = data;
  }
}

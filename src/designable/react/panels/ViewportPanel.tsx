import { Simulator } from "../container/Simulator";
import { type IWorkspaceItemProps, WorkspacePanel } from "./WorkspacePanel";

export const ViewportPanel: React.FC<IWorkspaceItemProps> = (props) => {
  return (
    <WorkspacePanel.Item {...props} flexable>
      <Simulator>{props.children}</Simulator>
    </WorkspacePanel.Item>
  );
};

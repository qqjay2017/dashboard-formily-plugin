import { css } from "@emotion/css";
import type { PropsWithChildren } from "react";

export interface IWorkspaceItemProps extends PropsWithChildren {
  style?: React.CSSProperties;
  flexable?: boolean;
}

export const WorkspacePanel: React.FC<PropsWithChildren> & {
  Item?: React.FC<IWorkspaceItemProps>;
} = (props) => {
  return (
    <div
      className={css`
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        padding: 4px;
        overflow: hidden;
        box-sizing: border-box;
        background-color: var(--dn-workspace-panel-bg-color);
        position: relative;
        z-index: 1;
      `}
    >
      {props.children}
    </div>
  );
};

WorkspacePanel.Item = (props) => {
  return (
    <div
      className={css`
        position: relative;
      `}
      style={{
        ...props.style,
        flexGrow: props.flexable ? 1 : 0,
        flexShrink: props.flexable ? 1 : 0,
      }}
    >
      {props.children}
    </div>
  );
};

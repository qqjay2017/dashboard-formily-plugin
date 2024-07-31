import React from "react";
import { Breadcrumb } from "antd";
import { observer } from "@formily/reactive-react";
import { css } from "@emotion/css";
import {
  useHover,
  usePrefix,
  useSelectedNode,
  useSelection,
} from "../../hooks";
import { NodeTitleWidget } from "../NodeTitleWidget";
import IconWidget from "@/designable/react/widgets/IconWidget";
import { cn } from "@/utils";

export interface INodePathWidgetProps {
  workspaceId?: string;
  maxItems?: number;
}

export const NodePathWidget: React.FC<INodePathWidgetProps> = observer(
  (props) => {
    const selected = useSelectedNode(props.workspaceId);
    const selection = useSelection(props.workspaceId);
    const hover = useHover(props.workspaceId);
    const prefix = usePrefix("node-path");
    if (!selected) return <React.Fragment />;
    const maxItems = props.maxItems ?? 3;
    const nodes = selected
      .getParents()
      .slice(0, maxItems - 1)
      .reverse()
      .concat(selected);
    return (
      <Breadcrumb
        className={cn(
          prefix,
          css`
            padding: 4px 10px !important;
            border-bottom: 1px solid var(--dn-panel-border-color);
            .dn-icon {
              font-size: 11px;
            }

            .ant-breadcrumb-separator {
              margin: 0 4px !important;
            }

            a {
              font-size: 12px;
            }
          `
        )}
        items={nodes.map((node, key) => {
          return {
            key,

            title: (
              <>
                {key === 0 && (
                  <IconWidget
                    infer="Position"
                    style={{ marginRight: 3 }}
                    size={12}
                  />
                )}
                <a
                  href=""
                  onMouseEnter={() => {
                    hover.setHover(node);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    selection.select(node);
                  }}
                >
                  <NodeTitleWidget node={node} />
                </a>
              </>
            ),
          };
        })}
      ></Breadcrumb>
    );
  }
);

import { observer } from "@formily/reactive-react";
import { css } from "@emotion/css";
import {
  useCursor,
  useDesigner,
  useMoveHelper,
  useSelection,
  useTree,
  useValidNodeOffsetRect,
} from "../../hooks";
import { Helpers } from "./Helpers";
import { ResizeHandler } from "./ResizeHandler";
import { TranslateHandler } from "./TranslateHandler";
import type { TreeNode } from "@/designable/core";
import { cn } from "@/utils";

export interface ISelectionBoxProps {
  node: TreeNode;
  showHelpers: boolean;
}

export const SelectionBox: React.FC<ISelectionBoxProps> = (props) => {
  const designer = useDesigner();

  const nodeRect = useValidNodeOffsetRect(props.node);
  const createSelectionStyle = () => {
    const baseStyle: React.CSSProperties = {
      position: "absolute",
      top: 0,
      left: 0,
      boxSizing: "border-box",
      zIndex: 4,
    };
    if (nodeRect) {
      baseStyle.transform = `perspective(1px) translate3d(${nodeRect.x}px,${nodeRect.y}px,0)`;
      baseStyle.height = nodeRect.height;
      baseStyle.width = nodeRect.width;
    }
    return baseStyle;
  };

  if (!nodeRect) return null;

  if (!nodeRect.width || !nodeRect.height) return null;

  const selectionId = {
    [designer.props?.nodeSelectionIdAttrName]: props.node.id,
  };

  return (
    <div
      {...selectionId}
      className={cn(
        "aux-selection-box",
        css`
          border: 2px solid var(--dn-aux-selection-box-border-color);
          position: relative;
          pointer-events: none;
        `
      )}
      style={createSelectionStyle()}
    >
      <div
        className={cn(
          "aux-selection-box-inner",
          css`
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          `
        )}
      ></div>
      <ResizeHandler node={props.node} />
      <TranslateHandler node={props.node} />
      {props.showHelpers && (
        <Helpers {...props} node={props.node} nodeRect={nodeRect} />
      )}
    </div>
  );
};

export const Selection = observer(() => {
  const selection = useSelection();
  const tree = useTree();
  const cursor = useCursor();
  const viewportMoveHelper = useMoveHelper();

  if (cursor.status !== "NORMAL" && viewportMoveHelper.touchNode) return null;
  return (
    <>
      {selection.selected.map((id) => {
        const node = tree.findById(id);

        if (!node) return null;
        if (node.hidden) return null;
        return (
          <SelectionBox
            key={id}
            node={node}
            showHelpers={selection.selected.length === 1}
          />
        );
      })}
    </>
  );
});

Selection.displayName = "Selection";

import type { Engine } from "../models";
import { CursorDragType } from "../models";
import { DragMoveEvent, DragStartEvent, DragStopEvent } from "../events";
import { setNewPosition } from "./useTranslateEffect";

export function useResizeEffect(engine: Engine) {
  const findStartNodeHandler = (target: HTMLElement) => {
    const handler = target?.closest(
      `*[${engine.props.nodeResizeHandlerAttrName}]`
    );
    if (handler) {
      const direction = handler.getAttribute(
        engine.props.nodeResizeHandlerAttrName
      );
      if (direction) {
        const element = handler.closest(
          `*[${engine.props.nodeSelectionIdAttrName}]`
        );
        if (element) {
          const nodeId = element.getAttribute(
            engine.props.nodeSelectionIdAttrName
          );
          if (nodeId) {
            const node = engine.findNodeById(nodeId);
            if (node) {
              return { direction, node, element };
            }
          }
        }
      }
    }
  };

  engine.subscribeTo(DragStartEvent, (event) => {
    const target = event.data.target as HTMLElement;
    const currentWorkspace =
      engine.workbench.currentWorkspace || engine.workbench.activeWorkspace;
    if (!currentWorkspace) return;
    const handler = findStartNodeHandler(target);
    const helper = currentWorkspace.operation.transformHelper;
    if (handler) {
      const selectionElement = handler.element.closest(
        `*[${engine.props.nodeSelectionIdAttrName}]`
      ) as HTMLElement;
      if (selectionElement) {
        const nodeId = selectionElement.getAttribute(
          engine.props.nodeSelectionIdAttrName
        );
        if (nodeId) {
          const node = engine.findNodeById(nodeId);
          if (node) {
            helper.dragStart({
              dragNodes: [node],
              type: "resize",
              direction: handler.direction,
            });
          }
        }
      }
    }
  });

  engine.subscribeTo(DragMoveEvent, (event) => {
    if (engine.cursor.dragType !== CursorDragType.Resize) return;
    const currentWorkspace =
      engine.workbench.currentWorkspace || engine.workbench.activeWorkspace;
    const helper = currentWorkspace?.operation.transformHelper;
    const dragNodes = helper.dragNodes;
    if (!dragNodes.length) return;
    helper.dragMove();
    dragNodes.forEach((node) => {
      const element = node.getElement();
      helper.resize(node, (rect) => {
        element.style.width = `${rect.width}px`;
        element.style.height = `${rect.height}px`;
        element.style.position = "absolute";
        element.style.left = "0px";
        element.style.top = "0px";
        element.style.transform = `translate3d(${rect.x}px,${rect.y}px,0)`;
      });
    });
  });

  engine.subscribeTo(DragStopEvent, (event) => {
    if (engine.cursor.dragType !== CursorDragType.Resize) return;
    const currentWorkspace =
      engine.workbench.currentWorkspace || engine.workbench.activeWorkspace;
    const helper = currentWorkspace?.operation?.transformHelper;
    const root = currentWorkspace?.operation?.tree.root;

    if (helper && root) {
      const dragNodes = helper.dragNodes;
      dragNodes &&
        dragNodes.length &&
        setNewPosition(dragNodes, {
          colWidth: root?.props?.designWidth / 12,
          rowHeight: root?.props?.designHeight / 12,
        });
      helper.dragEnd();
    }
  });
}

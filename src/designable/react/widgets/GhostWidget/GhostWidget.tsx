import { useEffect, useRef } from "react";
import { autorun } from "@formily/reactive";
import { observer } from "@formily/reactive-react";
import { css } from "@emotion/css";
import { useCursor, useDesigner } from "../../hooks";
import { CursorStatus } from "@/designable/core";

export const GhostWidget = observer(() => {
  const designer = useDesigner();
  const cursor = useCursor();
  const ref = useRef<HTMLDivElement>();

  const movingNodes = designer.findMovingNodes();

  const firstNode = movingNodes[0];

  useEffect(
    () =>
      autorun(() => {
        const transform = `perspective(1px) translate3d(${
          cursor.position?.topClientX - 18
        }px,${cursor.position?.topClientY - 12}px,0) scale(0.8)`;

        if (!ref.current) return;
        ref.current.style.transform = transform;
      }),
    [designer, cursor]
  );

  const renderNodes = () => {
    return (
      <span
        style={{
          whiteSpace: "nowrap",
        }}
      >
        <div>拖拽组件</div>
        {movingNodes.length > 1 ? "..." : ""}
      </span>
    );
  };

  if (!firstNode) return null;

  return cursor.status === CursorStatus.Dragging ? (
    <div
      id="GhostWidget"
      ref={ref}
      className={css`
        padding-left: 25px;
        padding-right: 15px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        color: var(--dn-ghost-color);
        font-size: 12px;
        z-index: 9999;
        border-radius: 50px;
        background-color: var(--dn-ghost-bg-color);
        pointer-events: none;
        left: 0;
        top: 0;
        transform: translate3d(0, 0, 0);
      `}
    >
      {renderNodes()}
    </div>
  ) : null;
});

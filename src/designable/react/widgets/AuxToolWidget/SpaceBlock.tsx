import React, { Fragment } from "react";
import { observer } from "@formily/reactive-react";
import { injectGlobal } from "@emotion/css";
import { useCursor, useTransformHelper } from "../../hooks";
import { CursorStatus } from "@/designable/core";
import type { ILineSegment } from "@/designable/shared";
import { calcRectOfAxisLineSegment } from "@/designable/shared";

injectGlobal`
  .aux-space-block-ruler-indicator {
  position: absolute;
  background-color: var(--dn-brand-color);
  color: var(--dn-white);
  border-radius: 8px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    margin: 0 6px;
    display: inline-block;
    font-size: 12px;
  }
}
.aux-space-block-ruler-h {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  width: 100%;
  height: 12px;
  border-left: 1px solid var(--dn-brand-color);
  border-right: 1px solid var(--dn-brand-color);

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translate(0, -50%);
    width: 100%;
    height: 1px;
    background-color: var(--dn-brand-color);
    z-index: 1;
  }

  .aux-space-block-ruler-indicator {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(0.7);
  }
}

 .aux-space-block-ruler-indicator {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(0.7);
  }

  .aux-space-block-ruler-v {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  height: 100%;
  width: 12px;
  border-top: 1px solid var(--dn-brand-color);
  border-bottom: 1px solid var(--dn-brand-color);

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    height: 100%;
    width: 1px;
    background-color: var(--dn-brand-color);
    z-index: 1;
  }

  .aux-space-block-ruler-indicator {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(0.7);
  }
}
  
`;

export const SpaceBlock = observer(() => {
  const cursor = useCursor();
  const transformHelper = useTransformHelper();
  const prefix = "aux-space-block";

  if (cursor.status !== CursorStatus.Dragging) return null;

  const renderRulerBox = (distance: number, type: string) => {
    if (type === "top" || type === "bottom") {
      return (
        <div className={`${prefix}-ruler-v`}>
          <div className={`${prefix}-ruler-indicator`}>
            <span>{distance?.toFixed(0)}</span>
          </div>
        </div>
      );
    } else if (type === "left" || type === "right") {
      return (
        <div className={`${prefix}-ruler-h`}>
          <div className={`${prefix}-ruler-indicator`}>
            <span>{distance?.toFixed(0)}</span>
          </div>
        </div>
      );
    }
  };

  const renderDashedLine = (line: ILineSegment) => {
    const rect = calcRectOfAxisLineSegment(line);
    if (!rect) return null;
    const width = rect.width || 2;
    const height = rect.height || 2;
    return (
      <svg
        width={`${width}px`}
        height={`${height}px`}
        viewBox={`0 0 ${width} ${height}`}
        style={{
          top: 0,
          left: 0,
          transform: `perspective(1px) translate3d(${line.start.x}px,${line.start.y}px,0)`,
          position: "absolute",
          zIndex: 3,
        }}
      >
        <line
          x1={line.start.x - rect.x}
          y1={line.start.y - rect.y}
          x2={line.end.x - rect.x}
          y2={line.end.y - rect.y}
          strokeDasharray={4}
          stroke="#745BFF"
          strokeWidth={2}
        ></line>
      </svg>
    );
  };

  return (
    <>
      {transformHelper.measurerSpaceBlocks.map(
        ({ type, crossDragNodesRect, distance, extendsLine }, key) => {
          return (
            <Fragment key={key}>
              {renderDashedLine(extendsLine)}
              <div
                key={key}
                style={{
                  top: 0,
                  left: 0,
                  height: crossDragNodesRect.height,
                  width: crossDragNodesRect.width,
                  transform: `perspective(1px) translate3d(${crossDragNodesRect.x}px,${crossDragNodesRect.y}px,0)`,
                  position: "absolute",
                  zIndex: 3,
                }}
              >
                {renderRulerBox(distance, type)}
              </div>
            </Fragment>
          );
        }
      )}
      {transformHelper.thresholdSpaceBlocks.map(({ rect }, key) => {
        return (
          <div
            key={key}
            className={prefix}
            style={{
              top: 0,
              left: 0,
              height: rect.height,
              width: rect.width,
              transform: `perspective(1px) translate3d(${rect.x}px,${rect.y}px,0)`,
              position: "absolute",
              background: "rgba(255, 0, 0, 0.2)",
              zIndex: 1,
            }}
          ></div>
        );
      })}
    </>
  );
});

SpaceBlock.displayName = "SpaceBlock";
import { useRef } from "react";
import Moveable from "react-moveable";
import Selecto from "react-selecto";
import { useDesignPageConext } from "../../../design-page";
import { useForm } from "@formily/react";
import { useSaveAllFieldSchema } from "../../hooks/useSaveAllFieldSchema";
import { eidToElementId, elementIdToEid } from "../../../utils";
import { sizeFormat } from "./utils";
import { useDashboardRoot } from "./hooks";
import { diff } from "@egjs/children-differ";
import { observer } from "@formily/reactive-react";
import { selectedTargetsStore } from "./selectedTargetsStore";

export const MoveableManage = observer(() => {
  const { colWidth, rowHeight } = useDashboardRoot();
  const moveableRef = useRef<Moveable>(null);
  const selectoRef = useRef<Selecto>(null);
  const { designZoom } = useDesignPageConext();

  const form = useForm();
  const { saveRemoteFieldSchema, saveLocalFieldState } =
    useSaveAllFieldSchema();
  const onMoveEnd = (eid, e) => {
    const { left, top, width, height } = e.moveable.getRect();
    saveLocalFieldState({
      address: elementIdToEid(eid),
      schema: {
        "x-decorator-props": {
          x: sizeFormat(left / colWidth),
          w: sizeFormat(width / colWidth),
          y: sizeFormat(top / rowHeight),
          h: sizeFormat(height / rowHeight),
        },
      },
    });
  };
  const setTargets = (targets) => {
    selectedTargetsStore.value = targets;
  };
  return (
    <>
      <Moveable
        zoom={designZoom}
        ref={moveableRef}
        draggable={true}
        origin={false}
        originDraggable={false}
        originRelative={false}
        resizable={true}
        rotatable={false}
        // 内容是否支持缩放
        scalable={false}
        throttleResize={1}
        target={selectedTargetsStore.value}
        throttleDrag={1}
        edgeDraggable={false}
        startDragRotate={0}
        throttleDragRotate={0}
        keepRatio={false}
        throttleScale={0}
        renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
        throttleRotate={0}
        rotationPosition={"top"}
        isDisplayGridGuidelines
        bounds={{
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          position: "css",
          // ...bounds,
        }}
        isDisplaySnapDigit
        isDisplayInnerSnapDigit={false}
        snappable={true}
        snapGap={true}
        snapDirections={{
          top: true,
          left: true,
          bottom: true,
          right: true,
          center: true,
          middle: true,
        }}
        elementSnapDirections={{
          top: true,
          left: true,
          bottom: true,
          right: true,
          center: true,
          middle: true,
        }}
        maxSnapElementGuidelineDistance={100}
        elementGuidelines={[
          // ".positionDecoratorHandle",
          // ".nodeContentRenderer",
          ...Object.keys(form.getFormGraph())
            .filter(Boolean)
            .map((k) => "#" + eidToElementId(k)),
        ]}
        onDragOrigin={(e) => {
          e.target.style.transformOrigin = e.transformOrigin;
        }}
        onResize={(e) => {
          e.target.style.width = `${e.width}px`;
          e.target.style.height = `${e.height}px`;
        }}
        onResizeEnd={(e) => {
          requestAnimationFrame(() => {
            const eid = e.target.id;
            onMoveEnd(eid, e);

            saveRemoteFieldSchema();
          });
        }}
        onRender={(e) => {
          e.target.style.transform = e.transform;
        }}
        onDragStart={(e) => {}}
        onDrag={(e) => {
          e.target.style.transform = e.transform;
        }}
        onDragGroup={(e) => {
          e.events.forEach((ev) => {
            ev.target.style.transform = ev.transform;
          });
        }}
        onRenderGroup={(e) => {
          e.events.forEach((ev) => {
            ev.target.style.cssText += ev.cssText;
          });
        }}
        onResizeGroupEnd={(e) => {
          e.events.forEach((ev) => {
            const eid = ev.target.id;
            onMoveEnd(eid, ev);
          });
          saveRemoteFieldSchema();
        }}
        onClickGroup={(e) => {
          selectoRef.current!.clickTarget(e.inputEvent, e.inputTarget);
        }}
        onClick={(e) => {
          if (e.isDouble) {
            const inputTarget = e.inputTarget as HTMLElement;
            const selectableElements =
              selectoRef.current!.getSelectableElements();

            if (selectableElements.includes(inputTarget)) {
              selectoRef.current!.setSelectedTargets([inputTarget]);
              setTargets([inputTarget]);
            }
          }
        }}
        onDragEnd={(e) => {
          const [left, top] = e.lastEvent?.translate || [];
          if (!left && !top) {
            return false;
          }
          const eid = e.target.id;
          saveLocalFieldState({
            address: elementIdToEid(eid),
            schema: {
              "x-decorator-props": {
                x: sizeFormat(left / colWidth),
                y: sizeFormat(top / rowHeight),
              },
            },
          });

          saveRemoteFieldSchema();
        }}
        onDragGroupEnd={(e) => {
          e.events.forEach((ev) => {
            const [left, top] = ev.lastEvent?.translate || [];
            if (!left && !top) {
              return false;
            }
            const eid = ev.target.id;
            onMoveEnd(eid, ev);
          });
          saveRemoteFieldSchema();
        }}
      />
      <Selecto
        ref={selectoRef}
        rootContainer={document.body}
        dragContainer={"#DashboardRoot"}
        selectableTargets={[".positionDecoratorHandle"]}
        hitRate={0}
        selectByClick={true}
        selectFromInside={false}
        toggleContinueSelect={["shift"]}
        continueSelect={false}
        ratio={0}
        onDragStart={(e) => {
          const moveable = moveableRef.current!;
          const target = e.inputEvent.target;
          if (
            moveable.isMoveableElement(target) ||
            selectedTargetsStore.value.some(
              (t: any) => t === target || t.contains(target)
            )
          ) {
            e.stop();
          }
        }}
        onSelectEnd={(e) => {
          const moveable = moveableRef.current!;
          let selected = e.selected;

          // excludes child elements.
          selected = selected.filter((target) => {
            return selected.every((target2) => {
              return target === target2 || !target2.contains(target);
            });
          });

          const result = diff(e.startSelected, selected);

          e.currentTarget.setSelectedTargets(selected);

          if (!result.added.length && !result.removed.length) {
            return;
          }
          if (e.isDragStartEnd) {
            e.inputEvent.preventDefault();

            moveable.waitToChangeTarget().then(() => {
              moveable.dragStart(e.inputEvent);
            });
          }
          setTargets(selected);
        }}
      />
    </>
  );
});

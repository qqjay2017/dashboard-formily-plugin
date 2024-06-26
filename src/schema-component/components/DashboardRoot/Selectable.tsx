import React, { useEffect, useRef } from "react";
import Moveable from "react-moveable";
import Selecto from "react-selecto";
import { selectedTargetsStore } from "./selectedTargetsStore";
import { diff } from "@egjs/children-differ";
import { observer } from "@formily/reactive-react";
import { useDesignPageConext } from "./context";
export const Selectable = observer(
  ({
    selectoRef,
    moveableRef,
  }: {
    selectoRef: React.MutableRefObject<Selecto>;
    moveableRef: React.MutableRefObject<Moveable>;
  }) => {
    const { designZoom } = useDesignPageConext();
    //

    const setTargets = (targets) => {
      selectedTargetsStore.value = targets;
    };
    useEffect(() => {
      setTargets([]);
    }, [designZoom]);
    return (
      <Selecto
        ref={selectoRef}
        rootContainer={document.body}
        dragContainer={"#viewPort"}
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
    );
  }
);

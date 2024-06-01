import React, {
  HTMLAttributes,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { GroupManager, TargetList } from "@moveable/helper";
import { defaultBreakpoints, sizeFormat } from "./utils";
import { useSchemaComponentContext } from "../../hooks";
import { useFieldSchema } from "@formily/react";
import { useKeycon } from "react-keycon";
import { useUpdate } from "ahooks";
import { useBreakpoints } from "./hooks";
import { allThemeNameMap } from "../../../dashboard-themes";
import { useDashboardRootStyle } from "./styles";
import Selecto from "react-selecto";
import { DashboardRootContext } from "./context";
import { cn } from "../../../utils";
import Moveable, { MoveableTargetGroupsType } from "react-moveable";
import { diff } from "@egjs/children-differ";
import { deepFlat } from "@daybrush/utils";

declare module "react-keycon" {
  export interface ReactKeyControllerResult {
    isKeydown: boolean;
  }
}

interface DashboardRootProps extends PropsWithChildren, HTMLAttributes<any> {
  cols?: number;
  designable?: boolean;
  distributed?: boolean;
  designWidth?: number;
  designHeight?: number;
  breakpoints?: {
    showroom: number;
    desktop: number;
    tablet: number;
    mobile: number;
  };
  themeProvider?: string;
  rows?: 12;
  rowheight?: 80;
  dndContext?: any;
  className?: string;
  style?: React.CSSProperties;
  isDarkTheme?: boolean;
}

export const DashboardRoot = ({ children, ...props }: DashboardRootProps) => {
  const {
    breakpoints = defaultBreakpoints,
    designWidth = 1920,
    designHeight = 1080,
    cols = 12,
    rows = 12,
    rowheight: mobileRowHeight = 80,
    themeProvider = "",
    distributed,
    className,
    style,
    isDarkTheme,
    ...otherProps
  } = props;
  const { designable: defaultDesignable } = useSchemaComponentContext();
  const { isKeydown: isCommand } = useKeycon({ keys: "meta" });
  const { isKeydown: isShift } = useKeycon({ keys: "shift" });

  const groupManager = useMemo<GroupManager>(() => new GroupManager([]), []);
  const [targets, setTargets] = useState<MoveableTargetGroupsType>([]);
  const moveableRef = useRef<Moveable>(null);
  const selectoRef = useRef<Selecto>(null);
  const rootFieldSchema = useFieldSchema();
  const refresh = useUpdate();

  const { breakpoint, width, height, ref } = useBreakpoints(breakpoints, 800);

  const isPc = breakpoint === "desktop" || breakpoint === "showroom";

  const rowHeight = sizeFormat(height / rows);

  const colWidth = cols && width ? sizeFormat(width / cols) : 0;

  const scale = useMemo(() => {
    let scale = 1;
    if (!width || !height) {
      return scale;
    }

    if (width / height < designWidth / designHeight) {
      scale = width / designWidth;
    } else {
      scale = height / designHeight;
    }
    if (scale < 0.2) {
      return 0.2;
    }
    if (scale > 1.2) {
      return 1.2;
    }
    return scale;
  }, [designWidth, designHeight, width, height]);

  const themeConfig = allThemeNameMap[themeProvider] || {};
  const themeToken = themeConfig?.token || {};
  const themeDarkOrLightToken = themeConfig?.[isDarkTheme ? "dark" : "light"];

  const rootStyle = useDashboardRootStyle({
    themeProvider,
    isDarkTheme,
  });

  const setSelectedTargets = useCallback(
    (nextTargetes: MoveableTargetGroupsType) => {
      selectoRef.current!.setSelectedTargets(deepFlat(nextTargetes));
      setTargets(nextTargetes as any);
    },
    []
  );
  useEffect(() => {
    const elements = selectoRef.current!.getSelectableElements();
    groupManager.set([], elements);
  }, []);

  return (
    <DashboardRootContext.Provider
      value={{
        breakpoint,
        colWidth,
        rowHeight,
        isPc,
        designWidth,
        designHeight,
        themeProvider,
        scale,
        rootFieldSchema,
        mobileRowHeight,
      }}
    >
      <div
        {...otherProps}
        id="DashboardRoot"
        ref={ref}
        className={cn(rootStyle.styles, className, themeProvider)}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          ...style,
        }}
      >
        <Moveable
          ref={moveableRef}
          draggable={true}
          resizable={true}
          rotatable={false}
          // 内容是否支持缩放
          scalable={false}
          throttleResize={1}
          target={targets}
          snappable={true}
          throttleDrag={1}
          edgeDraggable={false}
          startDragRotate={0}
          throttleDragRotate={0}
          keepRatio={false}
          throttleScale={0}
          renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
          throttleRotate={0}
          rotationPosition={"top"}
          originDraggable={true}
          originRelative={true}
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
          maxSnapElementGuidelineDistance={200}
          elementGuidelines={[".positionDecoratorHandle"]}
          onDragOrigin={(e) => {
            e.target.style.transformOrigin = e.transformOrigin;
          }}
          onResize={(e) => {
            const id = e.target.id;

            e.target.style.width = `${e.width}px`;
            e.target.style.height = `${e.height}px`;
            // e.target.style.transform = e.drag.transform;
          }}
          onResizeEnd={(e) => {
            requestAnimationFrame(() => {
              const rect = e.moveable.getRect();
              console.log(rect);
            });
          }}
          onRender={(e) => {
            e.target.style.transform = e.transform;
          }}
          onDrag={(e) => {
            e.target.style.transform = e.transform;
          }}
          onRenderGroup={(e) => {
            e.events.forEach((ev) => {
              ev.target.style.cssText += ev.cssText;
            });
          }}
          onDragEnd={(e) => {
            console.log(e, "onDragEnd");
          }}
          onClickGroup={(e) => {
            if (!e.moveableTarget) {
              setSelectedTargets([]);
              return;
            }
            if (e.isDouble) {
              const childs = groupManager.selectSubChilds(
                targets,
                e.moveableTarget
              );

              setSelectedTargets(childs.targets());
              return;
            }
            if (e.isTrusted) {
              selectoRef.current!.clickTarget(e.inputEvent, e.moveableTarget);
            }
          }}
          onClick={(e) => {
            // if (e.isDouble) {
            //   const inputTarget = e.inputTarget as HTMLElement;
            //   const selectableElements =
            //     selectoRef.current!.getSelectableElements();
            //   if (selectableElements.includes(inputTarget)) {
            //     selectoRef.current!.setSelectedTargets([inputTarget]);
            //     setTargets([inputTarget]);
            //   }
            // }
          }}
        />
        <Selecto
          ref={selectoRef}
          dragContainer={"#DashboardRoot"}
          selectableTargets={[".positionDecoratorHandle"]}
          hitRate={0}
          selectByClick={true}
          selectFromInside={false}
          toggleContinueSelect={["shift"]}
          ratio={0}
          onDragStart={(e) => {
            const moveable = moveableRef.current!;
            const target = e.inputEvent.target;
            if (
              moveable.isMoveableElement(target) ||
              targets.some((t: any) => t === target || t.contains(target))
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
        {children}
      </div>
    </DashboardRootContext.Provider>
  );
};

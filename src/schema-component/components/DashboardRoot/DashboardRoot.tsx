import React, {
  HTMLAttributes,
  PropsWithChildren,
  useMemo,
  useRef,
  useState,
} from "react";

import { defaultBreakpoints, sizeFormat } from "./utils";
import { useDesignable, useSchemaComponentContext } from "../../hooks";
import { useFieldSchema } from "@formily/react";

import { useUpdate } from "ahooks";
import { useBreakpoints } from "./hooks";
import { allThemeNameMap } from "../../../dashboard-themes";
import { useDashboardRootStyle } from "./styles";
import Selecto from "react-selecto";
import { DashboardRootContext } from "./context";
import { cn } from "../../../utils";
import Moveable, { MoveableTargetGroupsType } from "react-moveable";
import { diff } from "@egjs/children-differ";

import { useSaveAllFieldSchema } from "../../hooks/useSaveAllFieldSchema";
import { ConfigProvider } from "antd";
import { ThemeCSSVariableProvider } from "../../../css-variable";
import { DashboardSettings } from "./DashboardSettings";

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

  const { designable } = useSchemaComponentContext();

  const [targets, setTargets] = useState<MoveableTargetGroupsType>([]);
  const moveableRef = useRef<Moveable>(null);
  const selectoRef = useRef<Selecto>(null);

  const { saveRemoteFieldSchema, saveLocalFieldState } =
    useSaveAllFieldSchema();
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

  const fieldSchema = useFieldSchema();

  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });

  return (
    <ConfigProvider
      theme={{
        token: {
          ...themeToken,
          ...themeDarkOrLightToken,
        },
      }}
    >
      <ThemeCSSVariableProvider>
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
            rootFieldSchema: fieldSchema,
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
            {designable && <DashboardSettings />}
            {designable && (
              <>
                <Moveable
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
                  target={targets}
                  throttleDrag={1}
                  edgeDraggable={false}
                  startDragRotate={0}
                  throttleDragRotate={0}
                  keepRatio={false}
                  throttleScale={0}
                  renderDirections={[
                    "nw",
                    "n",
                    "ne",
                    "w",
                    "e",
                    "sw",
                    "s",
                    "se",
                  ]}
                  throttleRotate={0}
                  rotationPosition={"top"}
                  isDisplayGridGuidelines
                  bounds={{
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    position: "css",
                    ...bounds,
                  }}
                  isDisplayInnerSnapDigit={false}
                  snappable={true}
                  // snapContainer={"#DashboardRoot"}
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
                  elementGuidelines={[
                    ".positionDecoratorHandle",
                    ".nodeContentRenderer",
                  ]}
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
                      // const rect = e.moveable.getRect();
                      // console.log(rect, "onResizeEnd");
                    });
                  }}
                  onRender={(e) => {
                    e.target.style.transform = e.transform;
                  }}
                  onDragStart={(e) => {
                    const parentNode = e.target.parentElement;
                    const rect = parentNode?.getBoundingClientRect();
                    const {
                      left,
                      top,
                      width: rectWidth,
                      height: rectHeight,
                    } = rect;
                    if (rect) {
                      setBounds({
                        left: left,
                        top: top - 50,
                        right: width - left - rectWidth,
                        bottom: height - top - rectHeight + 50,
                      });
                    }
                  }}
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
                  onClickGroup={(e) => {
                    selectoRef.current!.clickTarget(
                      e.inputEvent,
                      e.inputTarget
                    );
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
                      address: eid,
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
                      saveLocalFieldState({
                        address: eid,
                        schema: {
                          "x-decorator-props": {
                            x: sizeFormat(left / colWidth),
                            y: sizeFormat(top / rowHeight),
                          },
                        },
                      });
                    });
                    saveRemoteFieldSchema();
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
                      targets.some(
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
            )}

            {children}
          </div>
        </DashboardRootContext.Provider>
      </ThemeCSSVariableProvider>
    </ConfigProvider>
  );
};

import React, {
  Fragment,
  HTMLAttributes,
  PropsWithChildren,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { defaultBreakpoints, flexible } from "../utils";
import { useSchemaComponentContext } from "../../../hooks";
import {
  RecursionField,
  observer,
  useField,
  useFieldSchema,
} from "@formily/react";
import { useBreakpoints, useRowProperties } from "../hooks";
import { allThemeNameMap } from "../../../../dashboard-themes";
import { useDashboardRootStyle, useScrollBarStyle } from "../styles";

import { DashboardRootContext, DesignPageConext } from "../context";

import { ConfigProvider, theme } from "antd";
import { ThemeCSSVariableProvider } from "../../../../css-variable";

import { MoveableManage } from "./MoveableManage";
import { uid } from "@formily/shared";
import { css } from "@emotion/css";
import { DesignPageHeader } from "./DesignPageHeader";

import { SchemaComponentSetting } from "./SchemaComponentSetting";
import {
  ContentMenu,
  ElementsType,
  SidebarBtnElementDragOverlay,
} from "./ContentMenu";
import {
  Active,
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useDndMonitor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useInsertSchemaComponent } from "../../../hooks/useSaveAllFieldSchema";

import Selecto from "react-selecto";
import { Selectable } from "./Selectable";
import Moveable from "react-moveable";
import { CanvasSetting } from "./CanvasSetting";
import { cn, rs, sizeFormat } from "@/utils";
import { fontStyle } from "./style";

const viewWidth = 3840;
const viewHeight = 2160;

export const MemorizedRecursionField = memo(RecursionField);
MemorizedRecursionField.displayName = "MemorizedRecursionField";

export interface DashboardRootProps
  extends PropsWithChildren,
    HTMLAttributes<any> {
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

const DashboardRootMain = observer(
  ({ children, ...props }: DashboardRootProps) => {
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
    const mousePosition = useRef({
      clientX: 0,
      clientY: 0,
    });
    const selectoRef = useRef<Selecto>(null);
    const moveableRef = useRef<Moveable>(null);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const [designZoom, setDesignZoom] = useState(1);
    const { designable, formId } = useSchemaComponentContext();
    const { breakpoint, width, height, ref } = useBreakpoints(breakpoints, 800);
    const isPc = breakpoint === "desktop" || breakpoint === "showroom";
    const rowHeight = sizeFormat(height / rows);
    const colWidth = cols && width ? sizeFormat(width / cols) : 0;

    // const scale = useMemo(() => {
    //   let scale = 1;
    //   if (!width || !height) {
    //     return scale;
    //   }

    //   if (width / height < designWidth / designHeight) {
    //     scale = width / designWidth;
    //   } else {
    //     scale = height / designHeight;
    //   }
    //   if (scale < 0.2) {
    //     return 0.2;
    //   }
    //   if (scale > 1.2) {
    //     return 1.2;
    //   }
    //   return scale;
    // }, [designWidth, designHeight, width, height]);
    const themeConfig = allThemeNameMap[themeProvider] || {};
    const themeToken = themeConfig?.token || {};

    const themeDarkOrLightToken = themeConfig?.[isDarkTheme ? "dark" : "light"];

    const rootStyle = useDashboardRootStyle({
      themeProvider,
      isDarkTheme,
    });

    const fieldSchema = useFieldSchema();

    const blockItems = useRowProperties();

    const RenderBlockItems = useMemo(() => {
      return (
        <>
          {blockItems.map((schema) => {
            return (
              <MemorizedRecursionField
                key={schema.name}
                name={schema.name}
                schema={schema}
              />
            );
          })}
        </>
      );
    }, [blockItems?.length]);

    const handleViewPortFit = () => {
      if (!scrollAreaRef.current) {
        return;
      }
      const { width, height } = document
        .getElementById("viewPort")!
        .getBoundingClientRect();

      scrollAreaRef.current.scrollLeft = (viewWidth - width) / 2;

      scrollAreaRef.current.scrollTop = (viewHeight - height) / 2;
    };

    const field = useField();
    const { insertSchemaComponent } = useInsertSchemaComponent();
    const droppable = useDroppable({
      id: "designer-drop-area",

      data: {
        address: field.address.toString(),
        isDesignerDropArea: true,
      },
    });

    useDndMonitor({
      onDragStart(event) {},
      onDragMove: () => {
        const SidebarBtnElementDragOverlay = document.getElementById(
          "SidebarBtnElementDragOverlay"
        );
        if (!SidebarBtnElementDragOverlay) {
          return false;
        }
        const { left, top } =
          SidebarBtnElementDragOverlay.getBoundingClientRect();

        mousePosition.current.clientX = left;
        mousePosition.current.clientY = top;
      },
      onDragEnd: ({ over, active }) => {
        const activeData = active.data.current;

        if (
          !activeData ||
          !activeData.type ||
          !activeData.isDesignerBtnElement
        ) {
          return false;
        }

        setTimeout(() => {
          const overData = over.data.current;
          const clientX = mousePosition.current.clientX;
          const clientY = mousePosition.current.clientY;

          const x = sizeFormat(
            (clientX - over.rect.left) / colWidth / designZoom
          );

          const y = sizeFormat(
            (clientY - over.rect.top) / rowHeight / designZoom
          );
          const maxZIndex = fieldSchema.reduceProperties((memo, cur) => {
            const curZIndex = cur["x-decorator-props"].zIndex || 0;
            if (curZIndex > memo) {
              memo = cur["x-decorator-props"].zIndex;
            }
            return memo;
          }, 0);
          const zIndex = maxZIndex + 1;

          // debugger;

          insertSchemaComponent({
            address: overData.address,
            type: activeData.type,
            position: {
              x,
              y,
              zIndex,
            },
          });
        }, 100);
      },
    });

    useEffect(() => {
      handleViewPortFit();
    }, [designZoom]);

    useEffect(() => {
      if (isPc) {
        flexible(designWidth);
      } else if (breakpoint === "mobile") {
        flexible(750);
      } else if (breakpoint === "tablet") {
        flexible(1300);
      }
    }, [designWidth, isPc]);
    return (
      <DesignPageConext.Provider
        value={{
          designZoom,
          setDesignZoom,
        }}
      >
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
            token: {
              isDarkTheme,
              themeProvider,
              themeAssetsPath: `${themeProvider}-${
                isDarkTheme ? "dark" : "light"
              }`,
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
                scale: designZoom,
                rootFieldSchema: fieldSchema,
                mobileRowHeight,
              }}
            >
              <div
                className={cn(
                  css`
                    width: 100vw;
                    height: 100vh;
                  `
                )}
              >
                <DesignPageHeader />
                <div
                  className={css`
                    height: calc(100vh - 50px);
                    width: calc(100vw);
                    position: relative;
                    display: flex;
                    overflow: hidden;
                  `}
                >
                  <div
                    className={css`
                      height: 100%;
                      width: 330px;
                      position: relative;
                      overflow: hidden;
                    `}
                  >
                    <ContentMenu />
                  </div>

                  <div
                    id="viewPort"
                    className={css`
                      height: calc(100%);
                      width: calc(100% - 630px);
                      position: relative;
                      overflow: hidden;
                      background-color: #18181c;
                      background-image: linear-gradient(
                          #18181c 14px,
                          transparent 0
                        ),
                        linear-gradient(90deg, transparent 14px, #86909c 0);
                      background-size: 15px 15px, 15px 15px;
                    `}
                  >
                    {/* 画布滚动容器 */}
                    <div
                      onScroll={(e: any) => {
                        console.log(
                          e,
                          e.target.scrollTop,
                          e.target.scrollLeft,
                          "see"
                        );
                      }}
                      ref={scrollAreaRef}
                      className={css`
                        user-select: none;
                        height: calc(100% - 40px);
                        width: 100%;
                        position: relative;
                        overflow: auto;
                        scrollbar-color: rgba(144, 146, 152, 0.3) transparent;
                        scrollbar-width: thin;
                      `}
                    >
                      {/* 最大的画布 */}
                      <div
                        className={css`
                          position: absolute;
                          top: 0;
                          left: 0;
                          width: ${viewWidth}px;
                          height: ${viewHeight}px;
                        `}
                      >
                        {width && designable && (
                          <Selectable
                            moveableRef={moveableRef}
                            selectoRef={selectoRef}
                            key={`Selectable-${blockItems?.length}-${designZoom}`}
                          />
                        )}

                        {/* 居中定位 */}
                        <div
                          className={css`
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform-origin: 50% 50%;
                            transform: translateX(-50%) translateY(-50%);
                          `}
                        >
                          <div
                            className={css`
                              pointer-events: auto;
                              list-style: none;
                            `}
                          >
                            <div
                              className={css`
                                overflow: hidden;
                                box-shadow: 0 8px 10px #1e1e1e1f;
                                width: ${designWidth * designZoom}px;
                                height: ${designHeight * designZoom}px;
                                opacity: ${droppable.isOver ? 0.6 : 1};
                              `}
                            >
                              <div
                                id="DashboardRootWrap"
                                ref={droppable.setNodeRef}
                                className={css`
                                  width: ${designWidth}px;
                                  height: ${designHeight}px;
                                  transform: scale(${designZoom});
                                  border-color: #373739;
                                  transition: all 0.4s;
                                  position: relative;
                                  transform-origin: left top;
                                  background-size: cover;
                                  overflow: hidden;
                                `}
                              >
                                {/* droppable area */}
                                <div
                                  className={css`
                                    width: ${designWidth}px;
                                    height: ${designHeight}px;
                                  `}
                                >
                                  <div
                                    // {...otherProps}
                                    key={formId}
                                    id="DashboardRoot"
                                    ref={ref}
                                    className={cn(
                                      fontStyle,
                                      css`
                                        background-size: cover;
                                        background-position: center;
                                        background-repeat: no-repeat;
                                        font-size: 0.14rem;
                                        line-height: 1;
                                        color: #ccc;
                                        width: 100%;
                                        height: 100%;
                                        position: relative;
                                      `,
                                      rootStyle.styles,
                                      className,
                                      themeProvider
                                    )}
                                    style={{
                                      ...style,
                                    }}
                                  >
                                    {width ? RenderBlockItems : null}
                                  </div>
                                </div>
                              </div>
                              {width && designable && (
                                <MoveableManage
                                  moveableRef={moveableRef}
                                  selectoRef={selectoRef}
                                  key={`MoveableManage-${blockItems?.length}-${designZoom}`}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CanvasSetting />
                  </div>
                  {/* 右边 */}
                  <div
                    className={css`
                      height: 100%;
                      width: 300px;
                      position: relative;
                      overflow: hidden;
                    `}
                  >
                    <SchemaComponentSetting />
                  </div>
                </div>
              </div>
            </DashboardRootContext.Provider>
          </ThemeCSSVariableProvider>
        </ConfigProvider>
      </DesignPageConext.Provider>
    );
  }
);

export function DashboardRoot(props: DashboardRootProps) {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // 10px
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <DndContext sensors={sensors}>
      <DashboardRootMain {...props} />
      <DragOverlayWrapper />
    </DndContext>
  );
}

function DragOverlayWrapper() {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);
  useDndMonitor({
    onDragStart(event) {
      setDraggedItem(event.active);
    },
    onDragCancel(event) {
      setDraggedItem(null);
    },
    onDragEnd() {
      setDraggedItem(null);
    },
  });
  if (!draggedItem) {
    return null;
  }
  let node = <div>No drag overlay</div>;
  const isDesignerBtnElement = draggedItem?.data?.current?.isDesignerBtnElement;
  if (isDesignerBtnElement) {
    const type = draggedItem?.data?.current?.type as ElementsType;
    node = (
      <SidebarBtnElementDragOverlay
        elementType={type}
        {...draggedItem?.data?.current}
      />
    );
  }
  return (
    <DragOverlay
      className={css`
        width: 178px;
        height: 102px;
      `}
    >
      {node}
    </DragOverlay>
  );
}

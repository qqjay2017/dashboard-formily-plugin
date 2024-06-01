import React, { HTMLAttributes, PropsWithChildren, useMemo } from "react";
import { defaultBreakpoints, sizeFormat } from "./utils";
import { useSchemaComponentContext } from "../../hooks";
import { useFieldSchema } from "@formily/react";
import { useUpdate } from "ahooks";
import { useBreakpoints } from "./hooks";
import { allThemeNameMap } from "../../../dashboard-themes";
import { useDashboardRootStyle } from "./styles";
import Selecto from "react-selecto";
import { DashboardRootContext } from "./context";
import { cn } from "../../../utils";
import Moveable from "react-moveable";
import { diff } from "@egjs/children-differ";
5;
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
  const [targets, setTargets] = React.useState<Array<SVGElement | HTMLElement>>(
    []
  );
  const moveableRef = React.useRef<Moveable>(null);
  const selectoRef = React.useRef<Selecto>(null);
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
          target={targets}
          onClickGroup={(e) => {
            selectoRef.current!.clickTarget(e.inputEvent, e.inputTarget);
          }}
          onDrag={(e) => {
            e.target.style.transform = e.transform;
          }}
          onDragGroup={(e) => {
            e.events.forEach((ev) => {
              ev.target.style.transform = ev.transform;
            });
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
              targets.some((t) => t === target || t.contains(target))
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

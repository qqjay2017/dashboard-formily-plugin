import { PropsWithChildren, memo, useMemo, useRef } from "react";

import { useField } from "@formily/react";
import { createStyles } from "antd-style";
import { PositionDecoratorOptions } from "./types";

import { sizeFormat } from "../DashboardRoot/utils";
import { cn, eidToElementId } from "../../../utils";

import { useDashboardRoot } from "../DashboardRoot";

import { selectedTargetsStore } from "../DashboardRoot/selectedTargetsStore";
import { observer } from "@formily/reactive-react";
import { PositionContextMenu } from "./ContextMenu";
import { useSchemaComponentContext } from "../../hooks";
const useRndStyle = createStyles(
  ({ css }, { toolbarActive }: { toolbarActive?: boolean }) => {
    return css``;
  }
);
// TODO 编辑++
export const PositionDecoratorHandle = memo(
  (props: PropsWithChildren<PositionDecoratorOptions>) => {
    //   const { patch } = useDesignable();
    const {
      children,
      x = 0,
      y = 0,
      w = 0,
      h = 0,
      zIndex = 2,
      style,
      padding = 12,
      className,
      elementId,
      isSelected,
    } = props;

    const targetRef = useRef<HTMLDivElement>(null);
    // const colWidth = 10;
    // const rowHeight = 10;

    // const rootCtx = useContext(DashboardRootContext);

    const { colWidth, rowHeight } = useDashboardRoot();

    const width = sizeFormat(colWidth * w);
    const height = sizeFormat(rowHeight * h);
    const rndStyle = useRndStyle({
      toolbarActive: false,
    });

    const styleMemo = useMemo(() => {
      const s: React.CSSProperties = {
        ...style,
      };
      if (zIndex) {
        s.zIndex = zIndex;
      }
      if (padding) {
        s.padding = Array.isArray(padding)
          ? padding.map((p) => (p || 0) + "px").join(" ")
          : padding;
      }

      return s;
    }, [padding, style, zIndex]);

    return (
      <div
        ref={targetRef}
        id={elementId}
        className={cn("positionDecoratorHandle", rndStyle.styles, className)}
        style={{
          position: "absolute",
          width,
          height,
          zIndex,
          padding: styleMemo.padding,
          left: 0,
          top: 0,
          transform: `translate( ${sizeFormat(x * colWidth)}px,  ${sizeFormat(
            y * rowHeight
          )}px )`,
        }}
      >
        {isSelected && <PositionContextMenu />}
        {children}
      </div>
    );
  }
);

export const PositionDecorator = observer(
  (props: PropsWithChildren<PositionDecoratorOptions>) => {
    const { designable } = useSchemaComponentContext();
    const selectedTargets: any[] = selectedTargetsStore.value;
    const field = useField();

    const eid = field.address.toString();
    const elementId = eidToElementId(eid);
    console.log(elementId, "elementId");

    const isSelected = selectedTargets.find(
      (target) => target.id === elementId
    );

    return (
      <PositionDecoratorHandle
        {...props}
        elementId={elementId}
        isSelected={!!isSelected && designable}
      />
    );
  }
);

import {
  type PropsWithChildren,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { globalThisPolyfill } from "@formily/shared";
import { css, cx } from "@emotion/css";
import { useExpressionScope } from "@formily/react";
import { useTree, useTreeNode, useTreeRootProps, useViewport } from "../hooks";
import { AuxToolWidget } from "../widgets";
import type { Viewport as ViewportType } from "@/designable/core";
import { cn } from "@/utils";
import { requestIdle } from "@/designable/shared";
import { useSchemaOptionsContext } from "@/schema-component";

export interface IViewportProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "placeholder">,
    PropsWithChildren {
  placeholder?: React.ReactNode;
  dragTipsDirection?: "left" | "right";
}

export const Viewport: React.FC<IViewportProps> = ({
  children,
  placeholder,
  dragTipsDirection,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);

  const viewport = useViewport();
  const ref = useRef<HTMLDivElement>();
  const viewportRef = useRef<ViewportType>();
  const isFrameRef = useRef(false);
  const { designWidth = 0, designHeight = 0 } = useTreeRootProps();

  useLayoutEffect(() => {
    const frameElement = ref.current.querySelector("iframe");
    if (!viewport) return;
    if (viewportRef.current && viewportRef.current !== viewport) {
      viewportRef.current.onUnmount();
    }
    if (frameElement) {
      //
    } else {
      viewport.onMount(ref.current, globalThisPolyfill);
      requestIdle(() => {
        isFrameRef.current = false;
        setLoaded(true);
      });
    }
    viewportRef.current = viewport;
    return () => {
      viewport.onUnmount();
    };
  }, [viewport]);

  return (
    <div
      {...props}
      className={cx(
        "dn-viewport",
        props.className,
        css`
          width: ${designWidth}px;
          height: ${designHeight}px;
        `
      )}
      ref={ref}
      style={{
        opacity: !loaded ? 0 : 1,
        overflow: "hidden",
        ...props.style,
      }}
    >
      {children}
      <AuxToolWidget />
    </div>
  );
};

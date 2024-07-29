import React, { useEffect, useRef, useState } from "react";
import { Button } from "antd";
import { observer } from "@formily/reactive-react";
import { css } from "@emotion/css";
import { useHover, useSelection } from "../../hooks";

import { NodeTitleWidget } from "../NodeTitleWidget";
import { IconWidget } from "../IconWidget";
import type { TreeNode } from "@/designable/core";
import { cn } from "@/utils";

function useMouseHover<T extends { current: HTMLElement }>(
  ref: T,
  enter?: () => void,
  leave?: () => void
) {
  useEffect(() => {
    let timer = null;
    let unmounted = false;
    const onMouseOver = (e: MouseEvent) => {
      const target: HTMLElement = e.target as any;
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (unmounted) return;
        if (ref?.current?.contains(target)) {
          enter && enter();
        } else {
          leave && leave();
        }
      }, 100);
    };

    document.addEventListener("mouseover", onMouseOver);
    return () => {
      unmounted = true;
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, []);
}

export interface ISelectorProps {
  node: TreeNode;
  style?: React.CSSProperties;
}
const prefix = "aux-selector";
export const Selector: React.FC<ISelectorProps> = observer(({ node }) => {
  const hover = useHover();
  // const [expand, setExpand] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  // const selection = useSelection();

  // const renderIcon = (node: TreeNode) => {
  //   // const icon = node.designerProps.icon;
  //   // if (icon) {
  //   //   return <IconWidget infer={icon} />;
  //   // }
  //   if (node === node.root) {
  //     return <IconWidget infer="Page" size={14} />;
  //   } else if (node.designerProps?.droppable) {
  //     return <IconWidget infer="Container" size={14} />;
  //   }
  //   return <IconWidget infer="Component" size={14} />;
  // };

  // const renderMenu = () => {
  //   const parents = node.getParents();
  //   return (
  //     <div
  //       className={cn(
  //         `${prefix}-menu`,
  //         css`
  //           margin-top: -4px;
  //           animation: dn-animate-slide-to-top 0.2s;
  //           opacity: 0.8;
  //           @keyframes dn-animate-slide-to-top {
  //             from {
  //               transform: translateY(-10%);
  //               opacity: 0;
  //             }

  //             to {
  //               transform: translateY(0);
  //               opacity: 0.8;
  //             }
  //           }
  //         `
  //       )}
  //       style={{
  //         position: "absolute",
  //         top: "100%",
  //         left: 0,
  //       }}
  //     >
  //       {parents.slice(0, 4).map((parent) => {
  //         return (
  //           <Button
  //             className={css`
  //               font-size: 12px !important;
  //               display: flex;
  //               align-items: center;
  //               padding: 0 3px;
  //               height: 20px;
  //               margin-top: 2px;
  //             `}
  //             key={parent.id}
  //             type="primary"
  //             onClick={() => {
  //               selection.select(parent.id);
  //             }}
  //             onMouseEnter={() => {
  //               hover.setHover(parent);
  //             }}
  //           >
  //             <NodeTitleWidget node={parent} />
  //           </Button>
  //         );
  //       })}
  //     </div>
  //   );
  // };

  // useMouseHover(
  //   ref,
  //   () => {
  //     setExpand(true);
  //   },
  //   () => {
  //     setExpand(false);
  //   }
  // );

  return (
    <div ref={ref} className={prefix}>
      <Button
        className={`${prefix}-title`}
        type="primary"
        onMouseEnter={() => {
          hover.setHover(node);
        }}
      >
        <span>
          <NodeTitleWidget node={node} />
        </span>
      </Button>
      {/* {expand && renderMenu()} */}
    </div>
  );
});

Selector.displayName = "Selector";

import React, { Fragment, useContext, useRef } from "react";

import { injectGlobal } from "@emotion/css";
import { DesignerLayoutContext } from "../context";
import type { IDesignerLayoutProps } from "../types";

injectGlobal`
  :root {
    //品牌色
  --dn-brand-color: rgba(24, 144, 255, 1);
  --dn-brand-hovering: rgba(64, 169, 255, 1);
  --dn-brand-dragging: rgba(24, 144, 255, 0.26);
  --dn-brand-dropping: rgba(24, 144, 255, 0.34);
  --dn-brand-moving: rgba(24, 144, 255, 0.5);
  //白色调色版
  --dn-white: #fff;
  --dn-white-gray: #d9d9d9;
  --dn-white-gray-light: #eee;
  --dn-white-gray-lighter: #f0f0f0;
  --dn-white-gray-dark: #aaa;
  //灰色调色板
  --dn-gray: #333;
  --dn-gray-light: #444;
  --dn-gray-lighter: #666;
  --dn-gray-dark: #222;
  --dn-black: #1a1a1a;
   --dn-aux-cover-rect-dragging-color: var(--dn-brand-dragging);
  --dn-aux-cover-rect-dropping-color: var(--dn-brand-dropping);
  --dn-aux-free-selection-background-color: var(--dn-brand-color);
  --dn-aux-free-selection-border-color: var(--dn-brand-color);
  --dn-aux-insertion-color: var(--dn-brand-color);
  --dn-aux-dashed-box-color: var(--dn-brand-color);
  --dn-aux-dashed-box-title-color: var(--dn-gray);
  --dn-aux-selection-box-border-color: var(--dn-brand-color);
  --dn-aux-selection-box-color: var(--dn-gray);
  --dn-ghost-color: var(--dn-white);
  --dn-ghost-bg-color: var(--dn-brand-moving);
  --dn-outline-tree-bg-color: var(--dn-white);
  --dn-outline-tree-header-border-color: var(--dn-white-gray-light);
  --dn-outline-tree-color: var(--dn-gray);
  --dn-outline-tree-insertion-bg-color: var(--dn-brand-color);
  --dn-outline-tree-node-header-color: var(--dn-gray);
  --dn-outline-tree-node-hover-color: var(--dn-brand-color);

  --dn-toolbar-input-color: var(--dn-gray-dark);
  --dn-toolbar-input-bg-color: var(--dn-white);
  --dn-toolbar-input-border-color: var(--dn-white-gray-light);
  --dn-toolbar-input-hover-border-color: var(--dn-white-gray-light);
  --dn-toolbar-input-handler-bg-color: var(--dn-white);

  --dn-resize-handle-bg-color: var(--dn-white-gray-light);
  --dn-resize-handle-hover-bg-color: var(--dn-white-gray-lighter);
  --dn-resize-handle-color: var(--dn-gray-light);
  --dn-resize-handle-hover-color: var(--dn-white-lighter);

  --dn-mobile-simulator-bg-color: var(--dn-white-gray-light);
  --dn-mobile-simulator-body-bg-color: var(--dn-white);
  --dn-mobile-simulator-border-color: var(--dn-gray-dark);
  --dn-responsive-simulator-bg-color: var(--dn-white);
  --dn-pc-simulator-bg-color: var(--dn-white);

  --dn-aux-selector-btn-color: var(--dn-white);
  --dn-aux-selector-btn-bg-color: var(--dn-brand-color);
  --dn-aux-selector-btn-border-color: var(--dn-brand-color);
  --dn-aux-selector-btn-hover-color: var(--dn-white);
  --dn-aux-selector-btn-hover-bg-color: var(--dn-brand-hovering);
  --dn-aux-selector-btn-hover-border-color: var(--dn-brand-hovering);
  --dn-aux-selector-btn-active-color: var(--dn-white);
  --dn-aux-selector-btn-active-bg-color: var(--dn-brand-hovering);
  --dn-aux-selector-btn-active-border-color: var(--dn-brand-hovering);

  --dn-panel-border-color: var(--dn-white-gray);
  --dn-panel-active-bg-color: var(--dn-white-gray-light);
  --dn-resource-content-bg-color: var(--dn-white);

  --dn-composite-panel-tabs-bg-color: var(--dn-white);
  --dn-composite-panel-tabs-active-bg-color: var(--dn-white);
  --dn-composite-panel-highlight-bg-color: var(--dn-white-gray-light);
  --dn-composite-panel-tabs-color: var(--dn-gray-lighter);
  --dn-composite-panel-tabs-hover-color: var(--dn-brand-color);
  --dn-composite-panel-tabs-content-bg-color: var(--dn-white);
  --dn-composite-panel-tabs-header-color: var(--dn-gray-lighter);

  --dn-collapse-header-color: var(--dn-gray);

  --dn-resource-item-color: var(--dn-gray);
  --dn-resource-item-hover-border-color: var(--dn-brand-color);
  --dn-resource-item-hover-color: var(--dn-brand-color);

  --dn-main-panel-header-bg-color: var(--dn-white);
  --dn-workspace-panel-bg-color: var(--dn-white-gray-light);

  --dn-scrollbar-color: var(--dn-white-gray);
  --dn-scrollbar-hover-color: var(--white-dn-gray-lighter);

  --dn-empty-bg-color: var(--dn-white);

  --dn-droppable-bg-color: var(--dn-white-gray-lighter);
  --dn-droppable-border-color: var(--dn-white-gray-dark);
  --dn-droppable-color: var(--dn-gray-lighter);
  }
`;

export const Layout: React.FC<IDesignerLayoutProps> = (props) => {
  const layout = useContext(DesignerLayoutContext);
  const ref = useRef<HTMLDivElement>();

  if (layout) {
    return <Fragment>{props.children}</Fragment>;
  }
  return (
    <div ref={ref}>
      <DesignerLayoutContext.Provider
        value={{
          theme: props.theme,
          prefixCls: props.prefixCls,
          position: props.position,
        }}
      >
        {props.children}
      </DesignerLayoutContext.Provider>
    </div>
  );
};

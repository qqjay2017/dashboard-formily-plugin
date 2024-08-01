import type { PropsWithChildren, ReactNode } from "react";
import React from "react";

export interface FooterToolbarProps extends PropsWithChildren {
  extra?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  renderContent?: (
    props: FooterToolbarProps & { leftWidth?: string },
    dom: JSX.Element
  ) => ReactNode;
  prefixCls?: string;
  children?: React.ReactNode;
  portalDom?: boolean;
}

export function FooterToolbar(props: FooterToolbarProps) {
  return <div>FooterToolbar</div>;
}

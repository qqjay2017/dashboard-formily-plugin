import type { PropsWithChildren, ReactNode } from "react";
import React, { useContext, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { Button, ConfigProvider } from "antd";
import { css } from "@emotion/css";
import { usePageLayoutContext } from "../PageLayout/usePageLayoutContext";
import BackBtn from "./BackBtn";
import { cn, cx } from "@/utils";

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
  hasBackBtn?: boolean;
}
const baseClassName = `ant-footer-bar`;
export function FooterToolbar(props: FooterToolbarProps) {
  const {
    children,
    className,
    extra,
    portalDom = true,
    style,
    renderContent,
    hasBackBtn = true,
    ...restProps
  } = props;
  const { getTargetContainer } = useContext(ConfigProvider.ConfigContext);

  const value = usePageLayoutContext();

  const width = useMemo(() => {
    const { hasSiderMenu, isMobile, siderWidth } = value;
    if (!hasSiderMenu) {
      return undefined;
    }
    if (!siderWidth) {
      return "100%";
    }
    return isMobile ? "100%" : `calc(100% - ${siderWidth}px)`;
  }, [
    value.menuCollapsed,
    value.hasSiderMenu,
    value.isMobile,
    value.siderWidth,
  ]);
  const containerDom = useMemo(() => {
    return getTargetContainer?.() || document.body;
  }, []);
  const dom = (
    <>
      <div
        className={cx(
          `${baseClassName}-left `.trim(),
          css`
            flex: 1;
            color: rgba(0, 0, 0, 0.88);
          `
        )}
      >
        {extra}
      </div>
      <div
        className={cn(
          `${baseClassName}-right `.trim(),
          css`
            margin-block: 0;
            margin-inline: 0;
            > * {
              margin-inline-end: 8px;
            }
          `
        )}
      >
        {hasBackBtn && <BackBtn />}
        {children}
      </div>
    </>
  );
  useEffect(() => {
    if (!value || !value?.setHasFooterToolbar) {
      return () => {};
    }
    value?.setHasFooterToolbar(true);
    return () => {
      value?.setHasFooterToolbar?.(false);
    };
  }, []);

  const renderDom = (
    <div
      className={cx(
        className,
        baseClassName,
        css`
          position: fixed;
          inset-inline-end: 0;
          bottom: 0;
          z-index: 99;
          display: flex;
          align-items: center;
          padding-inline: 24px;
          padding-block: 0;
          box-sizing: border-box;
          line-height: 64px;
          background-color: rgba(255, 255, 255, 0.6);
          border-block-start: 1px solid rgba(5, 5, 5, 0.06);
          backdrop-filter: blur(8px);
          color: rgba(0, 0, 0, 0.88);
          transition: all 0.2s ease 0s;
        `,
        css`
          width: ${width || "100%"};
        `
      )}
      style={{ width, ...style }}
    >
      {renderContent
        ? renderContent(
            {
              ...props,
              ...value,
              leftWidth: width,
            },
            dom
          )
        : dom}
    </div>
  );
  const footerDom = createPortal(renderDom, containerDom, baseClassName);
  return <>{footerDom}</>;
}

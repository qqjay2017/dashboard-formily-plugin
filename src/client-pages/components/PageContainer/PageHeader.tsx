import { css } from "@emotion/css";
import { Avatar, Space } from "antd";
import type { PropsWithChildren } from "react";
import React from "react";
import { cx } from "@/utils";

export type ContentWidth = "Fluid" | "Fixed";
export interface PageHeaderProps extends PropsWithChildren {
  backIcon?: React.ReactNode;
  prefixCls?: string;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  style?: React.CSSProperties;
  childrenContentStyle?: React.CSSProperties;

  breadcrumbRender?: (
    props: PageHeaderProps,
    defaultDom: React.ReactNode
  ) => React.ReactNode;

  footer?: React.ReactNode;
  extra?: React.ReactNode;

  onBack?: (e?: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  contentWidth?: ContentWidth;
  layout?: string;
  ghost?: boolean;
}

function renderTitle(
  prefixCls: string,
  props: PageHeaderProps,
  hashId: string
) {
  const { title, subTitle, extra, onBack } = props;
  const headingPrefixCls = `${prefixCls}-heading`;
  const hasHeading = title || subTitle || extra;
  // If there is nothing, return a null
  if (!hasHeading) {
    return null;
  }
  //   const backIcon = getBackIcon(props, direction);
  //   const backIconDom = renderBack(prefixCls, hashId, backIcon, onBack);
  const hasTitle = hasHeading;
  return (
    <div
      className={cx(
        `${headingPrefixCls} ${hashId}`,
        css`
          padding-top: 8px;
          margin-top: 8px;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        `
      )}
    >
      {hasTitle && (
        <div
          className={cx(
            `${headingPrefixCls}-left ${hashId}`.trim(),
            css`
              display: flex;
              align-items: center;
              margin-block: 4px;
              margin-inline-end: 0;
              margin-inline-start: 0;
              overflow: hidden;
            `
          )}
        >
          {title && (
            <span
              className={cx(
                `${headingPrefixCls}-title ${hashId}`.trim(),
                css`
                  margin-inline-end: 12px;
                  margin-block-end: 0;
                  color: rgba(0, 0, 0, 0.88);
                  font-weight: 600;
                  font-size: 20px;
                  line-height: 32px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                `
              )}
              title={typeof title === "string" ? title : undefined}
            >
              {title}
            </span>
          )}
          {subTitle && (
            <span
              className={`${headingPrefixCls}-sub-title ${hashId}`.trim()}
              title={typeof subTitle === "string" ? subTitle : undefined}
            >
              {subTitle}
            </span>
          )}
        </div>
      )}
      {extra && (
        <span className={`${headingPrefixCls}-extra ${hashId}`.trim()}>
          <Space>{extra}</Space>
        </span>
      )}
    </div>
  );
}

function renderChildren(
  prefixCls: string,
  children: React.ReactNode,
  hashId: string
) {
  return (
    <div className={`${prefixCls}-content ${hashId}`.trim()}>{children}</div>
  );
}

function PageHeader(props: PageHeaderProps) {
  const { className, style, children } = props;
  const title = renderTitle("", props, "");
  const childDom = children && renderChildren("", children, "");
  return (
    <div className={className} style={style}>
      {title}
      {childDom}
      {/* {footerDom} */}
    </div>
  );
}

export default PageHeader;

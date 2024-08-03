import {
  Fragment,
  type PropsWithChildren,
  type ReactNode,
  useContext,
  useMemo,
} from "react";
import { css, cx } from "@emotion/css";
import type { SpinProps } from "antd";
import React from "react";
import type { IPageLayoutContextProps } from "../PageLayout/context";
import { PageLayoutContext } from "../PageLayout/context";
import { usePageLayoutContext } from "../PageLayout/usePageLayoutContext";
import PageLoading from "../PageLoading";
import type { FooterToolbarProps } from "./FooterToolbar";
import { FooterToolbar } from "./FooterToolbar";
import type { PageHeaderProps } from "./PageHeader";
import PageHeader from "./PageHeader";
import { FormDialogPortal } from "@/schema-component/antd";

export type IPageContainerProps = {
  containerClassName?: string;
  style?: React.CSSProperties;
  childrenContentStyle?: React.CSSProperties;
  footer?: ReactNode[];
  footerToolBarProps?: FooterToolbarProps;
  title?: ReactNode | false;
  content?: React.ReactNode;
  extraContent?: React.ReactNode;
  header?: Partial<PageHeaderProps> & {
    children?: React.ReactNode;
  };
  pageHeaderRender?: false | Function;
  children?: ReactNode | undefined;
  hashId?: string;
  withFormDialog?: boolean;
  loading?: boolean | SpinProps | React.ReactNode;
} & Omit<
  PageHeaderProps,
  "title" | "footer" | "breadcrumbRender" | "breadcrumb"
>;

function getLoading(spinProps: boolean | SpinProps) {
  if (typeof spinProps === "object") {
    return spinProps;
  }
  return {
    spinning: spinProps,
  };
}

function renderPageHeader(
  content: React.ReactNode,
  extraContent: React.ReactNode,
  prefixedClassName: string,
  hashId: string
): React.ReactNode {
  if (!content && !extraContent) {
    return null;
  }
  return (
    <div className={`${prefixedClassName}-detail ${hashId}`.trim()}>
      <div className={`${prefixedClassName}-main ${hashId}`.trim()}>
        <div className={`${prefixedClassName}-row ${hashId}`.trim()}>
          {content && (
            <div className={`${prefixedClassName}-content ${hashId}`.trim()}>
              {content}
            </div>
          )}

          {extraContent && (
            <div
              className={`${prefixedClassName}-extraContent ${hashId}`.trim()}
            >
              {extraContent}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function memoRenderPageHeader(
  props: IPageContainerProps & {
    value: IPageLayoutContextProps;
    hashId: string;
  }
) {
  const {
    title,
    content,
    header,
    extraContent,
    childrenContentStyle,
    style,
    hashId,
    value,
    pageHeaderRender,

    ...restProps
  } = props;

  if (pageHeaderRender === false) {
    return null;
  }
  if (pageHeaderRender) {
    return <> {pageHeaderRender({ ...props, ...value })}</>;
  }
  let pageHeaderTitle = title;
  if (!title && title !== false) {
    pageHeaderTitle = value.title;
  }
  const pageHeaderProps: PageHeaderProps = {
    ...value,
    title: pageHeaderTitle,
    ...restProps,

    ...header,
  };

  const noHasBreadCrumb = true;

  if (
    [
      "title",
      "subTitle",
      "extra",
      "tags",
      "footer",
      "avatar",
      "backIcon",
    ].every((item) => !pageHeaderProps[item as "backIcon"]) &&
    noHasBreadCrumb &&
    !content &&
    !extraContent
  ) {
    return null;
  }

  return (
    <PageHeader
      {...pageHeaderProps}
      className={cx(
        `warp-page-header ${hashId}`.trim(),
        css`
          padding: 8px 24px 16px 24px;
        `
      )}
    >
      {header?.children || renderPageHeader(content, extraContent, "", hashId)}
    </PageHeader>
  );
}

/**
 * 通用页面容器封装
 * @param props
 * @returns
 */

function PageContainer(props: IPageContainerProps) {
  const {
    footer,
    style,
    containerClassName,
    footerToolBarProps,
    children,
    hashId = "",
    loading = false,
    withFormDialog = false,
    ...restProps
  } = props;

  const { hasFooterToolbar } = usePageLayoutContext();

  const value = usePageLayoutContext();

  const pageHeaderDom = memoRenderPageHeader({
    ...restProps,
    ghost: true,
    hashId,
    prefixCls: undefined,
    value,
  });

  const loadingDom = useMemo(() => {
    // 自定义loading
    if (React.isValidElement(loading)) {
      return loading;
    }
    // 手动传递false
    if (typeof loading === "boolean" && !loading) {
      return null;
    }
    const spinProps = getLoading(loading as boolean | SpinProps);
    return spinProps?.spinning ? <PageLoading {...spinProps} /> : null;
  }, [loading]);

  const Wrap = withFormDialog ? FormDialogPortal : Fragment;

  const content = useMemo(() => {
    return (
      <div
        className={css`
          padding: 0 24px ${hasFooterToolbar ? "89px" : "32px"} 24px;
        `}
      >
        {children}
      </div>
    );
  }, [children, hasFooterToolbar]);
  const renderContentDom = useMemo(() => {
    const dom = loadingDom || content;
    return dom;
  }, [loadingDom, content]);

  return (
    <Wrap>
      <div
        style={style}
        className={cx("pageContainerDomWrap", containerClassName)}
      >
        {pageHeaderDom}
        {renderContentDom}
      </div>
      {footer && (
        <FooterToolbar {...footerToolBarProps}>{footer}</FooterToolbar>
      )}
    </Wrap>
  );
}
export default PageContainer;

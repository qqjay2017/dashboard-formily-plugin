import { type PropsWithChildren, type ReactNode, useContext } from "react";
import { css, cx } from "@emotion/css";
import { PageLayoutContext } from "../PageLayout/context";
import type { FooterToolbarProps } from "./FooterToolbar";
import { FooterToolbar } from "./FooterToolbar";
import type { PageHeaderProps } from "./PageHeader";
import PageHeader from "./PageHeader";

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
} & Omit<
  PageHeaderProps,
  "title" | "footer" | "breadcrumbRender" | "breadcrumb"
>;

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
    value: any;
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

function PageContainer(props: IPageContainerProps) {
  const {
    footer,
    style,
    containerClassName,
    footerToolBarProps,
    children,
    hashId = "",

    ...restProps
  } = props;
  const value = useContext(PageLayoutContext) || {};
  const pageHeaderDom = memoRenderPageHeader({
    ...restProps,
    ghost: true,
    hashId,
    prefixCls: undefined,
    value,
  });
  return (
    <>
      <div style={style} className={containerClassName}>
        {pageHeaderDom}
        {children}
      </div>
      {footer && (
        <FooterToolbar {...footerToolBarProps}>{footer}</FooterToolbar>
      )}
    </>
  );
}
export default PageContainer;

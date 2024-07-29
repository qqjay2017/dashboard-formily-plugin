import { css } from "@emotion/css";
import type { PropsWithChildren } from "react";
import { cn, cx } from "@/utils";

interface IStudioPanelProps extends PropsWithChildren {
  style?: React.CSSProperties;
  className?: string;
  logo?: React.ReactNode;
  actions?: React.ReactNode;
  prefixCls?: string;
  theme?: string;
  position?: any;
}

const mainPanelStyle = css`
  display: flex;
  width: 100%;
  height: 100%;
  flex: 1;
  min-height: 0;
  position: relative;
  overflow: hidden;
`;
const prefix = "main-panel";
export function StudioPanel({
  children,
  logo,
  actions,
  className,
}: IStudioPanelProps) {
  if (logo || actions) {
    return (
      <div
        className={cx(
          `${prefix}-container`,
          className,
          css`
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          `
        )}
      >
        <div
          className={cn(
            `${prefix}-header`,
            css`
              display: flex;
              align-items: center;
              flex-grow: 0;
              flex-shrink: 0;
              justify-content: space-between;
              background: var(--dn-main-panel-header-bg-color);
              border-bottom: 1px solid var(--dn-panel-border-color);
              padding: 4px;
            `
          )}
        >
          <div
            className={cn(
              `${prefix}-header-logo`,
              css`
                display: flex;
                align-items: center;
              `
            )}
          >
            {logo}
          </div>
          <div
            className={cn(
              `${prefix}-header-actions`,
              css`
                display: flex;
                align-items: center;
                justify-content: flex-end;
              `
            )}
          >
            {actions}
          </div>
        </div>
        <div className={cn(prefix, mainPanelStyle)}>{children}</div>
      </div>
    );
  }
  return (
    <div className={cn(prefix, mainPanelStyle)}>
      {children}
      <div
        className={css`
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        `}
      >
        <div
          className={css`
            display: flex;
            width: 100%;
            height: 100%;
            flex: 1;
            min-height: 0;
            position: relative;
            overflow: hidden;
          `}
        ></div>
      </div>
    </div>
  );
}

import type { PropsWithChildren } from "react";
import React, { useEffect, useState } from "react";
import { observer } from "@formily/reactive-react";
import cls from "classnames";
import { css } from "@emotion/css";
import { IconWidget, TextWidget } from "../widgets";
import { useWorkbench } from "../hooks";
import { requestIdle } from "@/designable/shared";
import { cn } from "@/utils";

export interface ISettingPanelProps extends PropsWithChildren {
  title?: React.ReactNode;
  extra?: React.ReactNode;
}

export const SettingsPanel: React.FC<ISettingPanelProps> = observer((props) => {
  const prefix = "settings-panel";
  const workbench = useWorkbench();
  const [innerVisible, setInnerVisible] = useState(true);
  const [pinning, setPinning] = useState(false);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (visible || workbench.type === "DESIGNABLE") {
      if (!innerVisible) {
        requestIdle(() => {
          requestAnimationFrame(() => {
            setInnerVisible(true);
          });
        });
      }
    }
  }, [visible, workbench.type]);
  if (workbench.type !== "DESIGNABLE") {
    if (innerVisible) setInnerVisible(false);
    return null;
  }
  if (!visible) {
    if (innerVisible) setInnerVisible(false);
    return (
      <div
        className={cn(
          `${prefix}-opener`,
          css`
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            z-index: 2;
            background: var(--dn-composite-panel-tabs-content-bg-color);
            border: 1px solid var(--dn-panel-border-color);
            color: var(--dn-composite-panel-tabs-color);
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
            border-radius: 3px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            cursor: pointer;
          `
        )}
        onClick={() => {
          setVisible(true);
        }}
      >
        <IconWidget infer="Setting" size={20} />
      </div>
    );
  }
  return (
    <div
      className={cls(
        prefix,
        { pinning },
        css`
          flex-grow: 0;
          flex-shrink: 0;
          position: relative;
          display: flex;
          flex-direction: column;
          z-index: 2;
          width: 300px;
          background: var(--dn-composite-panel-tabs-content-bg-color);
          border-left: 1px solid var(--dn-panel-border-color);
          height: 100%;
          box-sizing: content-box;
          user-select: none;
        `
      )}
    >
      <div
        className={cn(
          `${prefix}-header`,
          css`
            padding: 14px 7px;
            color: var(--dn-composite-panel-tabs-header-color);
            line-height: 18px;
            font-size: 16px;
            border-bottom: 1px solid var(--dn-panel-border-color);
            display: flex;
            justify-content: space-between;
          `
        )}
      >
        <div
          className={cn(
            `${prefix}-header-title`,
            css`
              font-size: 16px;
            `
          )}
        >
          <TextWidget>{props.title}</TextWidget>
        </div>
        <div
          className={cn(
            `${prefix}-header-actions`,
            css`
              display: flex;
              align-items: center;
              & > * {
                margin-right: 8px;

                &:last-child {
                  margin-right: 0;
                }
              }
            `
          )}
        >
          <div className={`${prefix}-header-extra`}>{props.extra}</div>

          <IconWidget
            infer="Close"
            className={`${prefix}-header-close`}
            onClick={() => {
              setVisible(false);
            }}
          />
        </div>
      </div>
      <div className={`${prefix}-body`}>{innerVisible && props.children}</div>
    </div>
  );
});

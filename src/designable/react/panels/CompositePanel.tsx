import { css, cx } from "@emotion/css";
import React, { useRef } from "react";

import { type PropsWithChildren, useState } from "react";
import { TextWidget } from "../widgets";
import { usePrefix } from "../hooks";
import { cn } from "@/utils";
import IconWidget from "@/designable/react/widgets/IconWidget";
import { designScrollBarStyle } from "@/designable/styles";

export interface ICompositePanelProps extends PropsWithChildren {
  direction?: "left" | "right";
  showNavTitle?: boolean;
  defaultOpen?: boolean;
  defaultPinning?: boolean;
  defaultActiveKey?: number;
  activeKey?: number | string;
  onChange?: (activeKey: number | string) => void;
}
export interface ICompositePanelItemProps extends PropsWithChildren {
  shape?: "tab" | "button" | "link";
  title?: React.ReactNode;
  icon?: React.ReactNode;
  key?: number | string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  extra?: React.ReactNode;
}

function parseItems(
  children: React.ReactNode
): React.PropsWithChildren<ICompositePanelItemProps>[] {
  const items = [];
  React.Children.forEach(children, (child: any, index) => {
    // eslint-disable-next-line ts/no-use-before-define
    if (child?.type === CompositePanel.Item) {
      items.push({ key: child.key ?? index, ...child.props });
    }
  });
  return items;
}

function findItem(
  items: React.PropsWithChildren<ICompositePanelItemProps>[],
  key: string | number
) {
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    if (key === index) return item;
    if (key === item.key) return item;
  }
}

function getDefaultKey(children: React.ReactNode) {
  const items = parseItems(children);
  return items?.[0].key;
}

export const CompositePanel: React.FC<ICompositePanelProps> & {
  Item: React.FC<ICompositePanelItemProps>;
} = ({ children, ...props }: ICompositePanelProps) => {
  const prefix = usePrefix("composite-panel");
  const [activeKey, setActiveKey] = useState<string | number>(
    props.defaultActiveKey ?? getDefaultKey(children)
  );
  const activeKeyRef = useRef(null);
  const [pinning, setPinning] = useState(props.defaultPinning ?? false);
  const [visible, setVisible] = useState(props.defaultOpen ?? true);
  const items = parseItems(children);
  const currentItem = findItem(items, activeKey);
  const content = currentItem?.children;

  activeKeyRef.current = activeKey;

  const renderContent = () => {
    if (!content || !visible) return;
    return (
      <div
        className={cn(
          `${prefix}-tabs-content`,
          {
            pinning,
          },
          css`
            width: 300px;
            border-right: 1px solid var(--dn-panel-border-color);
            background: var(--dn-composite-panel-tabs-content-bg-color);
            display: flex;
            flex-direction: column;
            height: 100%;
            box-sizing: content-box;
          `
        )}
      >
        <div
          className={cn(
            `${prefix}-tabs-header`,
            css`
              padding: 14px 7px;
              color: var(--dn-composite-panel-tabs-header-color);

              font-size: 14px;
              border-bottom: 1px solid var(--dn-panel-border-color);
              display: flex;
              justify-content: space-between;
            `
          )}
        >
          <div
            className={cn(
              `${prefix}-tabs-header-title`,
              css`
                font-size: 20px;
              `
            )}
          >
            <TextWidget>{currentItem.title}</TextWidget>
          </div>
          <div
            className={cn(
              `${prefix}-tabs-header-actions`,
              css`
                display: flex;
                align-items: center;
              `
            )}
          >
            <div
              className={cn(
                `${prefix}-tabs-header-extra`,
                css`
                  margin-right: 8px;
                `
              )}
            >
              {currentItem.extra}
            </div>
            <IconWidget
              infer="Close"
              className={css`
                cursor: pointer;
              `}
              onClick={() => {
                setVisible(false);
              }}
            />
          </div>
        </div>
        <div
          className={cx(
            `${prefix}-tabs-body`,
            designScrollBarStyle,
            css`
              flex-grow: 2;
              flex-shrink: 2;
              overflow: overlay;
              overflow-x: hidden;
              height: 100%;
            `
          )}
        >
          {content}
        </div>
      </div>
    );
  };

  return (
    <div
      className={cx(
        prefix,
        css`
          flex-grow: 0;
          flex-shrink: 0;
          display: flex;
          position: relative;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          z-index: 2;
        `
      )}
    >
      <div
        className={cn(
          `${prefix}-tabs`,
          css`
            display: flex;
            flex-direction: column;
            border-right: 1px solid var(--dn-panel-border-color);
            background-color: var(--dn-composite-panel-tabs-bg-color);
            z-index: 2;
            position: relative;
          `
        )}
      >
        {items.map((item, index) => {
          const takeTab = () => {
            if (item.href) {
              return <a href={item.href}>{item.icon}</a>;
            }
            return (
              <IconWidget
                tooltip={
                  props.showNavTitle
                    ? null
                    : {
                        title: <TextWidget>{item.title}</TextWidget>,
                        placement:
                          props.direction === "right" ? "left" : "right",
                      }
                }
                infer={item.icon}
              />
            );
          };
          const shape = item.shape ?? "tab";
          const Comp = shape === "link" ? "a" : "div";
          return (
            <Comp
              className={cn(
                `${prefix}-tabs-pane`,
                {
                  active: activeKey === item.key,
                },
                css`
                  color: var(--dn-composite-panel-tabs-color);
                  min-height: 48px;
                  min-width: 48px;
                  padding: 10px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  cursor: pointer;
                  position: relative;
                  font-size: 20px;
                  flex-direction: column;
                  &:hover {
                    color: var(--dn-composite-panel-tabs-hover-color);
                  }

                  &.active {
                    color: var(--dn-composite-panel-tabs-hover-color);

                    &::after {
                      position: absolute;
                      top: 0;
                      left: 0;
                      display: block;
                      content: "";
                      width: 3px;
                      height: 100%;
                      background-color: var(
                        --dn-composite-panel-tabs-hover-color
                      );
                    }
                  }
                `
              )}
              key={index}
              href={item.href}
              onClick={(e: any) => {
                if (shape === "tab") {
                  if (activeKey === item.key) {
                    setVisible(!visible);
                  } else {
                    setVisible(true);
                  }
                  if (!props?.activeKey || !props?.onChange)
                    setActiveKey(item.key);
                }
                item.onClick?.(e);
                props.onChange?.(item.key);
              }}
            >
              {takeTab()}
              {props.showNavTitle && item.title ? (
                <div
                  className={cn(
                    `${prefix}-tabs-pane-title`,
                    css`
                      font-size: 10px;
                      margin-top: 6px;
                    `
                  )}
                >
                  <TextWidget>{item.title}</TextWidget>
                </div>
              ) : null}
            </Comp>
          );
        })}
      </div>
      {renderContent()}
    </div>
  );
};

CompositePanel.Item = () => {
  return <React.Fragment />;
};

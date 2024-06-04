import { css } from "@emotion/css";
import { createStyles } from "antd-style";
import { cn } from "../../../utils";
import { useState } from "react";
import { ClassicFrame } from "../../widgets";

import { useDraggable } from "@dnd-kit/core";

export type ElementsType = "ClassicFrame";
const menuItems = [
  {
    id: "1",
    label: "小组件",
  },
  {
    id: "2",
    label: "图表",
  },
  {
    id: "3",
    label: "信息",
  },
  {
    id: "4",
    label: "业务",
  },
];

const subMenuItems0 = [
  {
    id: "0-jcbk",
    label: "基础边框",
    type: "ClassicFrame",
    component: ClassicFrame,
    previewBg: "/assets/schema-component/ClassicFrame/WX20240603-234022@2x.png",
  },
];

type SubMenuItems = (typeof subMenuItems0)[0];

const subMenuItems = {
  0: subMenuItems0,
};

const useContentMenuStyles = createStyles(({ css, token }) => {
  return css`
    transition: all 0.4s;
    background-color: none;
    color: #fff;
    &.menuItemActive {
      background-color: ${token.colorPrimaryActive};
      color: #fff;
    }
  `;
});

export const ContentMenu = () => {
  const [activeMenuItem, setActiveMenuItem] = useState(0);
  const { styles: contentMenuStyles } = useContentMenuStyles();
  return (
    <div
      className={css`
        width: 100%;
        height: 100%;
        background-color: #232324;
        display: flex;
      `}
    >
      <div
        className={css`
          width: 65px;
          height: 100%;
          background-color: #232324;
        `}
      >
        {menuItems.map((menuItem, index) => {
          const isActive = activeMenuItem === index;
          return (
            <div
              key={menuItem.id}
              className={css`
                padding: 14px 4px 0 4px;
              `}
            >
              <div
                onClick={() => {
                  setActiveMenuItem(index);
                }}
                className={cn(
                  css`
                    cursor: pointer;
                    padding: 0;
                    font-size: 14px;
                    line-height: 24px;
                    text-align: center;
                    height: 24px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: #fff;
                    border-radius: 4px;
                  `,
                  contentMenuStyles,
                  "menuItem",
                  isActive ? "menuItemActive" : ""
                )}
              >
                {menuItem.label}
              </div>
            </div>
          );
        })}
      </div>
      <div
        className={css`
          background-color: #18181c;
          width: calc(100% - 65px);
          height: 100%;
          padding: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        {(subMenuItems[activeMenuItem] || []).map(
          (subMenuItem: SubMenuItems) => {
            return (
              <SubMenuItemCom
                key={subMenuItem.id + subMenuItem.type}
                subMenuItem={subMenuItem}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

const SubMenuItemCom = ({ subMenuItem }: { subMenuItem: SubMenuItems }) => {
  const draggable = useDraggable({
    id: `designer-btn-${subMenuItem.type}`,
    data: {
      ...subMenuItem,
      type: subMenuItem.type,
      isDesignerBtnElement: true,
    },
  });

  return (
    <button
      ref={draggable.setNodeRef}
      key={subMenuItem.id}
      className={css`
        reset: all;
        width: 180px;
        height: 140px;
        overflow: hidden;
        border-radius: 6px;
        cursor: grab;
        border: 1px solid rgba(0, 0, 0, 0);
        position: relative;
        margin: 0;
        background-color: #232324;
        touch-action: none;
      `}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <div
        className={css`
          width: 100%;
          height: 24px;
          background-color: #2a2a2b;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2px 15px;
          color: rgba(255, 255, 255, 0.52);
          font-size: 12px;
        `}
      >
        {subMenuItem.label}
      </div>
      <div
        className={css`
          height: calc(100% - 24px);
          width: 100%;
          padding: 6px 0;
          overflow: hidden;
        `}
      >
        <div
          style={{
            backgroundImage: `url( ${subMenuItem.previewBg} )`,
          }}
          className={css`
            background-position: center center;
            background-size: contain;
            background-repeat: no-repeat;
            width: 100%;
            height: 100%;
          `}
        ></div>
      </div>
    </button>
  );
};

export function SidebarBtnElementDragOverlay({
  elementType,
  previewBg,
}: {
  elementType: ElementsType;
  previewBg?: string;
}) {
  return (
    <div id="SidebarBtnElementDragOverlay">
      <img
        className={css`
          width: 178px;
          height: 102px;
        `}
        src={previewBg}
      />
    </div>
  );
}

import { css } from "@emotion/css";
import { createStyles } from "antd-style";
import { cn } from "../../../../utils";
import { memo, useMemo, useState } from "react";

import { useDraggable } from "@dnd-kit/core";

import { SubMenuItems, allSubMenuItems } from "../allMenuItem";
import { useApp } from "@/application";
import { get, set } from "lodash-es";

export type ElementsType = "ClassicFrame" | "Statistic";

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

export const ContentMenu = memo(() => {
  const app = useApp();
  const [activeMenuItem, setActiveMenuItem] = useState(0);
  const [activeMenuItem2, setActiveMenuItem2] = useState(0);

  const { styles: contentMenuStyles } = useContentMenuStyles();
  const allMenuItem = useMemo(() => {
    return Object.keys(app.components)
      .map((componentType) => {
        return app.components[componentType]?.menuItem;
      })
      .filter(Boolean);
  }, [Object.keys(app.components).join(" ")]);

  const menuList = useMemo(() => {
    const keysMap = allMenuItem.reduce((memo, cur) => {
      if (!memo[cur.category1]) {
        memo[cur.category1] = {};
      }
      if (!get(memo, `${cur.category1}.${cur.category2}`)) {
        set(memo, `${cur.category1}.${cur.category2}`, []);
      }
      memo[cur.category1][cur.category2].push({
        ...cur,
      });
      return memo;
    }, {});
    const _menuList: any[] = [];
    Object.keys(keysMap).map((lv1Keys, index) => {
      _menuList.push({
        index,
        label: lv1Keys,
        children: Object.keys(keysMap[lv1Keys]).map((lv2Keys, index) => {
          return {
            index,
            pLabel: lv1Keys,

            label: lv2Keys,
            children: get(keysMap, `${lv1Keys}.${lv2Keys}`, []),
          };
        }),
      });
    });
    return _menuList;
  }, [allMenuItem.length]);

  console.log(menuList, "menuList");

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
        {menuList.map((menuItem, index) => {
          const isActive = activeMenuItem === index;
          return (
            <div
              key={menuItem.label + menuItem.index}
              className={css`
                padding: 6px 8px;
                font-size: 14px;
                line-height: 24px;
              `}
            >
              <div
                onClick={() => {
                  setActiveMenuItem(index);
                  setActiveMenuItem2(0);
                }}
                className={cn(
                  css`
                    cursor: pointer;
                    padding: 0;
                    font-size: 14px;
                    line-height: 30px;
                    text-align: center;
                    height: 30px;
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
          width: 65px;
          height: 100%;
          background-color: #1e1e1f;
        `}
      >
        {(menuList[activeMenuItem]?.children || []).map((menuItem2, index) => {
          const isActive = activeMenuItem2 === index;
          return (
            <div
              key={menuItem2.label}
              className={css`
                height: 30px;
                margin-top: 6px;
                padding: 6px 8px;
              `}
            >
              <div
                onClick={() => {
                  setActiveMenuItem2(index);
                }}
                className={cn(
                  css`
                    cursor: pointer;
                    padding: 0;
                    line-height: 24px;
                    text-align: center;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: #fff;
                    border-radius: 4px;
                  `,
                  css`
                    text-align: center;
                    font-size: 12px;
                    line-height: 30px;
                  `,
                  contentMenuStyles,
                  "menuItem",
                  isActive ? "menuItemActive" : ""
                )}
              >
                {menuItem2.label}
              </div>
            </div>
          );
        })}
      </div>
      <div
        className={css`
          background-color: #18181c;
          width: calc(100% - 130px);
          height: 100%;
          padding: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        {get(
          menuList,
          `[${activeMenuItem}].children[${activeMenuItem2}].children`,
          []
        ).map((subMenuItem: SubMenuItems) => {
          return (
            <SubMenuItemCom
              key={subMenuItem.id + subMenuItem.type}
              subMenuItem={subMenuItem}
            />
          );
        })}
      </div>
    </div>
  );
});

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
        padding: 0;
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
        margin-bottom: 16px;
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

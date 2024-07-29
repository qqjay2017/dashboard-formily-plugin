import React from "react";
import { css } from "@emotion/css";
import type { HeaderMenuItemType } from "../HeaderMenu/types";
import { cx } from "@/utils";
import { useReportShare } from "@/application/hooks";

export function Level2SubMenu({
  subMenuList,
  reportId,
}: {
  subMenuList: HeaderMenuItemType[];
  reportId: string;
}) {
  return (
    <div
      className={css`
        width: 100%;
        height: 100%;
        display: flex;
      `}
    >
      {subMenuList.map((s, index) => {
        return (
          <SubMenuItem
            reportId={reportId}
            key={JSON.stringify(s) + index}
            menu={s}
          />
        );
      })}
    </div>
  );
}
const activeStyle = css`
  color: #64e3ff;
`;
function SubMenuItem({
  menu,
  reportId,
}: {
  menu: HeaderMenuItemType;
  reportId: string;
}) {
  const isActive = reportId && menu.shareURL && reportId === menu.shareURL;
  const { reportShare } = useReportShare();

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        reportShare(menu.shareURL, {
          isHref: true,
        });
      }}
      className={cx(
        css`
          user-select: none;
          height: 100%;
          font-weight: 400;
          font-size: 0.16rem;
          color: rgba(195, 212, 229, 0.4);
          line-height: 0.18rem;
          padding: 4px 0.14rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          &.active,
          &:hover {
            ${activeStyle}
          }
        `,
        isActive && activeStyle
      )}
    >
      {menu.label}
    </div>
  );
}

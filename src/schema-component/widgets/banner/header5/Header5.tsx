import { css } from "@emotion/css";

import { type PropsWithChildren, useMemo } from "react";
import { get } from "lodash-es";
import useResizeObserver from "use-resize-observer";
import { observer } from "@formily/reactive-react";
import { useField } from "@formily/react";
import { GradientTitle } from "../header1/GradientTitle";
import type { HeaderMenuItemType } from "../HeaderMenu/types";

import { HeaderClock } from "./HeaderClock";
import { Level1Menu } from "./Level1Menu";
import { loopMenuList } from "./loopMenuList";
import { Level2SubMenu } from "./Level2SubMenu";
import { useToken } from "@/schema-component/antd/style";
import { rs } from "@/utils";
import {
  useDashboardRoot,
  useDataBindFetch,
  useReportId,
  useStrHandlebars,
} from "@/schema-component";
import type { DataSourceBindType } from "@/schema-component/types";
import type { DnFC } from "@/designable/react";
import { createBehavior, createResource } from "@/designable/core";
import { createFieldSchema } from "@/designable/Field";

interface Header5Props extends PropsWithChildren {
  title?: string;
  subTitle?: string;
  dataSource?: DataSourceBindType;
}

export const Header5: DnFC<Header5Props> = (props) => {
  const field = useField();

  const { title, dataSource, subTitle } = props;
  const { reportId } = useReportId();
  const { isPc } = useDashboardRoot();

  const { token } = useToken();

  const bgSrc = rs(
    `/assets/schema-component/header5/${token.themeAssetsPath}/bg.png`
  );
  const titleStr = useStrHandlebars(title);
  const subTitleStr = useStrHandlebars(subTitle);
  const { data, isLoading } = useDataBindFetch(dataSource);
  const menuList: HeaderMenuItemType[] = get(data, "data.data", []) || [];
  const { ref, width = 0 } = useResizeObserver<HTMLDivElement>();

  const subMenuList = useMemo(() => {
    if (!menuList.length) {
      return [];
    }
    return loopMenuList(menuList);
  }, [menuList.length]);

  const activeSubMenu = useMemo(() => {
    return subMenuList.find((s) => {
      return s.shareURL === reportId;
    });
  }, [subMenuList.length, reportId]);
  return (
    <div
      className={css`
        width: 100%;
        height: 100%;
        position: relative;
        background-color: #002d56;
      `}
    >
      <div
        className={css`
          width: 100%;
          height: ${isPc ? "100%" : `106.4px`};
          position: relative;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          background-image: url(${bgSrc});
        `}
      >
        {/* 左标题 */}
        {!!(isPc && titleStr) && (
          <div
            className={css`
              z-index: 10;
              position: absolute;
              width: 23%;
              left: 0;
              top: 0.16rem;
              height: calc(58.3% - 0.16rem);
            `}
          >
            <div
              className={css`
                width: 100%;
                height: 100%;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
              `}
            >
              <GradientTitle
                titleStr={titleStr}
                textProps={{
                  x: "24px",
                  y: "0.22rem",
                  fontSize: "0.44rem",

                  alignmentBaseline: "middle",
                  textAnchor: "start",
                }}
              ></GradientTitle>
            </div>
          </div>
        )}
        {!!(isPc && subTitleStr) && (
          <div
            className={css`
              z-index: 11;
              position: absolute;
              width: 23%;
              left: 0.24rem;
              top: 58%;
              height: 0.26rem;
              font-size: 0.22rem;
              line-height: 0.26rem;
              color: #c3f4ff;
            `}
          >
            {subTitleStr}
          </div>
        )}

        {/* 一级菜单区域 */}
        <div
          ref={ref}
          className={
            isPc
              ? css`
                  position: absolute;
                  z-index: 11;
                  width: calc(75% - 100px);
                  left: calc(25%);
                  height: 58.3%;
                `
              : css`
                  position: absolute;
                  z-index: 11;
                  width: 100%;
                  left: 0rem;
                  height: 58.3%;
                `
          }
        >
          {menuList && menuList.length ? (
            <Level1Menu
              reportId={reportId}
              menuList={menuList}
              activeSubMenu={activeSubMenu}
            />
          ) : null}
        </div>
        {/* 二级菜单区域 */}
        <div
          className={css`
            position: absolute;
            z-index: 11;
            width: 55%;
            left: 25%;
            height: 41.7%;
            top: 58.3%;
          `}
        >
          {activeSubMenu?.parent?.children?.length ? (
            <Level2SubMenu
              reportId={reportId}
              subMenuList={activeSubMenu?.parent?.children || []}
            />
          ) : null}
        </div>
        {/* 闹钟区域 */}
        {isPc && (
          <div
            className={css`
              position: absolute;
              z-index: 10;
              width: 25%;
              height: 41.7%;
              top: 58.3%;
              right: 0;
            `}
          >
            <HeaderClock />
          </div>
        )}
      </div>
      {!isPc && (
        <div
          className={css`
            width: 100%;
            height: calc(100% - 106.4px);
          `}
        >
          <HeaderClock />
        </div>
      )}
    </div>
  );
};

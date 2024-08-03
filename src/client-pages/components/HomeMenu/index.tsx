import { css } from "@emotion/css";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { type PropsWithChildren, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

type MenuItem = Required<MenuProps>["items"][number];

const menuItems: MenuItem[] = [
  {
    label: "首页",
    key: "/home",
  },
  {
    label: "仪表盘",
    key: "/designer/all",
  },
  {
    label: "组件",
    key: "component",
    children: [
      {
        label: "图表组件",
        key: "/charts/all",
      },
    ],
  },
  {
    label: "素材",
    key: "/assets",
  },
  {
    label: "模版",
    key: "/template",
  },
  {
    label: "数据工厂",
    key: "/dapi/main",
  },
  // {
  //   label: "插件",
  //   key: "/plugin",
  // },
  // {
  //   label: "数字孪生",
  //   key: "/gis",
  // },
  {
    label: "系统管理",
    key: "/system",
    children: [
      {
        label: "数据源管理",
        key: "/system/datasource",
      },
      {
        label: "过滤器管理",
        key: "/system/filter",
      },
      {
        label: "应用分类管理",
        key: "/system/appname",
      },
    ],
  },
];

interface HomeMenuProps extends PropsWithChildren {}

const titleStyle = css`
  cursor: pointer;
  color: var(--dn-composite-panel-tabs-header-color);
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 40px;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 230px;
  margin-right: 12px;
  text-align: left;
`;

/**
 * 第一层,横向菜单封装
 * @param param0
 * @returns
 */

function HomeMenu({ children }: HomeMenuProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const hasParams = Object.keys(params).length > 0;
  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key) {
      navigate(e.key);
    }
  };

  // const currentMenuKey = useMemo(() => {
  //   return pathname;
  // }, [pathname]);

  return (
    <div
      className={css`
        width: 100%;
        box-sizing: border-box;
        padding: 0 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      `}
    >
      <div
        className={css`
          display: flex;
          align-items: center;
        `}
      >
        {hasParams && (
          <div
            className={titleStyle}
            onClick={() => {
              navigate(-1);
            }}
          >
            <IoMdArrowRoundBack />
          </div>
        )}

        <div
          className={titleStyle}
          onClick={() => {
            navigate("/home/main");
          }}
        >
          孪生数字底座
        </div>
        <div
          key={pathname}
          className={css`
            display: flex;
            align-items: center;
          `}
        >
          <Menu
            className={css`
              border-bottom: none;
              line-height: 34px;
            `}
            onClick={onClick}
            selectedKeys={[pathname]}
            mode="horizontal"
            items={menuItems}
          />
        </div>
      </div>
      {children}
    </div>
  );
}

export default HomeMenu;

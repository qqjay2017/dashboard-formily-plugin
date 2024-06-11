import { css } from "@emotion/css";
import { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";

export const homeMenu = [
  {
    label: "首页",
    path: "/dashboard/home",
  },
  {
    label: "api管理",
    path: "/dashboard/api",
  },
];

interface HomeMenuProps extends PropsWithChildren {}

export const HomeMenu = ({ children }: HomeMenuProps) => {
  return (
    <div
      className={css`
        width: 100%;
        height: 50px;
        background-color: #fff;
        border-bottom: 1px solid #e4e4e5;
        box-sizing: border-box;
        padding: 0 24px;
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
        <div
          className={css`
            cursor: pointer;
            height: 40px;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            color: #2f2e3f;
            line-height: 40px;
            word-wrap: break-word;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 230px;
            min-width: 130px;
            margin-right: 24px;
          `}
        >
          可视化大屏搭建
        </div>
        <div
          className={css`
            display: flex;
            align-items: center;
          `}
        >
          {homeMenu.map((menu) => {
            return (
              <NavLink
                key={menu.label + menu.path}
                className={({ isActive }) => {
                  return css`
                    color: ${isActive ? "#1677ff" : "#000"};
                    padding: 6px 12px;
                    margin: 0 4px;
                  `;
                }}
                to={menu.path}
              >
                {menu.label}
              </NavLink>
            );
          })}
        </div>
      </div>
      {children}
      {/* <CreateFormBtn /> */}
    </div>
  );
};

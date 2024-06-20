import { css } from "@emotion/css";
import React from "react";
import { HomeMenu } from "./home-list/home-menu";
import { Outlet, useLocation } from "react-router-dom";
import { NavigateHome } from "./home-list/NavigateHome";
import { CreateFormBtn } from "../demo/components";
import { CreateApiBtn } from "./data-source-center/CreateApiBtn";

export const DashboardLayout = () => {
  const { pathname } = useLocation();

  if (pathname == "/dashboard" || pathname == "/dashboard/") {
    return <NavigateHome />;
  }
  const isHomePage = pathname.includes("/dashboard/home");
  const isApiPage = pathname.includes("/dashboard/api");
  return (
    <div
      className={css`
        width: 100vw;
        height: 100vh;
      `}
    >
      <HomeMenu>
        {isHomePage && <CreateFormBtn />}
        {isApiPage && <CreateApiBtn />}
      </HomeMenu>
      <div
        className={css`
          width: 100vw;
          height: calc(100vh - 50px);
        `}
      >
        <Outlet />
      </div>
    </div>
  );
};

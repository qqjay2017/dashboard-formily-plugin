import { css } from "@emotion/css";
import React from "react";
import { HomeMenu } from "./home-list/home-menu";
import { Outlet, useLocation } from "react-router-dom";
import { NavigateHome } from "./home-list/NavigateHome";

export const DashboardLayout = () => {
  const { pathname } = useLocation();
  console.log(pathname, "pathname");
  if (pathname == "/dashboard" || pathname == "/dashboard/") {
    return <NavigateHome />;
  }
  return (
    <div
      className={css`
        width: 100vw;
        height: 100vh;
      `}
    >
      <HomeMenu />
      <Outlet />
    </div>
  );
};

import { css } from "@emotion/css";

import { Outlet } from "react-router-dom";
import { HomeMenu } from "./layout";

function DashboardLayout() {
  return (
    <div
      className={css`
        width: 100vw;
        height: 100vh;
      `}
    >
      <HomeMenu />
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
}
export default DashboardLayout;

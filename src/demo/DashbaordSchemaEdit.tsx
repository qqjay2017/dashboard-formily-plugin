import { DesignPage } from "../client-pages/design-page";
import { Hello } from "./Hello";
import { Application } from "../application/Application";
import {
  AntdV5Plugin,
  DashboardDesignerPlugin,
  KxgcAuthPlugin,
} from "../plugins";
import { DashboardRoot } from "../schema-component";
import { DashboardLayout } from "../client-pages/DashboardLayout";
import { HomeList } from "../client-pages/home-list";
import { DataSourceCenter } from "../client-pages/data-source-center";
import { NavigateHome } from "../client-pages/home-list/NavigateHome";
import { ApiEdit } from "../client-pages/data-source-center/ApiEdit";

export const application = new Application({
  providers: [],
  plugins: [AntdV5Plugin, DashboardDesignerPlugin, KxgcAuthPlugin],
  designable: true,
  components: {
    Hello,
    DashboardRoot,
  },

  router: {
    type: "browser",
    routes: {
      root: {
        path: "/",
        Component: NavigateHome,
      },
      dashboard: {
        path: "/dashboard",
        Component: DashboardLayout,
      },
      "dashboard.home": {
        path: "/dashboard/home",
        Component: HomeList,
      },
      "dashboard.api": {
        path: "/dashboard/api",
        Component: DataSourceCenter,
      },
      "dashboard.apiEdit": {
        path: "/dashboard/api/edit",
        Component: ApiEdit,
      },
      design: {
        path: "/design/:id",
        Component: DesignPage,
      },
    },
  },
});

export default application.getRootComponent();

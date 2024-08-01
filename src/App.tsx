import { lazy } from "react";
import { BASE_URL } from "./env";

import AdminLayoutPlugin from "./plugins/AdminLayoutPlugin";

import ChartLayout from "./client-pages/component/chart/ChartLayout";
import DashboardLayout from "./client-pages/dashboard/DashboardLayout";
import ApiLayout from "./client-pages/api/ApiLayout";
import Application from "@/application/Application";
import { KxgcAuthPlugin } from "@/plugins";

import NavigateHome from "@/client-pages/home-list/NavigateHome";

const AssetsMain = lazy(() => import("@/client-pages/assets/main"));

const ApiEdit = lazy(() => import("@/client-pages/api/edit/ApiEdit"));
const ApiMain = lazy(() => import("@/client-pages/api/main"));

const ChartIndex = lazy(
  () => import("@/client-pages/component/chart/ChartIndex")
);
const DashboardMain = lazy(() => import("@/client-pages/dashboard/main"));
const HomeMain = lazy(() => import("@/client-pages/home/main"));
const PluginMain = lazy(() => import("@/client-pages/plugin/main"));

const PreviewPage = lazy(() => import("@/client-pages/preview-page"));

const DesignPage2 = lazy(
  () => import("./client-pages/design-page/DesignPage2")
);
const ChartEditPage = lazy(
  () => import("@/client-pages/component/chart/ChartEditPage")
);
const application = new Application({
  providers: [],
  plugins: [KxgcAuthPlugin, AdminLayoutPlugin],
  designable: true,
  components: {},

  router: {
    type: "browser",
    basename: BASE_URL || "/",
    routes: {
      root: {
        path: "/",
        Component: NavigateHome,
      },

      home: {
        path: "/home",
        Component: HomeMain,
      },

      dashboard: {
        path: "/dashboard",
        Component: DashboardLayout,
      },
      "dashboard.all": {
        path: "/dashboard/all",
        Component: DashboardMain,
      },

      chart: {
        path: "/charts",
        Component: ChartLayout,
      },
      "chart.type": {
        path: "/charts/:type",
        Component: ChartIndex,
      },
      chartEdit: {
        path: "/chart-edit/:id",
        Component: ChartEditPage,
      },

      assets: {
        path: "/assets",
        Component: AssetsMain,
      },
      dapi: {
        path: "/dapi",
        Component: ApiLayout,
      },

      "dapi.main": {
        path: "/dapi/main",
        Component: ApiMain,
      },

      "dapi.edit": {
        path: "/dapi/edit",
        Component: ApiEdit,
      },

      plugin: {
        path: "/plugin",
        Component: PluginMain,
      },

      template: {
        path: "/template",
        Component: PluginMain,
      },

      gis: {
        path: "/gis",
        Component: PluginMain,
      },
      dashboarddesign: {
        path: "/dashboard-design/:id",
        Component: DesignPage2,
      },
      preview: {
        path: "/report/:shareURL",
        Component: PreviewPage,
      },
    },
  },
});

const App = application.getRootComponent();
export default App;

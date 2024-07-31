import { lazy } from "react";
import { BASE_URL } from "./env";

import AdminLayoutPlugin from "./plugins/AdminLayoutPlugin";

import ChartLayout from "./client-pages/component/chart/ChartLayout";
import Application from "@/application/Application";
import { KxgcAuthPlugin } from "@/plugins";

import NavigateHome from "@/client-pages/home-list/NavigateHome";

const AssetsMain = lazy(() => import("@/client-pages/assets/main"));
const ApiMagic = lazy(() => import("@/client-pages/api/magic/ApiMagic"));
const ApiEdit = lazy(() => import("@/client-pages/api/edit/ApiEdit"));
const ApiMain = lazy(() => import("@/client-pages/api/main"));
const ComponentMain = lazy(() => import("@/client-pages/component/main"));
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

      "home.main": {
        path: "/home/main",
        Component: HomeMain,
      },

      "dashboard.main": {
        path: "/dashboard/main",
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
      "component.chartEdit": {
        path: "/component/chart-edit/:id",
        Component: ChartEditPage,
      },

      "assets.main": {
        path: "/assets/main",
        Component: AssetsMain,
      },

      "dapi.main": {
        path: "/dapi/external-data",
        Component: ApiMain,
      },
      "dapi.magic": {
        path: "/dapi/magic-api",
        Component: ApiMagic,
      },
      "dapi.edit": {
        path: "/dapi/edit",
        Component: ApiEdit,
      },

      "plugin.main": {
        path: "/plugin/main",
        Component: PluginMain,
      },

      "template.main": {
        path: "/template/main",
        Component: PluginMain,
      },

      "gis.main": {
        path: "/gis/main",
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

import { lazy } from "react";
import { BASE_URL } from "./env";

import Application from "@/application/Application";
import { DashboardBuildinPlugin, KxgcAuthPlugin } from "@/plugins";
import DashboardLayout from "@/client-pages/DashboardLayout";
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

const PreviewPage = lazy(
  () => import("@/client-pages/preview-page/PreviewPage")
);

const DesignPage2 = lazy(
  () => import("./client-pages/design-page/DesignPage2")
);
const ChartEditPage = lazy(
  () => import("@/client-pages/component/chart/ChartEditPage")
);
const application = new Application({
  providers: [],
  plugins: [DashboardBuildinPlugin, KxgcAuthPlugin],
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
        Component: DashboardLayout,
      },
      "home.main": {
        path: "/home/main",
        Component: HomeMain,
      },
      dashboard: {
        path: "/dashboard",
        Component: DashboardLayout,
      },
      "dashboard.main": {
        path: "/dashboard/main",
        Component: DashboardMain,
      },

      component: {
        path: "/component",
        Component: DashboardLayout,
      },
      "component.main": {
        path: "/component/main",
        Component: ComponentMain,
      },
      "component.chart": {
        path: "/component/chart",
        Component: ChartIndex,
      },
      "component.chartEdit": {
        path: "/component/chart-edit/:id",
        Component: ChartEditPage,
      },
      assets: {
        path: "/assets",
        Component: DashboardLayout,
      },
      "assets.main": {
        path: "/assets/main",
        Component: AssetsMain,
      },
      dapi: {
        path: "/dapi",
        Component: DashboardLayout,
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
      plugin: {
        path: "/plugin",
        Component: DashboardLayout,
      },
      "plugin.main": {
        path: "/plugin/main",
        Component: PluginMain,
      },
      template: {
        path: "/template",
        Component: DashboardLayout,
      },
      "template.main": {
        path: "/template/main",
        Component: PluginMain,
      },
      gis: {
        path: "/gis",
        Component: DashboardLayout,
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

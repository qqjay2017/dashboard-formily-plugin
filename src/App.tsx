import { BASE_URL } from "./utils/env";

import AdminLayoutPlugin from "./plugins/AdminLayoutPlugin";

import {
  ApiEditPage,
  ApiIndex,
  ApiLayout,
  AppNameIndex,
  ChartEditPage,
  ChartsIndex,
  ChartsLayout,
  DashboardIndex,
  DashboardLayout,
  DataSourceIndex,
  DesignPage2,
  FilterIndex,
  HomeIndex,
  NavigateHome,
  PreviewPage,
  SystemLayout,
} from "./client-pages/pages";
import Application from "@/application/Application";
import { KxgcAuthPlugin } from "@/plugins";

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
        Component: HomeIndex,
      },

      dashboard: {
        path: "/designer",
        Component: DashboardLayout,
      },
      "dashboard.all": {
        path: "/designer/all",
        Component: DashboardIndex,
      },

      chart: {
        path: "/charts",
        Component: ChartsLayout,
      },
      "chart.type": {
        path: "/charts/:type",
        Component: ChartsIndex,
      },
      chartEdit: {
        path: "/chart-edit/:id",
        Component: ChartEditPage,
      },

      dapi: {
        path: "/dapi",
        Component: ApiLayout,
      },

      "dapi.main": {
        path: "/dapi/main",
        Component: ApiIndex,
      },

      dapiedit: {
        path: "/dapi-edit",
        Component: ApiEditPage,
      },

      system: {
        path: "/system",
        Component: SystemLayout,
      },
      "system.datasource": {
        path: "/system/datasource",
        Component: DataSourceIndex,
      },
      "system.filter": {
        path: "/system/filter",
        Component: FilterIndex,
      },
      "system.appname": {
        path: "/system/appname",
        Component: AppNameIndex,
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

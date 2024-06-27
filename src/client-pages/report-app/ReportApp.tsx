import { Application } from "../../application";
import {
  AntdV5Plugin,
  DashboardPreviewPlugin,
  KxgcAuthPlugin,
} from "../../plugins";
import { PreviewPage } from "../preview-page";

export const application = new Application({
  providers: [],
  plugins: [AntdV5Plugin, DashboardPreviewPlugin, KxgcAuthPlugin],
  designable: true,
  components: {
    // DashboardRoot,
    // PositionDecorator,
  },

  router: {
    basename: "/report",
    type: "browser",
    routes: {
      preview: {
        path: "/:shareURL",
        Component: PreviewPage,
      },
    },
  },
});

export default application.getRootComponent();

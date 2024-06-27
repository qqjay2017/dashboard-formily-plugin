import { Application } from "../../application";
import {
  AntdV5Plugin,
  DashboardPreviewPlugin,
  KxgcAuthPlugin,
} from "../../plugins";
import { DashboardRootPreview } from "../../schema-component/components/DashboardRoot/DashboardRootPreview";
import { PositionDecoratorPreview } from "../../schema-component/components/PositionDecorator/PositionDecoratorPreview";
import { PreviewPage } from "../preview-page";

export const application = new Application({
  providers: [],
  plugins: [AntdV5Plugin, DashboardPreviewPlugin, KxgcAuthPlugin],
  designable: true,
  components: {
    // DashboardRoot,
    // PositionDecorator,
    PositionDecorator: PositionDecoratorPreview,
    DashboardRoot: DashboardRootPreview,
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

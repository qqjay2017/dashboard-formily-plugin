import React from "react";
import { HomeList } from "./HomeList";
import { DesignPage } from "../design-page/DesignPage";
import { Hello } from "./Hello";
import { Application } from "../application/Application";
import { AntdV5Plugin, DashboardDesignerPlugin } from "../plugins";
import { DashboardRoot } from "../schema-component";

export const application = new Application({
  providers: [],
  plugins: [AntdV5Plugin, DashboardDesignerPlugin],
  designable: true,
  components: {
    Hello,
    DashboardRoot,
  },

  router: {
    type: "browser",
    routes: {
      home: {
        path: "/",
        Component: HomeList,
      },
      design: {
        path: "/design/:id",
        Component: DesignPage,
      },
    },
  },
});

export default application.getRootComponent();

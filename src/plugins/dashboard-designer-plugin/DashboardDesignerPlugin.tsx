import { Plugin } from "../../application";

import {
  DashboardRoot,
  ClassicFrame,
  PositionDecorator,
} from "../../schema-component";
import { ColorTypeSelect, IsDarkThemeSelect } from "../../schema-settings";

/**
 * 设计器相关的插件,浏览的时候不需要用到
 */
export class DashboardDesignerPlugin extends Plugin {
  async load(): Promise<void> {
    this.app.addComponents({
      ColorTypeSelect,
      IsDarkThemeSelect,
      // DashboardRoot,
      PositionDecorator,
      ClassicFrame,
    });
  }
}

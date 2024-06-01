import { Plugin } from "../../application";
import { IsDarkThemeSelect } from "../../demo/components";
import { ColorTypeSelect } from "../../schema-settings";

/**
 * 设计器相关的插件,浏览的时候不需要用到
 */
export class DashboardDesignerPlugin extends Plugin {
  async load(): Promise<void> {
    this.app.addComponents({
      ColorTypeSelect,
      IsDarkThemeSelect,
    });
  }
}

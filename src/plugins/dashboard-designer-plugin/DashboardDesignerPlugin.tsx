import { Plugin } from "../../application";

import {
  ApiBaseNameFormItem,
  ApiGroupFormItem,
  ApiHeadersFormItem,
  ApiOriginFormItem,
  ComponentAddressFormItem,
  ComponentTypeFormItem,
  DataSourceBind,
  DecoratorPaddingFormItem,
  DepFieldSetFormItem,
  JsonInput,
  PositionDecoratorFormItem,
} from "../../schema-component";
import { ColorTypeSelect, IsDarkThemeSelect } from "../../schema-settings";

/**
 * 设计器相关的插件,浏览的时候不需要用到
 */
export class DashboardDesignerPlugin extends Plugin {
  async load(): Promise<void> {
    this.app.addComponents({
      JsonInput,
      ApiHeadersFormItem,
      ApiBaseNameFormItem,
      ApiOriginFormItem,
      ApiGroupFormItem,
      ComponentAddressFormItem,
      ComponentTypeFormItem,
      DepFieldSetFormItem,
      PositionDecoratorFormItem,
      DecoratorPaddingFormItem,
      ColorTypeSelect,
      IsDarkThemeSelect,
      DataSourceBind,
    });
  }
}

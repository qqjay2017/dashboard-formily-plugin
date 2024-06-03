import { ConfigProvider } from "antd";
import { Plugin } from "../../application";
import { FormItem, FormLayout, Input, NumberPicker } from "@formily/antd-v5";
import zh_CN from "antd/locale/zh_CN";
export class AntdV5Plugin extends Plugin {
  async load() {
    this.app.addProvider(ConfigProvider, {
      locale: zh_CN,
    });
    this.app.addComponents({
      FormItem,
      FormLayout,
      Input,
      NumberPicker,
    });
  }
}

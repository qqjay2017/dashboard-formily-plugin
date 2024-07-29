import { ConfigProvider } from 'antd'
import {
  FormItem,
  FormLayout,
  Input,
  NumberPicker,
  Radio,
  Select,
  Switch,
} from '@formily/antd-v5'
import zh_CN from 'antd/locale/zh_CN'
import { Plugin } from '../../application'

export class AntdV5Plugin extends Plugin {
  async load() {
    this.app.addProvider(ConfigProvider, {
      locale: zh_CN,
    })
    this.app.addComponents({
      FormItem,
      FormLayout,
      Input,
      NumberPicker,
      Select,
      Radio,
      Switch,
    })
  }
}

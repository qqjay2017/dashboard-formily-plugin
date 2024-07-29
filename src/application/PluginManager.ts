import type Application from './Application'
import type { Plugin } from './Plugin'

export interface PluginOptions<T = any> {
  name?: string
  packageName?: string
  config?: T
}
export type PluginType<Opts = any> =
  | typeof Plugin
  | [typeof Plugin, PluginOptions<Opts>]
export interface PluginData {
  name: string
  packageName: string
  version: string
  url: string
  type: 'local' | 'upload' | 'npm'
}

export class PluginManager {
  protected pluginInstances: Map<typeof Plugin, Plugin> = new Map()
  protected pluginsAliases: Record<string, Plugin> = {}
  private initPlugins: Promise<void>

  constructor(
    protected _plugins: PluginType[],
    protected loadRemotePlugins: boolean,
    protected app: Application,
  ) {
    this.app = app
    this.initPlugins = this.init(_plugins)
  }

  /**
   * @internal
   */
  async init(_plugins: PluginType[]) {
    await this.initStaticPlugins(_plugins)
  }

  private async initStaticPlugins(_plugins: PluginType[] = []) {
    for await (const plugin of _plugins) {
      try {
        const pluginClass = Array.isArray(plugin) ? plugin[0] : plugin
        const opts = Array.isArray(plugin) ? plugin[1] : undefined
        await this.add(pluginClass, opts)
      }
      catch (error) { }
    }
  }

  async add<T = any>(plugin: typeof Plugin, opts: PluginOptions<T> = {}) {
    try {
      const instance = this.getInstance(plugin, opts)

      this.pluginInstances.set(plugin, instance)

      if (opts.name) {
        this.pluginsAliases[opts.name] = instance
      }

      if (opts.packageName) {
        this.pluginsAliases[opts.packageName] = instance
      }

      await instance.afterAdd()
    }
    catch (error) { }
  }

  get<T extends typeof Plugin>(PluginClass: T): InstanceType<T>
  get<T extends {}>(name: string): T
  get(nameOrPluginClass: any) {
    if (typeof nameOrPluginClass === 'string') {
      return this.pluginsAliases[nameOrPluginClass]
    }
    return this.pluginInstances.get(
      nameOrPluginClass.default || nameOrPluginClass,
    )
  }

  private getInstance<T>(PluginParam: typeof Plugin, opts?: T) {
    return new PluginParam(opts, this.app)
  }

  /**
   * @internal
   */
  async load() {
    await this.initPlugins

    for (const plugin of this.pluginInstances.values()) {
      await plugin.beforeLoad()
    }

    for (const plugin of this.pluginInstances.values()) {
      await plugin.load()
    }
  }
}

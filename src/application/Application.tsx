import { ComponentType, FC, ReactElement, ReactNode } from "react";
import {
  ComponentTypeAndString,
  RouterManager,
  RouterOptions,
} from "./RouterManager";
import { APIClient, APIClientProvider } from "../api-client";
import {
  AppComponent,
  BlankComponent,
  defaultAppComponents,
} from "./components";
import { PluginManager, PluginType } from "./PluginManager";
import { define, observable } from "@formily/reactive";
import { get, merge, set } from "lodash-es";
import { AntdAppProvider, GlobalThemeProvider } from "../global-theme";
import { CSSVariableProvider } from "../css-variable";
import { Link, NavLink, Navigate } from "react-router-dom";
import { compose, normalizeContainer } from "./utils";
import React from "react";
import { createRoot } from "react-dom/client";
import { AppSchemaComponentProvider } from "./AppSchemaComponentProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { APIClientOptions } from "../sdk";
export type ComponentAndProps<T = any> = [ComponentType, T];

export interface ApplicationOptions {
  designable?: boolean;
  name?: string;
  publicPath?: string;
  apiClient?: APIClientOptions | APIClient;

  providers?: (ComponentType | ComponentAndProps)[];
  plugins?: PluginType[];
  components?: Record<string, ComponentType>;
  scopes?: Record<string, any>;
  router?: RouterOptions;
}

export class Application {
  providers: ComponentAndProps[] = [];
  scopes?: Record<string, any>;
  router: RouterManager;
  public apiClient: APIClient;
  public components: Record<string, ComponentType<any> | any> = {
    ...defaultAppComponents,
  };
  public pluginManager: PluginManager;
  public notification;
  public name: string = "app";

  loading = true;
  maintained = false;
  maintaining = false;
  error = null;

  get pm() {
    return this.pluginManager;
  }
  constructor(protected options: ApplicationOptions) {
    define(this, {
      maintained: observable.ref,
      loading: observable.ref,
      maintaining: observable.ref,
      error: observable.ref,
    });
    this.scopes = merge(this.scopes, options.scopes);
    this.components = merge(this.components, options.components);
    this.apiClient =
      options.apiClient instanceof APIClient
        ? options.apiClient
        : new APIClient(options.apiClient);
    this.apiClient.app = this;
    this.router = new RouterManager(options.router, this);

    this.pluginManager = new PluginManager(options.plugins, false, this);

    this.addDefaultProviders();
    this.addReactRouterComponents();
    this.addProviders(options.providers || []);

    this.addRoutes();
    this.name = this.options.name;
  }

  private addDefaultProviders() {
    this.use(QueryClientProvider, {
      client: new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      }),
    });
    this.use(APIClientProvider, { apiClient: this.apiClient });

    this.use(GlobalThemeProvider);
    this.use(CSSVariableProvider);
    this.use(AppSchemaComponentProvider, {
      designable: this.options.designable,
      appName: this.name,
      components: this.components,
      scope: this.scopes,
    });
    this.use(AntdAppProvider);
  }

  private addReactRouterComponents() {
    this.addComponents({
      Link,
      Navigate: Navigate as ComponentType,
      NavLink,
    });
  }

  private addRoutes() {
    this.router.add("not-found", {
      path: "*",
      Component: this.components["AppNotFound"],
    });
  }

  getOptions() {
    return this.options;
  }

  getName() {
    return this.name;
  }

  getPublicPath() {
    let publicPath = this.options.publicPath || "/";
    if (!publicPath.endsWith("/")) {
      publicPath += "/";
    }
    return publicPath;
  }

  getApiUrl(pathname = "") {
    let baseURL = this.apiClient.axios["defaults"]["baseURL"];
    if (!baseURL.startsWith("http://") && !baseURL.startsWith("https://")) {
      const { protocol, host } = window.location;
      baseURL = `${protocol}//${host}${baseURL}`;
    }
    return baseURL.replace(/\/$/g, "") + "/" + pathname.replace(/^\//g, "");
  }

  getRouteUrl(pathname: string) {
    return this.getPublicPath() + pathname.replace(/^\//g, "");
  }

  /**
   * @internal
   */
  getComposeProviders() {
    const Providers = compose(...this.providers)(BlankComponent);
    Providers.displayName = "Providers";
    return Providers;
  }

  use<T = any>(component: ComponentType, props?: T) {
    return this.addProvider(component, props);
  }

  addProvider<T = any>(component: ComponentType, props?: T) {
    return this.providers.push([component, props]);
  }

  addProviders(providers: (ComponentType | [ComponentType, any])[]) {
    providers.forEach((provider) => {
      if (Array.isArray(provider)) {
        this.addProvider(provider[0], provider[1]);
      } else {
        this.addProvider(provider);
      }
    });
  }

  async load() {
    let loadFailed = false;

    try {
      this.loading = true;
      await this.pm.load();
    } catch (error) {
      loadFailed = true;
      const others = error?.response?.data?.error ||
        error?.response?.data?.errors?.[0] || { message: error?.message };
      this.error = {
        code: "LOAD_ERROR",
        ...others,
      };
      console.error(error, this.error);
    }
    this.loading = false;
  }

  getComponent<T = any>(
    Component: ComponentTypeAndString<T>,
    isShowError = true
  ): ComponentType<T> | undefined {
    const showError = (msg: string) => isShowError && console.error(msg);
    if (!Component) {
      showError(`getComponent called with ${Component}`);
      return;
    }

    // ClassComponent or FunctionComponent
    if (typeof Component === "function") return Component;

    // Component is a string, try to get it from this.components
    if (typeof Component === "string") {
      const res = get(this.components, Component) as ComponentType<T>;

      if (!res) {
        showError(`Component ${Component} not found`);
        return;
      }
      return res;
    }

    showError(`Component ${Component} should be a string or a React component`);
    return;
  }

  renderComponent<T extends {}>(
    Component: ComponentTypeAndString,
    props?: T,
    children?: ReactNode
  ): ReactElement {
    return React.createElement(this.getComponent(Component), props, children);
  }

  /**
   * @internal use addComponents({ SomeComponent }) instead
   */
  protected addComponent(component: ComponentType, name?: string) {
    const componentName = name || component.displayName || component.name;
    if (!componentName) {
      console.error(
        "Component must have a displayName or pass name as second argument"
      );
      return;
    }
    set(this.components, componentName, component);
  }

  addComponents(components: Record<string, ComponentType>) {
    Object.keys(components).forEach((name) => {
      this.addComponent(components[name], name);
    });
  }

  addScopes(scopes: Record<string, any>) {
    this.scopes = merge(this.scopes, scopes);
  }

  getRootComponent() {
    const Root: FC<{ children?: React.ReactNode }> = ({ children }) => (
      <AppComponent app={this}>{children}</AppComponent>
    );
    return Root;
  }

  mount(containerOrSelector: Element | ShadowRoot | string) {
    const container = normalizeContainer(containerOrSelector);
    if (!container) return;
    const App = this.getRootComponent();
    const root = createRoot(container);
    root.render(<App />);
    return root;
  }
}

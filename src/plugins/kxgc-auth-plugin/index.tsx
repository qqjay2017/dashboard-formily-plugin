import { Plugin } from "../../application";
import { AuthContextProvider } from "./AuthContextProvider";
export class KxgcAuthPlugin extends Plugin {
  async afterAdd(): Promise<void> {
    const envJson = await fetch(`/component-shared-center/env.json`).then((r) =>
      r.json()
    );

    Object.entries(envJson).forEach(([a, b]) => {
      window[a] = b;
    });
  }

  async load() {
    this.app.use(AuthContextProvider);
  }
}

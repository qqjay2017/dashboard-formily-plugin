import { Plugin } from "../../application";
import { AuthContextProvider } from "./AuthContextProvider";
export class KxgcAuthPlugin extends Plugin {
  async afterAdd(): Promise<void> {
    try {
      const envJson = await fetch(`/component-shared-center/env.json`).then(
        (r) => r.json()
      );

      Object.entries(envJson).forEach(([a, b]) => {
        window[a] = b;
      });
    } catch (error) {
      console.log(error, "error");
    }
  }

  async load() {
    this.app.use(AuthContextProvider);
  }
}

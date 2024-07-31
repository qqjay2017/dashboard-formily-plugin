import { AuthContextProvider } from "./AuthContextProvider";
import { Plugin } from "@/application";

export class KxgcAuthPlugin extends Plugin {
  async afterAdd(): Promise<void> {
    try {
      const res = await fetch(`/component-shared-center/env.json`);
      if (res.ok) {
        const envJson = await res.json();

        Object.entries(envJson).forEach(([a, b]) => {
          window[a] = b;
        });
      }
    } catch (error) {
      console.error(error, "error");
    }
  }

  async load() {
    this.app.use(AuthContextProvider);
  }
}

import { parse } from "@babel/parser";
import { getNpmCDNRegistry } from "@/designable/react-settings-form/registry";

interface IPrettierModule {
  default: {
    format: (
      source: string,
      options: {
        semi?: boolean;
        parser?: (code: string) => any;
      }
    ) => string;
  };
}

const cache: { prettier: Promise<IPrettierModule> } = {
  prettier: null,
};

export async function format(language: string, source: string) {
  cache.prettier =
    cache.prettier ||
    // eslint-disable-next-line no-new-func
    new Function(`return import("${getNpmCDNRegistry()}/standalone.mjs")`)();
  return cache.prettier.then((module) => {
    if (
      language === "javascript.expression" ||
      language === "typescript.expression"
    ) {
      return source;
    }
    if (/javascript|typescript/i.test(language)) {
      return module.default.format(source, {
        semi: false,
        parser(text) {
          return parse(text, {
            sourceType: "module",
            plugins: ["typescript", "jsx"],
          });
        },
      });
    }
    if (language === "json") {
      return JSON.stringify(JSON.parse(source), null, 2);
    }
    return source;
  });
}

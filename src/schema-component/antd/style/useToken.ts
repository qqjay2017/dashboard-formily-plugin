import { theme } from "antd";
import type { CustomToken } from "@/themes/global-theme";

interface Result extends ReturnType<typeof theme.useToken> {
  token: CustomToken;
}

export type TokenResult = Result;

function useToken() {
  const result = theme.useToken();
  return result as Result;
}

export { useToken };

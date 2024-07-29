import { useEffect } from "react";
import { useToken } from "@/schema-component/antd";

export function ThemeCSSVariableProvider({ children }) {
  const { token } = useToken();

  useEffect(() => {
    document.body.style.setProperty("--node-content-bg", token.nodeContentBg);

    document.body.style.setProperty("--text-white", token.textWhite);
    document.body.style.setProperty("--text-common", token.textCommon);
    document.body.style.setProperty("--text-light", token.textLight);
    document.body.style.setProperty("--text-primary", token.textPrimary);
    document.body.style.setProperty("--text-noselect", token.textNoselect);
    document.body.style.setProperty("--text-select", token.textSelect);
    document.body.style.setProperty("--text-tag", token.textTag);
    document.body.style.setProperty("--text-num", token.textNum);
    document.body.style.setProperty("--text-num-light", token.textNumLight);
    document.body.style.setProperty("--thumb-color", token.thumbColor);
    document.body.style.setProperty(
      "--node-content-foreground",
      token.nodeContentForeground
    );
  }, [
    token.nodeContentBg,
    token.textWhite,
    token.textCommon,
    token.textLight,
    token.textPrimary,
    token.textNoselect,
    token.textSelect,
    token.textTag,
    token.textNum,
    token.textNumLight,
    token.thumbColor,
    token.nodeContentForeground,
  ]);

  return children;
}

ThemeCSSVariableProvider.displayName = "ThemeCSSVariableProvider";

export default ThemeCSSVariableProvider;

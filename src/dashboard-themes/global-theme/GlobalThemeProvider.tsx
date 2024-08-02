import React, { useCallback, useMemo, useRef } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import { cloneDeep } from "lodash-es";
import zh_CN from "antd/es/locale/zh_CN";
import type { ThemeConfig, ThemeItem } from "./type";
import defaultTheme from "./defaultTheme";
import { addCustomAlgorithmToTheme } from "./customAlgorithm";
import { GlobalThemeContext } from "./useGlobalTheme";
import compatOldTheme from "./compatOldTheme";
import { globalFormConfig } from "@/utils";

export function GlobalThemeProvider({ children, theme: themeFromProps }) {
  const [theme, setTheme] = React.useState<ThemeConfig>(
    themeFromProps || defaultTheme
  );
  const currentSettingThemeRef = useRef<ThemeConfig>(null);
  const currentEditingThemeRef = useRef<ThemeItem>(null);

  const isDarkTheme = useMemo(() => {
    const algorithm = theme?.algorithm;
    if (Array.isArray(algorithm)) {
      return algorithm.includes(antdTheme.darkAlgorithm);
    }
    return algorithm === antdTheme.darkAlgorithm;
  }, [theme?.algorithm]);

  const setCurrentEditingTheme = useCallback((themeItem: ThemeItem) => {
    currentEditingThemeRef.current = themeItem
      ? cloneDeep(themeItem)
      : themeItem;
  }, []);

  const getCurrentEditingTheme = useCallback(() => {
    return currentEditingThemeRef.current;
  }, []);

  const setCurrentSettingTheme = useCallback((theme: ThemeConfig) => {
    currentSettingThemeRef.current = theme ? cloneDeep(theme) : theme;
  }, []);

  const getCurrentSettingTheme = useCallback(() => {
    return currentSettingThemeRef.current;
  }, []);

  const value = useMemo(() => {
    return {
      theme: addCustomAlgorithmToTheme(theme),
      setTheme,
      setCurrentSettingTheme,
      getCurrentSettingTheme,
      setCurrentEditingTheme,
      getCurrentEditingTheme,
      isDarkTheme,
    };
  }, [
    getCurrentEditingTheme,
    getCurrentSettingTheme,
    isDarkTheme,
    setCurrentEditingTheme,
    setCurrentSettingTheme,
    theme,
  ]);

  return (
    <GlobalThemeContext.Provider value={value}>
      <ConfigProvider
        theme={{
          ...compatOldTheme(value.theme),
          components: {
            Menu: {
              collapsedWidth: 64,
            },
          },
        }}
        locale={zh_CN}
        form={globalFormConfig}
      >
        {children}
      </ConfigProvider>
    </GlobalThemeContext.Provider>
  );
}

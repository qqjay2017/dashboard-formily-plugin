import React, { createContext } from "react";
import type { GlobalThemeContextProps } from "./type";

export const GlobalThemeContext = createContext<GlobalThemeContextProps>(null);
GlobalThemeContext.displayName = "GlobalThemeContext";

export const useGlobalTheme = () => {
    return (
        React.useContext(GlobalThemeContext) ||
        ({ theme: {}, isDarkTheme: false } as GlobalThemeContextProps)
    );
};
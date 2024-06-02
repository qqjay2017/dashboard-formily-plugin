import React, { PropsWithChildren } from "react";
import { SchemaSettingsContext } from "./context";

interface SchemaSettingsProvider extends PropsWithChildren {}

export const SchemaSettingsProvider = ({
  children,
}: SchemaSettingsProvider) => {
  return (
    <SchemaSettingsContext.Provider value={{}}>
      {children}
    </SchemaSettingsContext.Provider>
  );
};

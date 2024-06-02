import { GeneralField } from "@formily/core";
import { Schema } from "@formily/react";
import { createContext } from "react";

interface SchemaSettingsContextProps<T = any> {
  //   dn?: Designable;
  field?: GeneralField;
  fieldSchema?: Schema;
  setVisible?: any;
  visible?: any;
  template?: any;
  collectionName?: any;
  designer?: T;
}

export const SchemaSettingsContext =
  createContext<SchemaSettingsContextProps>(null);
SchemaSettingsContext.displayName = "SchemaSettingsContext";

import { createContext } from "react";
import type { ISettingFormProps } from "../types";

export const SettingsFormContext = createContext<ISettingFormProps>(null);

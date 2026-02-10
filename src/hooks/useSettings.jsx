import { useContext } from "react";
import { SettingsContext } from "../Contexts/settings/SettingsContext";

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error(`useSettings must be use within SettingsProvider`);
  }

  return context;
};

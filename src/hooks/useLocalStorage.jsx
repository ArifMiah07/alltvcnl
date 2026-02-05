import { useContext } from "react";
import { LocalStorageContext } from "../Contexts/LocalStorageContext";

export const useLocalStorage = () => {
  const context = useContext(LocalStorageContext);
  if (!context) {
    throw new Error(`useLocalStorage must be use within LocalStorageProvider`);
  }
  return context;
};

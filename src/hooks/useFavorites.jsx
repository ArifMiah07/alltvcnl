import { useContext } from "react";
import { FavoritesContext } from "../Contexts/favorites/FavoritesContext";

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(`useFavorites must be use within FavoritesProvider`);
  }

  return context;
};

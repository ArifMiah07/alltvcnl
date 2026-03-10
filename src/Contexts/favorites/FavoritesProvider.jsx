import { FavoritesContext } from "./FavoritesContext";
import PropTypes from "prop-types";
export const FavoritesProvider = ({ children }) => {
  const getValues = {
    //
  };
  return (
    <FavoritesContext.Provider value={getValues}>
      {children}
    </FavoritesContext.Provider>
  );
};

FavoritesProvider.propTypes = {
  children: PropTypes.node,
};

import { SearchPageContext } from "./SearchPageContext";
import PropTypes from "prop-types";

export const SearchPageProvider = ({ children }) => {
  const getValues = {
    //
  };

  return (
    <SearchPageContext.Provider value={getValues}>
      {children}
    </SearchPageContext.Provider>
  );
};

SearchPageProvider.propTypes = {
  children: PropTypes.node,
};

import { createContext, useState } from "react";
import PropTypes from "prop-types";
// make a pagination context and use it
export const PaginationContext = createContext();

export const PaginationProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const getValues = {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
  };
  return (
    <PaginationContext.Provider value={getValues}>
      {children}
    </PaginationContext.Provider>
  );
};

PaginationProvider.propTypes = {
  children: PropTypes.node,
};

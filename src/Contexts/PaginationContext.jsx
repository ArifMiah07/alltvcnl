import { createContext, useState } from "react";
import PropTypes from "prop-types";
// make a pagination context and use it
export const PaginationContext = createContext();

export const PaginationProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(10);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPage, setTotalPage] = useState(1);

  const [currentPageInputRange, setCurrentPageInputRange] =
    useState(currentPage);
  // const [channelsPerPage, setChannelsPerPage] = useState(10);
  // const [channelsInput, setChannelsInput] = useState(10);

  const getValues = {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalItems,
    setTotalItems,
    totalPage,
    setTotalPage,
    currentPageInputRange,
    setCurrentPageInputRange,
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

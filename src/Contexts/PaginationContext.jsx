import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";
// make a pagination context and use it
export const PaginationContext = createContext();

export const PaginationProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(() => {
    // direct init from local storage
    const stored = localStorage.getItem("currentPageValueLocal");
    return stored ? Number(stored) : 1;
  });
  const [inputRange, setInputRange] = useState(currentPage);
  const [channelsPerPage, setChannelsPerPage] = useState(() => {
    // direct init from local storage
    const stored = localStorage.getItem("channelsPerPageValueLocal");
    // get value from localStorage, else return 10
    return stored ? Number(stored) : 10;
  });
  const [channelsInput, setChannelsInput] = useState(channelsPerPage);
  const [totalItems, setTotalItems] = useState(0);

  // variables
  //   let channelsPerPage;
  const numbersOfPages = Math.ceil(totalItems / channelsPerPage);
  const startIndex = (currentPage - 1) * channelsPerPage;
  const endIndex = currentPage * channelsPerPage;

  // handler functions
  // handle current page
  const handleCurrentPage = (page) => {
    setCurrentPage(page);
    setInputRange(page);
    localStorage.setItem("currentPageValueLocal", String(page));
  };
  // handle GotoPage
  const handleGotoPage = (e) => {
    e.preventDefault();
    const pageNumber = Number(inputRange?.trim());
    //
    if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > numbersOfPages) {
      toast.error(`plz enter a number between ${1} to ${numbersOfPages}`);
      return;
    }
    localStorage.setItem("currentPageValueLocal", String(pageNumber));

    handleCurrentPage(pageNumber);
    toast.success(`Showing page no. ${pageNumber}`);
  };

  // handle next page btn (UPDATED CODE FROM CHATGPT)
  const handleNextPage = () => {
    setCurrentPage((prev) => {
      if (prev < numbersOfPages) {
        const nextPage = prev + 1;
        setInputRange(nextPage);
        localStorage.setItem("currentPageValueLocal", String(nextPage));
        return nextPage;
      }
      return prev;
    });
  };

  // handle prev page btn (UPDATED CODE FORM CHATGPT)
  const handlePrevPage = () => {
    setCurrentPage((prev) => {
      if (prev > 1) {
        const prevPage = prev - 1;
        setInputRange(prevPage);
        localStorage.setItem("currentPageValueLocal", String(prevPage));
        return prevPage;
      }
      return prev;
    });
  };

  //   const handleSetChannelsPerPage = (page) => {
  // };

  // handle channels per page
  const handleChannelsPerPage = (e) => {
    e.preventDefault();
    const channelsPerPageLimit = 100;
    const channelsNumberPerPage = Number(channelsInput?.trim());
    //
    if (
      isNaN(channelsNumberPerPage) ||
      channelsNumberPerPage < 1 ||
      channelsNumberPerPage > channelsPerPageLimit
    ) {
      toast.error(`plz enter a number between 1 to ${channelsPerPageLimit}`);
      return;
    }

    localStorage.setItem(
      "channelsPerPageValueLocal",
      String(channelsNumberPerPage),
    );
    //
    setChannelsPerPage(channelsNumberPerPage);
    toast.success(`Showing ${channelsNumberPerPage} channels per page`);

    // reset to page 10 when changing items per page
    setCurrentPage(1);
    setInputRange(1);
    localStorage.setItem("currentPageValueLocal", "1");
  };

  const getValues = {
    currentPage,
    numbersOfPages,
    startIndex,
    endIndex,
    inputRange,
    setInputRange,
    handleCurrentPage,
    handleGotoPage,
    handleNextPage,
    handlePrevPage,
    channelsInput,
    setChannelsInput,
    channelsPerPage,
    handleChannelsPerPage,
    totalItems,
    setTotalItems,
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

import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { VerifiedStreamContext } from "./VerifiedStreamContext";

export const VerifiedStreamProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(() => {
    // direct init from local storage
    const stored = localStorage.getItem("verifiedStreamCurrentPageValueLocal");
    return stored ? Number(stored) : 1;
  });
  const [inputRange, setInputRange] = useState(currentPage);
  const [channelsPerPage, setChannelsPerPage] = useState(() => {
    // direct init from local storage
    const stored = localStorage.getItem(
      "verifiedStreamChannelsPerPageValueLocal",
    );
    // get value from localStorage, else return 10
    return stored ? Number(stored) : 10;
  });
  const [channelsInput, setChannelsInput] = useState(channelsPerPage);
  const [totalItems, setTotalItems] = useState(0);

  // show as list or grid
  const [showMoreChannelsInGridView, setShowMoreChannelsInGridView] = useState(
    () => {
      const stored = localStorage.getItem(
        "verifiedStreamShowMoreChannelsInGridViewLocal",
      );
      return stored === "true";
    },
  );

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
    localStorage.setItem("verifiedStreamCurrentPageValueLocal", String(page));
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
    localStorage.setItem(
      "verifiedStreamCurrentPageValueLocal",
      String(pageNumber),
    );

    handleCurrentPage(pageNumber);
    toast.success(`Showing page no. ${pageNumber}`);
  };

  // handle next page btn (UPDATED CODE FROM CHATGPT)
  const handleNextPage = () => {
    setCurrentPage((prev) => {
      if (prev < numbersOfPages) {
        const nextPage = prev + 1;
        setInputRange(nextPage);
        localStorage.setItem(
          "verifiedStreamCurrentPageValueLocal",
          String(nextPage),
        );
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
        localStorage.setItem(
          "verifiedStreamCurrentPageValueLocal",
          String(prevPage),
        );
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
      "verifiedStreamChannelsPerPageValueLocal",
      String(channelsNumberPerPage),
    );
    //
    setChannelsPerPage(channelsNumberPerPage);
    toast.success(`Showing ${channelsNumberPerPage} channels per page`);

    // reset to page 10 when changing items per page
    setCurrentPage(1);
    setInputRange(1);
    localStorage.setItem("verifiedStreamCurrentPageValueLocal", "1");
  };

  const handleToggleMoreChannelsLayout = () => {
    setShowMoreChannelsInGridView((prev) => {
      const newValue = !prev;
      localStorage.setItem(
        "verifiedStreamShowMoreChannelsInGridViewLocal",
        newValue.toString(),
      );
      return newValue;
    });
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
    showMoreChannelsInGridView,
    setShowMoreChannelsInGridView,
    handleToggleMoreChannelsLayout,
  };
  return (
    <VerifiedStreamContext.Provider value={getValues}>
      {children}
    </VerifiedStreamContext.Provider>
  );
};

VerifiedStreamProvider.propTypes = {
  children: PropTypes.node,
};

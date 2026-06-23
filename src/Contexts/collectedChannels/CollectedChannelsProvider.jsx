import PropTypes from "prop-types";
import { CollectedChannelsContext } from "./CollectedChannelsContext";
import { toast } from "sonner";
import { useState } from "react";

export const CollectedChannelsProvider = ({ children }) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(() => {
    // direct init from local storage
    const stored = localStorage.getItem("currentPageValueInCollectedChlsLocal");
    return stored ? Number(stored) : 1;
  });
  const [inputRange, setInputRange] = useState(currentPageNumber);
  const [channelsPerPage, setChannelsPerPage] = useState(() => {
    // direct init from local storage
    const stored = localStorage.getItem(
      "channelsPerPageValueInCollectedChlsLocal",
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
        "showMoreChannelsInGridViewInCollectedChlsLocal",
      );
      return stored === "true";
    },
  );

  // variables
  // let channelsPerPage;
  const numbersOfPages = Math.ceil(totalItems / channelsPerPage);
  const startIndex = (currentPageNumber - 1) * channelsPerPage;
  const endIndex = currentPageNumber * channelsPerPage;

  // handler functions
  // handle current page
  const handleCurrentPage = (page) => {
    setCurrentPageNumber(page);
    setInputRange(page);
    localStorage.setItem("currentPageValueInCollectedChlsLocal", String(page));
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
      "currentPageValueInCollectedChlsLocal",
      String(pageNumber),
    );

    handleCurrentPage(pageNumber);
    toast.success(`Showing page no. ${pageNumber}`);
  };

  // handle next page btn (UPDATED CODE FROM CHATGPT)
  const handleNextPage = () => {
    setCurrentPageNumber((prev) => {
      if (prev < numbersOfPages) {
        const nextPage = prev + 1;
        setInputRange(nextPage);
        localStorage.setItem(
          "currentPageValueInCollectedChlsLocal",
          String(nextPage),
        );
        return nextPage;
      }
      return prev;
    });
  };

  // handle prev page btn (UPDATED CODE FORM CHATGPT)
  const handlePrevPage = () => {
    setCurrentPageNumber((prev) => {
      if (prev > 1) {
        const prevPage = prev - 1;
        setInputRange(prevPage);
        localStorage.setItem(
          "currentPageValueInCollectedChlsLocal",
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
      "channelsPerPageValueInCollectedChlsLocal",
      String(channelsNumberPerPage),
    );
    //
    setChannelsPerPage(channelsNumberPerPage);
    toast.success(`Showing ${channelsNumberPerPage} channels per page`);

    // reset to page 10 when changing items per page
    setCurrentPageNumber(1);
    setInputRange(1);
    localStorage.setItem("currentPageValueInCollectedChlsLocal", "1");
  };

  const handleToggleMoreChannelsLayout = () => {
    setShowMoreChannelsInGridView((prev) => {
      const newValue = !prev;
      localStorage.setItem(
        "showMoreChannelsInGridViewInCollectedChlsLocal",
        newValue.toString(),
      );
      return newValue;
    });
  };

  const getValues = {
    currentPageNumber,
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
    <CollectedChannelsContext.Provider value={getValues}>
      {children}
    </CollectedChannelsContext.Provider>
  );
};

CollectedChannelsProvider.propTypes = {
  children: PropTypes.node,
};

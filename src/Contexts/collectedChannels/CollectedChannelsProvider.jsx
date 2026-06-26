import PropTypes from "prop-types";
import { CollectedChannelsContext } from "./CollectedChannelsContext";
import { toast } from "sonner";
import { useState } from "react";

export const CollectedChannelsProvider = ({ children }) => {
  // store current page number
  const [currentPageNumber, setCurrentPageNumber] = useState(() => {
    // direct init from local storage
    const stored = localStorage.getItem("currentPageValueInCollectedCnlLocal");
    return stored ? Number(stored) : 1;
  });
  // input range for current page number
  const [inputRange, setInputRange] = useState(currentPageNumber);

  // store channels per page number
  const [channelsPerPage, setChannelsPerPage] = useState(() => {
    // direct init from local storage
    const stored = localStorage.getItem(
      "channelsPerPageValueInCollectedCnlLocal",
    );
    // get value from localStorage, else return 10
    return stored ? Number(stored) : 10;
  });
  // input range for channels per page number
  const [channelsInput, setChannelsInput] = useState(channelsPerPage);

  // total channels
  const [totalItems, setTotalItems] = useState(0);

  // handle showing as list or grid view
  const [showMoreChannelsInGridView, setShowMoreChannelsInGridView] = useState(
    () => {
      const stored = localStorage.getItem(
        "showMoreChannelsInGridViewInCollectedCnlLocal",
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
    localStorage.setItem("currentPageValueInCollectedCnlLocal", String(page));
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
      "currentPageValueInCollectedCnlLocal",
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
          "currentPageValueInCollectedCnlLocal",
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
          "currentPageValueInCollectedCnlLocal",
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
      "channelsPerPageValueInCollectedCnlLocal",
      String(channelsNumberPerPage),
    );
    //
    setChannelsPerPage(channelsNumberPerPage);
    toast.success(`Showing ${channelsNumberPerPage} channels per page`);

    // reset to page 10 when changing items per page
    setCurrentPageNumber(1);
    setInputRange(1);
    localStorage.setItem("currentPageValueInCollectedCnlLocal", "1");
  };

  // handle more channels list in the footer area
  const handleToggleMoreChannelsLayout = () => {
    setShowMoreChannelsInGridView((prev) => {
      const newValue = !prev;
      localStorage.setItem(
        "showMoreChannelsInGridViewInCollectedCnlLocal",
        newValue.toString(),
      );
      return newValue;
    });
  };

  // props value
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

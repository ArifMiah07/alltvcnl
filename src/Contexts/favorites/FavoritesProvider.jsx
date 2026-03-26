import { useState } from "react";
import { FavoritesContext } from "./FavoritesContext";
import PropTypes from "prop-types";
import { toast } from "sonner";
export const FavoritesProvider = ({ children }) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(() => {
    // direct init from local storage
    const stored = localStorage.getItem("currentPageValueInFavoriteLocal");
    return stored ? Number(stored) : 1;
  });
  const [inputRange, setInputRange] = useState(currentPageNumber);
  const [channelsPerPage, setChannelsPerPage] = useState(() => {
    // direct init from local storage
    const stored = localStorage.getItem("channelsPerPageValueInFavoriteLocal");
    // get value from localStorage, else return 10
    return stored ? Number(stored) : 10;
  });
  const [channelsInput, setChannelsInput] = useState(channelsPerPage);
  const [totalItems, setTotalItems] = useState(0);

  // show as list or grid
  const [showMoreChannelsInGridView, setShowMoreChannelsInGridView] = useState(
    () => {
      const stored = localStorage.getItem(
        "showMoreChannelsInGridViewInFavoriteLocal",
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
    localStorage.setItem("currentPageValueInFavoriteLocal", String(page));
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
    localStorage.setItem("currentPageValueInFavoriteLocal", String(pageNumber));

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
          "currentPageValueInFavoriteLocal",
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
          "currentPageValueInFavoriteLocal",
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
      "channelsPerPageValueInFavoriteLocal",
      String(channelsNumberPerPage),
    );
    //
    setChannelsPerPage(channelsNumberPerPage);
    toast.success(`Showing ${channelsNumberPerPage} channels per page`);

    // reset to page 10 when changing items per page
    setCurrentPageNumber(1);
    setInputRange(1);
    localStorage.setItem("currentPageValueInFavoriteLocal", "1");
  };

  const handleToggleMoreChannelsLayout = () => {
    setShowMoreChannelsInGridView((prev) => {
      const newValue = !prev;
      localStorage.setItem(
        "showMoreChannelsInGridViewInFavoriteLocal",
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
    <FavoritesContext.Provider value={getValues}>
      {children}
    </FavoritesContext.Provider>
  );
};

FavoritesProvider.propTypes = {
  children: PropTypes.node,
};

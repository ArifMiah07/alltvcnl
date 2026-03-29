/**
 *
 *  ------  Sorry, I have to write comments for context, whole codebase needs a
 *  ------  massive refactoring but anyway, refactoring can be done later.
 *  ------  current problem is hard to catch the codebase and files context.
 *  ------  each block of code needs explanation comment.
 *
 */

/**
 *  ______IMPORT______
 */

import { useState } from "react";
import { FavoritesContext } from "./FavoritesContext";
import PropTypes from "prop-types";
import { toast } from "sonner";

/**
 *  ______COMPONENT______
 */

export const FavoritesProvider = ({ children }) => {
  /**
   * ------------------------
   * ------React States------
   * ------------------------
   */

  // current page number -- set and get from local storage
  const [currentPageNumber, setCurrentPageNumber] = useState(() => {
    // direct init from local storage
    const stored = localStorage.getItem("currentPageValueInFavoriteLocal");
    return stored ? Number(stored) : 1;
  });

  // input range to set current page number safely
  const [inputRange, setInputRange] = useState(currentPageNumber);

  // channel per page number -- set and get from local storage
  const [channelsPerPage, setChannelsPerPage] = useState(() => {
    // direct init from local storage
    const stored = localStorage.getItem("channelsPerPageValueInFavoriteLocal");
    // get value from localStorage, else return 10
    return stored ? Number(stored) : 10;
  });

  // input range to set channel per page number safely
  const [channelsInput, setChannelsInput] = useState(channelsPerPage);

  // total bookmarked items in local storage -- default value 0
  const [totalItems, setTotalItems] = useState(0);

  // show as list layout view or grid layout view in sidebar
  const [showMoreChannelsInGridView, setShowMoreChannelsInGridView] = useState(
    () => {
      const stored = localStorage.getItem(
        "showMoreChannelsInGridViewInFavoriteLocal",
      );
      return stored === "true";
    },
  );

  /**
   * ---------------------------
   * ------React Variables------
   * ---------------------------
   */

  // define numbers of pages
  const numbersOfPages = Math.ceil(totalItems / channelsPerPage);

  // define start index
  const startIndex = (currentPageNumber - 1) * channelsPerPage;

  // define end index
  const endIndex = currentPageNumber * channelsPerPage;

  /**
   * -----------------------------------
   * ------React Handler Functions------
   * -----------------------------------
   */

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

  // handle toggling more channels layout
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

  /**
   * -----------------------
   * ------Props Value------
   * -----------------------
   */

  // return props value
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

  /**
   * -----------------------------------
   * ------Return Context Provider------
   * -----------------------------------
   */

  return (
    <FavoritesContext.Provider value={getValues}>
      {children}
    </FavoritesContext.Provider>
  );
};

/**
 *  ______PropTypes______
 */

FavoritesProvider.propTypes = {
  children: PropTypes.node,
};

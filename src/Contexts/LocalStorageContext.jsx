//

import { createContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useState } from "react";

//
export const LocalStorageContext = createContext();

//
export const LocalStorageProvider = ({ children }) => {
  // states
  const [bookmarkedChannel, setBookmarkedChannel] = useState(() => {
    const stored = localStorage.getItem("bookmarkedChannelsLocal");
    return stored ? JSON.parse(stored) : {};
  });
  // Sync to localStorage whenever bookmarkedChannel changes
  useEffect(() => {
    localStorage.setItem(
      "bookmarkedChannelsLocal",
      JSON.stringify(bookmarkedChannel),
    );
  }, [bookmarkedChannel]);
  // handle
  // handle bookmark channels
  const handleBookmarkChannelToggle = (channelUrl) => {
    setBookmarkedChannel((prev) => {
      const newState = { ...prev };

      if (newState[channelUrl]) {
        // If already bookmarked, REMOVE it from the object
        delete newState[channelUrl];
      } else {
        // If not bookmarked, ADD it with value true
        newState[channelUrl] = true;
      }

      return newState;
    });
  };

  console.log(bookmarkedChannel);

  const getValues = {
    bookmarkedChannel,
    setBookmarkedChannel,
    handleBookmarkChannelToggle,
  };
  return (
    <LocalStorageContext.Provider value={getValues}>
      {children}
    </LocalStorageContext.Provider>
  );
};

LocalStorageProvider.propTypes = {
  children: PropTypes.node,
};

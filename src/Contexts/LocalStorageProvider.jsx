//

import { useEffect } from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { LocalStorageContext } from "./LocalStorageContext";

//
export const LocalStorageProvider = ({ children }) => {
  // bookmarked states
  const [bookmarkedChannel, setBookmarkedChannel] = useState(() => {
    const stored = localStorage.getItem("bookmarkedChannelsLocal");
    return stored ? JSON.parse(stored) : {};
  });
  // expanded state
  const [expandedChannel, setExpandedChannel] = useState(() => {
    const stored = localStorage.getItem("expandedChannelsLocal");
    return stored ? JSON.parse(stored) : {};
  });

  // Sync to localStorage whenever bookmarkedChannel changes
  useEffect(() => {
    localStorage.setItem(
      "bookmarkedChannelsLocal",
      JSON.stringify(bookmarkedChannel),
    );
  }, [bookmarkedChannel]);

  // expanded effect
  useEffect(() => {
    localStorage.setItem(
      "expandedChannelsLocal",
      JSON.stringify(expandedChannel),
    );
  }, [expandedChannel]);
  // handle
  // handle bookmark channels
  const handleBookmarkChannelToggle = (streamItem) => {
    // ← Receive full object
    setBookmarkedChannel((prev) => {
      const newState = { ...prev };
      if (newState[streamItem.url]) {
        // If already bookmarked, REMOVE it
        delete newState[streamItem.url];
      } else {
        // If not bookmarked, ADD full object
        newState[streamItem.url] = streamItem; // ← Store whole object
      }
      return newState;
    });
  };
  // handle toggle expand
  const handleToggleExpand = (streamItem) => {
    // ← Receive full object
    setExpandedChannel((prev) => {
      const newState = { ...prev };
      if (newState[streamItem.url]) {
        // If already bookmarked, REMOVE it
        delete newState[streamItem.url];
      } else {
        // If not bookmarked, ADD full object
        newState[streamItem.url] = streamItem; // ← Store whole object
      }
      return newState;
    });
  };

  // console.log(bookmarkedChannel);

  const getValues = {
    bookmarkedChannel,
    setBookmarkedChannel,
    handleBookmarkChannelToggle,
    expandedChannel,
    setExpandedChannel,
    handleToggleExpand,
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

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { PaginationContext } from "./PaginationContext";
import { PlaylistStorage } from "../services/playlistStorage";

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

  // show as list or grid
  const [showMoreChannelsInGridView, setShowMoreChannelsInGridView] = useState(
    () => {
      const stored = localStorage.getItem("showMoreChannelsInGridViewLocal");
      return stored === "true";
    },
  );

  // playlist creation::
  const [addToPlaylist, setAddToPlaylist] = useState({});
  const [playlists, setPlaylists] = useState({ default: [], watch_later: [] });
  const [playlistNameInput, setPlaylistNameInput] = useState("default");
  const [loading, setLoading] = useState(true);
  const [channel, setChannel] = useState({});

  // variables
  // let channelsPerPage;
  const numbersOfPages = Math.ceil(totalItems / channelsPerPage);
  const startIndex = (currentPage - 1) * channelsPerPage;
  const endIndex = currentPage * channelsPerPage;

  // effects
  useEffect(() => {
    async function loadData() {
      const data = await PlaylistStorage.getPlaylists();
      setPlaylists(data.playlists);
      setLoading(false);
      //console.log(playlists);
    }

    loadData();
  }, []);

  // handler functions

  // handle add playlist
  // const handleAdd = aysnc(e) => {
  //   e.preventDefault();
  //   console.log(playlistNameInput);
  // }
  // handle playlist creation
  const handlePlaylistCreation = (streamItem) => {
    setAddToPlaylist((prev) => {
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

    setChannel(streamItem);
    //console.log(addToPlaylist, streamItem);
  };

  const handleAddPlatlists = async (e) => {
    e.preventDefault();
    if (!playlistNameInput.trim()) return;

    setPlaylists((prev) => ({
      ...prev,
      [playlistNameInput]: [],
    }));
    setPlaylistNameInput(""); // Reset input
    const categoryKey = playlistNameInput.trim().toLowerCase();

    await PlaylistStorage.addChannel(categoryKey, channel);

    // Refresh state from storage
    const updated = await PlaylistStorage.getPlaylists();
    setPlaylists(updated.playlists);

    // console.log(
    //   "playlistsplaylistsplaylistsplaylists: ",
    //   await PlaylistStorage.getPlaylists(),
    // );
  };

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

  const handleToggleMoreChannelsLayout = () => {
    setShowMoreChannelsInGridView((prev) => {
      const newValue = !prev;
      localStorage.setItem(
        "showMoreChannelsInGridViewLocal",
        newValue.toString(),
      );
      return newValue;
    });
  };

  // const handleToggleExpand = (streamItem) => {
  //   // ← Receive full object
  //   setExpandedChannel((prev) => {
  //     const newState = { ...prev };
  //     if (newState[streamItem.url]) {
  //       // If already bookmarked, REMOVE it
  //       delete newState[streamItem.url];
  //     } else {
  //       // If not bookmarked, ADD full object
  //       newState[streamItem.url] = streamItem; // ← Store whole object
  //     }
  //     return newState;
  //   });
  // };

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
    addToPlaylist,
    setAddToPlaylist,
    handlePlaylistCreation,
    playlistNameInput,
    playlists,
    setPlaylists,
    setPlaylistNameInput,
    handleAddPlatlists,
    loading,
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

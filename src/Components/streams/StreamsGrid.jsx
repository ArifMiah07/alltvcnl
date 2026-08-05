import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import HlsVideoPlayer from "../hls-video-player/HlsVideoPlayer";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { usePagination } from "../../hooks/usePagination";

import {
  Bookmark,
  BookmarkCheck,
  Fullscreen,
  MonitorPlay,
  ListPlus,
  ChevronsUpDown,
  ChevronsDownUp,
  Plus,
} from "lucide-react";

const StreamsGrid = ({ streams, currentPage, channelsPerPage }) => {
  // react states
  // eslint-disable-next-line no-unused-vars
  const [specificChannelStream, setSpecificChannelStream] = useState({});
  // const [bookmarkedChannel, setBookmarkedChannel] = useState({});
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const {
    showMoreChannelsInGridView,
    addToPlaylist,
    // eslint-disable-next-line no-unused-vars
    setAddToPlaylist,
    handlePlaylistCreation,
  } = usePagination();

  const {
    bookmarkedChannel,
    // setBookmarkedChannel,
    handleBookmarkChannelToggle,
    expandedChannel,
    // setExpandedChannel,
    handleToggleExpand,
  } = useLocalStorage();
  // const [specificChannelParams, setSpecificChannelParams] = useState({});

  // handler functions
  // handle a specific channels stream
  const handleSpecificChannelStream = (channelInfo) => {
    setSpecificChannelStream(channelInfo);
    // setSpecificChannelParams(channelInfo);
  };

  const handleCreatePlaylistSubmit = (e) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) return;

    // Call your playlist creation function here
    // e.g., createNewPlaylist(newPlaylistName, stream_item);

    setNewPlaylistName(""); // Reset input field
  };

  return (
    <div className=" col-span-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-center justify-items-center gap-4 p-4  ">
      {showMoreChannelsInGridView ? (
        streams ? (
          streams?.map((stream_item, stream_index) => (
            // player container
            <div
              className=" w-full h-full flex flex-col items-center justify-center border border-rose-50 bg-radial-[at_50%_75%] from-sky-100 via-violet-100 to-fuchsia-100 to-90%"
              key={stream_index}>
              {/* user actions */}
              <div className="w-full flex flex-col flex-wrap">
                {/* channel info */}
                <div className="flex gap-2 px-2 text-[18px]">
                  {/* channel number */}
                  <span className="font-medium dark:text-white">
                    {(currentPage - 1) * channelsPerPage + (stream_index + 1)}.
                  </span>
                  {/* channel name or title */}
                  <p className="dark:text-white break-normal md:break-all">
                    {stream_item?.channel
                      ? stream_item.channel
                      : stream_item.title}
                  </p>
                </div>
                {/* basic actions */}
                <div className="w-full flex flex-row gap-2 flex-wrap items-center p-2  ">
                  {/* stream a specific channel */}
                  <span
                    onClick={() => handleSpecificChannelStream({ stream_item })}
                    className=" flex flex-col items-center justify-center rounded-sm bg-purple-200 hover:bg-purple-300  w-6 h-6 ">
                    <Link
                      to={`/specific-channel/${
                        (currentPage - 1) * channelsPerPage + (stream_index + 1)
                      }/${encodeURIComponent(
                        stream_item.channel || stream_item.title,
                      )}`}
                      state={{ streamData: stream_item }}>
                      {/* /${
                    stream_item.channel
                      ? stream_item.channel
                      : stream_item.title
                  } */}
                      <Fullscreen className="" />
                    </Link>
                  </span>
                  {/* stream a specific channel on browser in a separate tab */}
                  <span className=" flex flex-col items-center justify-center rounded-sm bg-purple-200 hover:bg-purple-300  w-6 h-6 ">
                    <a
                      href={`${stream_item.url}`}
                      target="_blank"
                      rel="noopener noreferrer">
                      <MonitorPlay />
                    </a>
                  </span>
                  {/* bookmark a specific channel */}
                  {/* save or locally or save to a playlist <localStorage || default, playlist name> */}
                  <span
                    onClick={() => handleBookmarkChannelToggle(stream_item)}
                    className=" flex flex-col items-center justify-center rounded-sm bg-purple-200 hover:bg-purple-300  w-6 h-6 ">
                    {bookmarkedChannel[stream_item.url] ? (
                      <BookmarkCheck />
                    ) : (
                      <Bookmark />
                    )}
                  </span>
                  <div
                    onClick={() => handlePlaylistCreation(stream_item)}
                    className="relative flex flex-col items-center justify-center rounded-sm bg-purple-200 hover:bg-purple-300  w-6 h-6 ">
                    <ListPlus />
                  </div>
                  <span
                    onClick={() => handleToggleExpand(stream_item)}
                    className=" flex flex-col items-center justify-center rounded-sm bg-purple-200 hover:bg-purple-300  w-6 h-6 ">
                    {expandedChannel[stream_item.url] ? (
                      <ChevronsDownUp />
                    ) : (
                      <ChevronsUpDown />
                    )}
                  </span>

                  {(stream_item.feed || stream_item.quality) && (
                    <div className="flex flex-row gap-3 dark:text-white ">
                      {stream_item.feed && <p>{stream_item.feed}</p>}
                      {stream_item.quality && <p>{stream_item.quality}</p>}
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full h-full flex flex-col border border-green-50  ">
                <HlsVideoPlayer
                  src={stream_item?.url}
                  status={stream_item?.status}
                  controls
                  autoPlay={false}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="dark:text-white">No streams to play</p>
        )
      ) : streams ? (
        streams?.map((stream_item, stream_index) => (
          // player container
          <div
            className=" w-full h-fit flex flex-col items-start justify-start border border-rose-50 bg-radial-[at_50%_75%] from-sky-100 via-violet-100 to-fuchsia-100 to-90%"
            key={stream_index}>
            {/* user actions */}
            <div className="w-full flex flex-col flex-wrap">
              {/* channel info */}
              <div className="flex gap-2 px-2 text-[18px]">
                {/* channel number */}
                <span className="font-medium dark:text-white">
                  {(currentPage - 1) * channelsPerPage + (stream_index + 1)}.
                </span>
                {/* channel name or title */}
                <p className="dark:text-white break-normal md:break-all">
                  {stream_item?.channel
                    ? stream_item.channel
                    : stream_item.title}
                </p>
              </div>
              {/* basic actions */}
              <div className="relative w-full flex flex-row gap-2 flex-wrap items-center p-2  ">
                {/* stream a specific channel */}
                <span
                  onClick={() => handleSpecificChannelStream({ stream_item })}
                  className=" flex flex-col items-center justify-center rounded-sm bg-purple-200 hover:bg-purple-300  w-6 h-6 ">
                  <Link
                    to={`/specific-channel/${
                      (currentPage - 1) * channelsPerPage + (stream_index + 1)
                    }/${encodeURIComponent(
                      stream_item.channel || stream_item.title,
                    )}`}
                    state={{ streamData: stream_item }}>
                    {/* /${
                    stream_item.channel
                      ? stream_item.channel
                      : stream_item.title
                  } */}
                    <Fullscreen className="" />
                  </Link>
                </span>
                {/* stream a specific channel on browser in a separate tab */}
                <span className=" flex flex-col items-center justify-center rounded-sm bg-purple-200 hover:bg-purple-300  w-6 h-6 ">
                  <a
                    href={`${stream_item.url}`}
                    target="_blank"
                    rel="noopener noreferrer">
                    <MonitorPlay />
                  </a>
                </span>
                {/* bookmark a specific channel */}
                {/* save or locally or save to a playlist <localStorage || default, playlist name> */}
                <span
                  onClick={() => handleBookmarkChannelToggle(stream_item)}
                  className=" flex flex-col items-center justify-center rounded-sm bg-purple-200 hover:bg-purple-300  w-6 h-6 ">
                  {bookmarkedChannel[stream_item.url] ? (
                    <BookmarkCheck />
                  ) : (
                    <Bookmark />
                  )}
                </span>
                <span
                  onClick={() => handlePlaylistCreation(stream_item)}
                  className=" flex flex-col items-center justify-center rounded-sm bg-purple-200 hover:bg-purple-300  w-6 h-6 ">
                  <ListPlus />
                </span>
                <span
                  onClick={() => handleToggleExpand(stream_item)}
                  className=" flex flex-col items-center justify-center rounded-sm bg-purple-200 hover:bg-purple-300  w-6 h-6 ">
                  {expandedChannel[stream_item.url] ? (
                    <ChevronsDownUp />
                  ) : (
                    <ChevronsUpDown />
                  )}
                </span>
                {addToPlaylist[stream_item.url] && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-[9999] p-3 text-gray-800">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-1">
                      Save to...
                    </h4>

                    {/* Playlist Checkbox List */}
                    <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
                      <label className="flex items-center gap-2 text-sm p-1.5 hover:bg-gray-100 rounded cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          className="rounded text-purple-600 focus:ring-purple-500"
                        />
                        <span className="truncate select-none">Favorites</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm p-1.5 hover:bg-gray-100 rounded cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          className="rounded text-purple-600 focus:ring-purple-500"
                        />
                        <span className="truncate select-none">
                          Watch Later
                        </span>
                      </label>
                    </div>

                    <hr className="my-2.5 border-gray-100" />

                    {/* Embedded Quick-Create Input Form */}
                    <form
                      onSubmit={handleCreatePlaylistSubmit}
                      className="flex items-center gap-1.5">
                      <input
                        type="text"
                        placeholder="New playlist name..."
                        value={newPlaylistName}
                        onChange={(e) => setNewPlaylistName(e.target.value)}
                        className="w-full text-xs px-2.5 py-1.5 border border-gray-200 rounded bg-gray-50 focus:bg-white focus:outline-none focus:border-purple-500 transition-colors"
                      />
                      <button
                        type="submit"
                        disabled={!newPlaylistName.trim()}
                        title="Create Playlist"
                        className="bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white p-1.5 rounded transition-opacity flex items-center justify-center shrink-0">
                        <Plus className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                )}
                {/*
                {(stream_item.feed || stream_item.quality) && (
                  <div className="flex flex-row gap-3 dark:text-white ">
                    {stream_item.feed && <p>{stream_item.feed}</p>}
                    {stream_item.quality && <p>{stream_item.quality}</p>}
                  </div>
                )} */}

                {expandedChannel[stream_item.url] ? (
                  <div className="w-full h-full flex flex-col border border-green-50  ">
                    <HlsVideoPlayer
                      src={stream_item?.url}
                      status={stream_item?.status}
                      controls
                      autoPlay={false}
                    />
                  </div>
                ) : (
                  (stream_item.feed || stream_item.quality) && (
                    <div className="flex flex-row gap-3 dark:text-white ">
                      {stream_item.feed && <p>{stream_item.feed}</p>}
                      {stream_item.quality && <p>{stream_item.quality}</p>}
                    </div>
                  )
                )}
              </div>
            </div>
            {/* <div className="w-full h-full flex flex-col border border-green-50  ">
              <HlsVideoPlayer
                src={stream_item?.url}
                controls
                autoPlay={false}
              />
            </div> */}
          </div>
        ))
      ) : (
        <p className="dark:text-white">No streams to play</p>
      )}
    </div>
  );
};

export default StreamsGrid;

StreamsGrid.propTypes = {
  streams: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  channelsPerPage: PropTypes.number.isRequired,
};

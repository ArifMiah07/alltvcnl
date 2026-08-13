import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import HlsVideoPlayer from "../hls-video-player/HlsVideoPlayer";

import {
  Bookmark,
  BookmarkCheck,
  Fullscreen,
  MonitorPlay,
  ListPlus,
  ChevronsUpDown,
  ChevronsDownUp,
} from "lucide-react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
// import { usePagination } from "../../hooks/usePagination";
import { useVerifiedStream } from "../../hooks/useVerifiedStream";

const StreamsGrid = ({ streams, currentPage, channelsPerPage }) => {
  // react states
  // eslint-disable-next-line no-unused-vars
  const [specificChannelStream, setSpecificChannelStream] = useState({});
  // const [bookmarkedChannel, setBookmarkedChannel] = useState({});
  const { showMoreChannelsInGridView } = useVerifiedStream();

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

  return (
    <div className=" col-span-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-center justify-items-center gap-4 p-4  ">
      {showMoreChannelsInGridView ? (
        streams ? (
          streams?.map((stream_item, stream_index) => (
            // player container
            <div
              className=" w-full h-fit flex flex-col justify-start border border-rose-50 bg-radial-[at_50%_75%] from-sky-100 via-violet-100 to-fuchsia-100 to-90% "
              key={stream_index}>
              {/* user actions - Top row matching your wireframe: [Logo] [Title / Controls] */}
              <div className="w-full flex flex-row flex-nowrap items-center ">
                {/* logo */}
                <div className="flex flex-row items-center justify-center shrink-0 p-1">
                  <img
                    src={stream_item?.logo || "/favicon.png"}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/favicon.png";
                    }}
                    /* Dual contrast shadow gives ANY logo (black, white, colored) an edge boundary */
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain rounded p-1 bg-slate-500/20 backdrop-blur-sm border border-black/10 dark:border-white/10 [filter:drop-shadow(0px_0px_1px_rgba(0,0,0,0.8))_drop-shadow(0px_0px_1px_rgba(255,255,255,0.8))] shrink-0"
                    alt={`logo of channel ${stream_item?.channel ? stream_item.channel : stream_item.title}`}
                  />
                </div>
                {/* basic actions - Takes remaining horizontal space */}
                <div className=" flex-1 min-w-0">
                  {/* channel info */}
                  <div className="flex gap-2 px-2 text-[18px]">
                    {/* channel number */}
                    <span className="font-medium dark:text-white shrink-0">
                      {(currentPage - 1) * channelsPerPage + (stream_index + 1)}
                      .
                    </span>
                    {/* channel name or title */}
                    <p className="dark:text-white break-normal md:break-all truncate">
                      {stream_item?.channel
                        ? stream_item.channel
                        : stream_item.title}
                    </p>
                  </div>

                  <div className="w-full flex flex-row gap-2 flex-wrap items-center p-2  ">
                    {/* stream a specific channel */}
                    <span
                      onClick={() =>
                        handleSpecificChannelStream({ stream_item })
                      }
                      className=" flex flex-col items-center justify-center rounded-sm bg-purple-200 hover:bg-purple-300  w-6 h-6 ">
                      <Link
                        to={`/specific-verified-channel/${
                          (currentPage - 1) * channelsPerPage +
                          (stream_index + 1)
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

                    <span className=" flex flex-col items-center justify-center rounded-sm bg-purple-200 hover:bg-purple-300  w-6 h-6 ">
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

                    {(stream_item.feed || stream_item.quality) && (
                      <div className="flex flex-row gap-3 dark:text-white ">
                        {stream_item.feed && <p>{stream_item.feed}</p>}
                        {stream_item.quality && <p>{stream_item.quality}</p>}
                      </div>
                    )}

                    {/* {!expandedChannel[stream_item.url] &&
                    (stream_item.feed || stream_item.quality) && (
                      <div className="flex flex-row gap-3 dark:text-white ">
                        {stream_item.feed && <p>{stream_item.feed}</p>}
                        {stream_item.quality && <p>{stream_item.quality}</p>}
                      </div>
                    )} */}
                  </div>
                </div>
              </div>

              {/* Expanded Video Player container placed at bottom spanning full card width */}
              {/* {expandedChannel[stream_item.url] && (
                <div className="w-full h-full flex flex-col border border-green-50">
                  <HlsVideoPlayer
                    src={stream_item?.url}
                    status={stream_item?.status}
                    controls
                    autoPlay={false}
                  />
                </div>
              )} */}

              <div className="w-full h-full flex flex-col border border-green-50  ">
                <HlsVideoPlayer
                  src={stream_item?.url}
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
            className=" w-full h-fit flex flex-col justify-start border border-rose-50 bg-radial-[at_50%_75%] from-sky-100 via-violet-100 to-fuchsia-100 to-90% "
            key={stream_index}>
            {/* user actions - Top row matching your wireframe: [Logo] [Title / Controls] */}
            <div className="w-full flex flex-row flex-nowrap items-center ">
              {/* logo */}
              <div className="flex flex-row items-center justify-center shrink-0 p-1">
                <img
                  src={stream_item?.logo || "/favicon.png"}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/favicon.png";
                  }}
                  /* Dual contrast shadow gives ANY logo (black, white, colored) an edge boundary */
                  className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain rounded p-1 bg-slate-500/20 backdrop-blur-sm border border-black/10 dark:border-white/10 [filter:drop-shadow(0px_0px_1px_rgba(0,0,0,0.8))_drop-shadow(0px_0px_1px_rgba(255,255,255,0.8))] shrink-0"
                  alt={`logo of channel ${stream_item?.channel ? stream_item.channel : stream_item.title}`}
                />
              </div>
              {/* basic actions - Takes remaining horizontal space */}
              <div className=" flex-1 min-w-0">
                {/* channel info */}
                <div className="flex gap-2 px-2 text-[18px]">
                  {/* channel number */}
                  <span className="font-medium dark:text-white shrink-0">
                    {(currentPage - 1) * channelsPerPage + (stream_index + 1)}.
                  </span>
                  {/* channel name or title */}
                  <p className="dark:text-white break-normal md:break-all truncate">
                    {stream_item?.channel
                      ? stream_item.channel
                      : stream_item.title}
                  </p>
                </div>

                <div className="w-full flex flex-row gap-2 flex-wrap items-center p-2  ">
                  {/* stream a specific channel */}
                  <span
                    onClick={() => handleSpecificChannelStream({ stream_item })}
                    className=" flex flex-col items-center justify-center rounded-sm bg-purple-200 hover:bg-purple-300  w-6 h-6 ">
                    <Link
                      to={`/specific-verified-channel/${
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

                  <span className=" flex flex-col items-center justify-center rounded-sm bg-purple-200 hover:bg-purple-300  w-6 h-6 ">
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

                  {(stream_item.feed || stream_item.quality) && (
                    <div className="flex flex-row gap-3 dark:text-white ">
                      {stream_item.feed && <p>{stream_item.feed}</p>}
                      {stream_item.quality && <p>{stream_item.quality}</p>}
                    </div>
                  )}

                  {/* {!expandedChannel[stream_item.url] &&
                    (stream_item.feed || stream_item.quality) && (
                      <div className="flex flex-row gap-3 dark:text-white ">
                        {stream_item.feed && <p>{stream_item.feed}</p>}
                        {stream_item.quality && <p>{stream_item.quality}</p>}
                      </div>
                    )} */}
                </div>
              </div>
            </div>

            {/* Expanded Video Player container placed at bottom spanning full card width */}
            {expandedChannel[stream_item.url] && (
              <div className="w-full h-full flex flex-col border border-green-50">
                <HlsVideoPlayer
                  src={stream_item?.url}
                  status={stream_item?.status}
                  controls
                  autoPlay={false}
                />
              </div>
            )}

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

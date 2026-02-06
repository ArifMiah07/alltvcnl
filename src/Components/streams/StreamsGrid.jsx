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
} from "lucide-react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const StreamsGrid = ({ streams, currentPage, channelsPerPage }) => {
  // react states
  const [specificChannelStream, setSpecificChannelStream] = useState({});
  // const [bookmarkedChannel, setBookmarkedChannel] = useState({});
  const {
    bookmarkedChannel,
    // setBookmarkedChannel,
    handleBookmarkChannelToggle,
  } = useLocalStorage();
  // const [specificChannelParams, setSpecificChannelParams] = useState({});

  // handler functions
  // handle a specific channels stream
  const handleSpecificChannelStream = (channelInfo) => {
    setSpecificChannelStream(channelInfo);
    // setSpecificChannelParams(channelInfo);
  };
  // console.log(specificChannelParams);
  // handle bookmark toggle
  // const handleBookmarkChannelToggle = (streamUrl) => {
  //   setBookmarkedChannel((prev) => ({
  //     ...prev,
  //     [streamUrl]: !prev[streamUrl],
  //   }));
  // };

  // console
  // console.log(specificChannelStream);

  return (
    <div className=" w-full h-full col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 items-center justify-items-center gap-4 p-4  ">
      {streams ? (
        streams?.map((stream_item, stream_index) => (
          // player container
          <div
            className=" w-full h-full flex flex-col items-center justify-center border border-rose-50 bg-radial-[at_50%_75%] from-sky-100 via-violet-100 to-fuchsia-100 to-90%"
            key={stream_index}>
            {/* user actions */}
            <div className="w-full flex flex-col flex-wrap">
              {/* channel info */}
              <div className="flex gap-2 px-2">
                {/* channel number */}
                <span className="font-medium dark:text-white">
                  {(currentPage - 1) * channelsPerPage + (stream_index + 1)}.
                </span>
                {/* channel name or title */}
                <p className="dark:text-white">
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
                  className=" flex flex-col items-center justify-center rounded-sm bg-purple-200 hover:bg-purple-300 w-6 h-6 ">
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
                <span className=" flex flex-col items-center justify-center rounded-sm bg-purple-200 hover:bg-purple-300 w-6 h-6 ">
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
                  className=" flex flex-col items-center justify-center rounded-sm bg-purple-200 hover:bg-purple-300 w-6 h-6 ">
                  {bookmarkedChannel[stream_item.url] ? (
                    <BookmarkCheck />
                  ) : (
                    <Bookmark />
                  )}
                </span>
                <span className=" flex flex-col items-center justify-center rounded-sm bg-purple-200 hover:bg-purple-300 w-6 h-6 ">
                  <ListPlus />
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
                controls
                autoPlay={false}
              />
            </div>
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

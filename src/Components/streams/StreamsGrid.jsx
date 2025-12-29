import ReactPlayer from "react-player";
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";
import { HiViewfinderCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  // MediaPlaybackRateButton,
  MediaPlayButton,
  // MediaSeekBackwardButton,
  // MediaSeekForwardButton,
  MediaMuteButton,
  MediaFullscreenButton,
  MediaCaptionsButton,
  MediaPipButton,
} from "media-chrome/react";

const StreamsGrid = ({ streams, currentPage, channelsPerPage }) => {
  // react states
  const [specificChannelStream, setSpecificChannelStream] = useState({});
  const [bookmarks, setBookmark] = useState({});
  // const [specificChannelParams, setSpecificChannelParams] = useState({});

  // handler functions
  // handle a specific channels stream
  const handleSpecificChannelStream = (channelInfo) => {
    setSpecificChannelStream(channelInfo);
    // setSpecificChannelParams(channelInfo);
  };
  // console.log(specificChannelParams);
  // handle bookmark toggle
  const handleBookmarkToggle = (streamUrl) => {
    setBookmark((prev) => ({
      ...prev,
      [streamUrl]: !prev[streamUrl],
    }));
  };

  // console
  console.log(specificChannelStream);

  return (
    <div className=" w-full h-full col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 items-center justify-items-center gap-4 p-4  ">
      {streams ? (
        streams?.map((stream_item, stream_index) => (
          <div
            className=" w-full h-full flex flex-col items-center justify-center border border-rose-50 bg-radial-[at_50%_75%] from-sky-100 via-violet-100 to-fuchsia-100 to-90%"
            key={stream_index}>
            <div className="w-full flex flex-col flex-wrap">
              {/* channel info */}
              <div className="flex gap-2 px-2">
                {/* channel number */}
                <span className="font-medium">
                  {(currentPage - 1) * channelsPerPage + (stream_index + 1)}.
                </span>
                {/* channel name or title */}
                <p>
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
                      stream_item.channel || stream_item.title
                    )}`}
                    state={{ streamData: stream_item }}>
                    {/* /${
                    stream_item.channel
                      ? stream_item.channel
                      : stream_item.title
                  } */}
                    <HiViewfinderCircle className="" />
                  </Link>
                </span>
                {/* bookmark a specific channel */}
                {/* save or locally or save to a playlist <localStorage || default, playlist name> */}
                <span
                  onClick={() => handleBookmarkToggle(stream_item.url)}
                  className=" flex flex-col items-center justify-center rounded-sm bg-purple-200 hover:bg-purple-300 w-6 h-6 ">
                  {bookmarks[stream_item.url] ? (
                    <MdOutlineStar />
                  ) : (
                    <MdOutlineStarBorder />
                  )}
                </span>
                <span>{""}</span>
              </div>
            </div>
            <div className="w-full h-full flex flex-col border border-green-50  ">
              <MediaController
                style={{
                  width: "100%",
                  aspectRatio: "16/9",
                  "--media-control-background": "rgba(0, 0, 0, 0.8)",
                  "--media-control-hover-background": "rgba(0, 0, 0, 0.9)",
                  "--media-icon-color": "#ffffff",
                  "--media-text-color": "#ffffff",
                  "--media-range-track-background": "rgba(255, 255, 255, 0.3)",
                  "--media-range-bar-color": "#8b5cf6",
                  "--media-range-thumb-background": "#ffffff",
                }}>
                <ReactPlayer
                  // pip={true}
                  slot="media"
                  controls={false}
                  src={stream_item.url}
                  style={{
                    width: "100%",
                    height: "100%",
                    "--controls": "none",
                  }}>
                  {" "}
                </ReactPlayer>

                <MediaControlBar
                  style={{
                    // background: "red",
                    "--media-control-padding": "2px",
                    // gap: "2px",
                  }}>
                  <MediaPlayButton />
                  {/* <MediaSeekBackwardButton seekOffset={10} />
                  <MediaSeekForwardButton seekOffset={10} /> */}
                  <MediaTimeRange />
                  <MediaTimeDisplay showDuration />
                  {/* Volume control group with hover - use onMouseEnter/onMouseLeave */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      position: "relative",
                    }}
                    onMouseEnter={(e) => {
                      const volumeRange =
                        e.currentTarget.querySelector("media-volume-range");
                      if (volumeRange) {
                        volumeRange.style.width = "60px";
                        volumeRange.style.opacity = "1";
                      }
                    }}
                    onMouseLeave={(e) => {
                      const volumeRange =
                        e.currentTarget.querySelector("media-volume-range");
                      if (volumeRange) {
                        volumeRange.style.width = "0";
                        volumeRange.style.opacity = "0";
                      }
                    }}>
                    <MediaMuteButton />
                    <MediaVolumeRange
                      style={{
                        width: "0",
                        opacity: "0",
                        transition: "width 0.2s ease, opacity 0.2s ease",
                        overflow: "hidden",
                      }}
                    />
                  </div>
                  {/*                   
                  <MediaMuteButton />
                  <MediaVolumeRange /> */}

                  {/* <MediaPlaybackRateButton /> */}
                  <MediaCaptionsButton />
                  <MediaFullscreenButton />
                  <MediaPipButton />
                </MediaControlBar>
              </MediaController>
            </div>
          </div>
        ))
      ) : (
        <p>No streams to play</p>
      )}
    </div>
  );
};

export default StreamsGrid;

StreamsGrid.propTypes = {
  streams: PropTypes.object.isRequired,
  currentPage: PropTypes.number.isRequired,
  channelsPerPage: PropTypes.number.isRequired,
};

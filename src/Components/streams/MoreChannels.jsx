import { HiViewfinderCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect } from "react";
// import { LuMonitorPlay } from "react-icons/lu";
import { FaDisplay } from "react-icons/fa6";

const MoreChannels = ({
  // streamData,
  // channel,
  channelIndex,
  streams,
  currentPage,
  channelsPerPage,
  handleSpecificChannelStream,
  //   numbersOfPages,
  handleCurrentPage,
}) => {
  // console.log(streamData);
  // console.log(channel, channelIndex);

  useEffect(() => {
    const cIndex = Math.ceil(Number(channelIndex) / 10);
    // console.log(cIndex);
    handleCurrentPage(cIndex);
  }, [channelIndex]);

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
      {streams ? (
        streams?.map((stream_item, stream_index) => (
          <div
            className=" w-full h-full  flex flex-row items-center justify-center p-2 bg-radial-[at_50%_75%] from-sky-100 via-violet-100 to-fuchsia-100 to-90%"
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
                  className=" flex flex-row items-center justify-center rounded-sm bg-purple-200 hover:bg-purple-300 w-6 h-6 ">
                  <Link
                    to={`/specific-channel/${
                      (currentPage - 1) * channelsPerPage + (stream_index + 1)
                    }/${encodeURIComponent(
                      stream_item.channel || stream_item.title,
                    )}`}
                    state={{ streamData: stream_item }}>
                    <HiViewfinderCircle className="" />
                  </Link>
                </span>
                {/* stream a specific channel on browser in a separate tab */}
                <span className=" flex flex-col items-center justify-center rounded-sm bg-purple-200 hover:bg-purple-300 w-6 h-6 ">
                  <a
                    href={`${stream_item.url}`}
                    target="_blank"
                    rel="noopener noreferrer">
                    <FaDisplay />
                  </a>
                </span>
                <span>{""}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No streams to play</p>
      )}
    </div>
  );
};

export default MoreChannels;

MoreChannels.propTypes = {
  streamData: PropTypes.object.isRequired,
  channel: PropTypes.string.isRequired,
  channelIndex: PropTypes.string.isRequired,
  streams: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  handleCurrentPage: PropTypes.func.isRequired,
  channelsPerPage: PropTypes.number.isRequired,
  handleSpecificChannelStream: PropTypes.func.isRequired,
  numbersOfPages: PropTypes.number.isRequired,
};

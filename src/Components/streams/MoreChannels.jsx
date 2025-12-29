import { HiViewfinderCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect } from "react";

const MoreChannels = ({
  streamData,
  channel,
  channelIndex,
  streams,
  currentPage,
  channelsPerPage,
  handleSpecificChannelStream,
  //   numbersOfPages,
  handleCurrentPage,
}) => {
  console.log(streamData);
  console.log(channel, channelIndex);

  useEffect(() => {
    const cIndex = Math.ceil(Number(channelIndex) / 10);
    console.log(cIndex);
    handleCurrentPage(cIndex);
  }, [channelIndex]);

  return (
    <div className="w-full grid grid-cols-5">
      {streams ? (
        streams?.map((stream_item, stream_index) => (
          <div
            className=" w-full h-full  flex flex-row items-center justify-center border border-red-500 p-2 bg-radial-[at_50%_75%] from-sky-100 via-violet-100 to-fuchsia-100 to-90%"
            key={stream_index}>
            <div className="w-full border border-pink-500 p-4 flex flex-col flex-wrap">
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
              <div className="w-full border border-yellow-600 flex flex-row gap-2 flex-wrap items-center p-2  ">
                {/* stream a specific channel */}
                <span
                  onClick={() => handleSpecificChannelStream({ stream_item })}
                  className=" border border-blue-500 flex flex-row items-center justify-center rounded-sm bg-purple-200 hover:bg-purple-300 w-6 h-6 ">
                  <Link
                    to={`/specific-channel/${
                      (currentPage - 1) * channelsPerPage + (stream_index + 1)
                    }/${encodeURIComponent(
                      stream_item.channel || stream_item.title
                    )}`}
                    state={{ streamData: stream_item }}>
                    <HiViewfinderCircle className="" />
                  </Link>
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

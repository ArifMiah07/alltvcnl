//

import { useLocation, useParams } from "react-router-dom";
import StreamSpecificChannelsDetails from "../../../Components/streams/StreamSpecificChannelsDetails";
import useFetchStreams from "../../../hooks/useFetch";
// import { HiViewfinderCircle } from "react-icons/hi2";
import { usePagination } from "../../../hooks/usePagination";
import { useState } from "react";
import MoreChannels from "../../../Components/streams/MoreChannels";
import Sidebar from "../../../Components/sidebar/Sidebar";

const StreamSpecificChannel = () => {
  // hooks
  const { channelIndex, channel } = useParams();
  const location = useLocation();
  const streamData = location.state?.streamData;
  const { streams, loading, error } = useFetchStreams();

  const {
    currentPage,
    numbersOfPages,
    inputRange,
    setInputRange,
    handleCurrentPage,
    handleGotoPage,
    handleNextPage,
    handlePrevPage,
    channelsPerPage,
    channelsInput,
    setChannelsInput,
    handleChannelsPerPage,
    totalItems,
    // setTotalItems,
  } = usePagination();

  // react states
  const [specificChannelStream, setSpecificChannelStream] = useState({});
  // const [bookmarks, setBookmark] = useState({});
  // const [specificChannelParams, setSpecificChannelParams] = useState({});
  console.log(specificChannelStream);
  // handler functions
  // handle a specific channels stream
  const handleSpecificChannelStream = (channelInfo) => {
    setSpecificChannelStream(channelInfo);
    // setSpecificChannelParams(channelInfo);
  };
  // console.log(specificChannelParams);
  // handle bookmark toggle
  // const handleBookmarkToggle = (streamUrl) => {
  //   setBookmark((prev) => ({
  //     ...prev,
  //     [streamUrl]: !prev[streamUrl],
  //   }));
  // };

  //

  console.log(streamData);
  console.log(streams);
  console.log(channelIndex, channel);
  return (
    <div className="border-4 border-red-500 p-4">
      {/* <h1>stream a specific channel</h1> */}
      <h1 className="font-medium mb-4">
        streaming : {channelIndex}. {channel}
      </h1>
      {/* stream specific channel */}
      <div className=" border-4 border-red-500 w-full min-h-screen flex flex-col lg:grid lg:grid-cols-12 ">
        <div className="col-span-9">
          <StreamSpecificChannelsDetails streamData={streamData} />
        </div>
        <div className="col-span-3 p-6">
          <Sidebar
            currentPage={currentPage}
            numbersOfPages={numbersOfPages}
            inputRange={inputRange}
            setInputRange={setInputRange}
            onNext={handleNextPage}
            onPrev={handlePrevPage}
            onGoto={handleGotoPage}
            channelsPerPage={channelsPerPage}
            channelsInput={channelsInput}
            setChannelsInput={setChannelsInput}
            handleChannelsPerPage={handleChannelsPerPage}
            totalChannels={totalItems}
          />
        </div>
        {/* <div className="">
        </div>
        <div>
        </div> */}
      </div>
      {/* other channels */}
      <div className="w-full border border-green-500">
        {loading && "loading..."}
        {error && "Error..."}
        {/* more channels suggestions */}
        <MoreChannels
          streamData={streamData}
          channelIndex={channelIndex}
          channel={channel}
          streams={streams}
          currentPage={currentPage}
          handleCurrentPage={handleCurrentPage}
          channelsPerPage={channelsPerPage}
          handleSpecificChannelStream={handleSpecificChannelStream}
        />
      </div>
    </div>
  );
};

export default StreamSpecificChannel;

//

import { useLocation, useParams } from "react-router-dom";
import StreamSpecificChannelsDetails from "../../../Components/streams/StreamSpecificChannelsDetails";
import useFetchStreams from "../../../hooks/useFetch";
import { usePagination } from "../../../hooks/usePagination";
import { useState } from "react";
import MoreChannels from "../../../Components/streams/MoreChannels";
import Sidebar from "../../../Components/sidebar/Sidebar";
import BackButton from "../../../Components/buttons/BackButton";

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

  // console.log(streamData);
  // console.log(streams);
  // console.log(channelIndex, channel);
  return (
    <div className="dark:bg-black p-4">
      {/* <h1>stream a specific channel</h1> */}
      <div className="flex flex-col items-start gap-2 my-6">
        <h1 className="font-medium dark:text-white dark:border dark:px-5 dark:py-2 ">
          streaming : {channel} ({channelIndex})
        </h1>
        <BackButton styles=" " />
      </div>
      {/* stream specific channel */}
      <div className="  w-full min-h-screen flex flex-col lg:grid lg:grid-cols-12 ">
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
      <div className="w-full border border-green-50">
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

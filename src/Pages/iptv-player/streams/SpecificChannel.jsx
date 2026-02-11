//

import { useLocation, useParams } from "react-router-dom";
import StreamSpecificChannelsDetails from "../../../Components/streams/StreamSpecificChannelsDetails";
import useFetchStreams from "../../../hooks/useFetch";
import { usePagination } from "../../../hooks/usePagination";
import { useState } from "react";
import MoreChannels from "../../../Components/streams/MoreChannels";
import Sidebar from "../../../Components/sidebar/Sidebar";
import BackButton from "../../../Components/buttons/BackButton";
import { useSettings } from "../../../hooks/useSettings";
import { Settings } from "lucide-react";

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

  const {
    hideSidebar,
    hideChannelsInfo,
    hideNavBar,
    handleSidebarVisibility,
    handleChannelsInfoVisibility,
    handleNavBarVisibility,
    handleSettings,
    isSettingModalOpen,
  } = useSettings();

  // react states
  const [specificChannelStream, setSpecificChannelStream] = useState({});
  // const [bookmarks, setBookmark] = useState({});
  // const [specificChannelParams, setSpecificChannelParams] = useState({});
  // console.log(specificChannelStream);
  // handler functions
  // handle a specific channels stream
  const handleSpecificChannelStream = (channelInfo) => {
    setSpecificChannelStream(channelInfo);
    // setSpecificChannelParams(channelInfo);
  };
  return (
    <div className="dark:bg-black p-4">
      {/* <h1>stream a specific channel</h1> */}
      <div className="flex flex-col items-start gap-2 my-6">
        <div className=" w-full  flex flex-row items-center justify-between gap-4">
          <h1 className="font-medium dark:text-white dark:border dark:px-5 dark:py-2 ">
            streaming : {channel} ({channelIndex})
          </h1>
          <div className="relative border">
            <button
              onClick={handleSettings}
              className="dark:text-white dark:border dark:px-5 dark:py-2  flex items-center justify-center border  ">
              <Settings />
            </button>
            {isSettingModalOpen && (
              <div className="absolute z-20 top-10 right-10 -translate-x-1 translate-y-1 bg-white/30 backdrop-blur-lg border  w-[400px] h-[248px]">
                <ul className=" flex flex-col gap-2 items-start justify-center p-2">
                  <li className=" dark:text-white hover:dark:text-green-500 flex flex-row gap-3 items-center justify-center">
                    <input
                      type="checkbox"
                      checked={hideSidebar}
                      onChange={(e) =>
                        handleSidebarVisibility(e.target.checked)
                      }
                    />
                    {hideSidebar ? (
                      <span>Unhide Sidebar</span>
                    ) : (
                      <span>Hide Sidebar</span>
                    )}
                  </li>
                  <li>
                    <li className=" dark:text-white hover:dark:text-green-500 flex flex-row gap-3 items-center justify-center">
                      <input
                        type="checkbox"
                        checked={hideNavBar}
                        onChange={(e) =>
                          handleNavBarVisibility(e.target.checked)
                        }
                      />
                      {hideNavBar ? (
                        <span>Unhide Navbar</span>
                      ) : (
                        <span>Hide Navbar</span>
                      )}
                    </li>
                  </li>
                  <li>
                    <button>Options</button>
                  </li>
                  <li>
                    <button>Options</button>
                  </li>
                  <li>
                    <button>Options</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <BackButton label=" " styles=" " />
      </div>
      {/* stream specific channel */}
      <div className=" w-full min-h-screen flex flex-col lg:grid lg:grid-cols-12 ">
        <div
          className={`  ${hideSidebar ? "z-10 col-span-12" : "col-span-9"}    `}>
          <StreamSpecificChannelsDetails streamData={streamData} />
        </div>
        <div
          // ${hideSidebar ? "hidden" : "visible"}
          className={`  col-span-3 p-6 ${hideSidebar ? "hidden" : "visible"} `}>
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

//

import { Link, useLocation, useParams } from "react-router-dom";
import StreamSpecificChannelsDetails from "../../../Components/streams/StreamSpecificChannelsDetails";
import useFetchStreams from "../../../hooks/useFetch";
import { usePagination } from "../../../hooks/usePagination";
import { useState } from "react";
import MoreChannels from "../../../Components/streams/MoreChannels";
import Sidebar from "../../../Components/sidebar/Sidebar";
import BackButton from "../../../Components/buttons/BackButton";
import { useSettings } from "../../../hooks/useSettings";
import { LayoutGrid, Settings } from "lucide-react";
import ActivityAnimated from "../../../Components/icons/ActivityAnimated";

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
    hidePaginationBtns,
    // setHidePaginationBtns,
    hideMoreChannelsSection,
    // setHideMoreChannelsSection,
    handlePaginationBtnsVisibility,
    handleMoreChannelsSectionVisibility,
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
    <div className="dark:bg-black p-4  ">
      {/* <h1>stream a specific channel</h1> */}
      <div className="flex flex-col items-start gap-2  ">
        <div
          className={` w-full flex flex-row items-center  ${hideChannelsInfo ? "justify-end" : "justify-between "} gap-4 `}>
          <h1
            className={` text-[18px] flex flex-row items-center justify-center gap-2 font-medium dark:text-white dark:border dark:px-5 dark:py-2 ${hideChannelsInfo ? "hidden" : "visible"}`}>
            <span className="flex flex-row items-center justify-center">
              {/* <Activity /> */}
              <ActivityAnimated />
            </span>{" "}
            streaming : {channel} ({channelIndex})
          </h1>
          <div className="relative ">
            <button
              onClick={handleSettings}
              className={`dark:text-white dark:border dark:px-5 dark:py-2  flex items-center justify-center border `}>
              <Settings />
            </button>
            {isSettingModalOpen && (
              <div className="absolute z-20 top-10 right-10 -translate-x-1 translate-y-1 bg-white/30 backdrop-blur-lg border  w-[200px min-h-[124px] h-fit py-4 px-4 lg:w-[400px] ">
                <ul className=" flex flex-col gap-2 items-start justify-center p-2">
                  <li className=" dark:text-white hover:text-green-500 hover:dark:text-green-500 flex flex-row gap-3 items-center justify-center">
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
                  <li className=" dark:text-white hover:text-green-500 hover:dark:text-green-500 flex flex-row gap-3 items-center justify-center">
                    <input
                      type="checkbox"
                      checked={hideNavBar}
                      onChange={(e) => handleNavBarVisibility(e.target.checked)}
                    />
                    {hideNavBar ? (
                      <span>Unhide Navbar</span>
                    ) : (
                      <span>Hide Navbar</span>
                    )}
                  </li>
                  <li className=" dark:text-white hover:text-green-500 hover:dark:text-green-500 flex flex-row gap-3 items-center justify-center">
                    <input
                      type="checkbox"
                      checked={hideChannelsInfo}
                      onChange={(e) =>
                        handleChannelsInfoVisibility(e.target.checked)
                      }
                    />
                    {hideChannelsInfo ? (
                      <span>Unhide Channel Info</span>
                    ) : (
                      <span>Hide Channel Info</span>
                    )}
                  </li>
                  <li className=" dark:text-white hover:text-green-500 hover:dark:text-green-500 flex flex-row gap-3 items-center justify-center">
                    <input
                      type="checkbox"
                      checked={hidePaginationBtns}
                      onChange={(e) =>
                        handlePaginationBtnsVisibility(e.target.checked)
                      }
                    />
                    {hidePaginationBtns ? (
                      <span>Unhide Pagination Buttons</span>
                    ) : (
                      <span>Hide Pagination Buttons</span>
                    )}
                  </li>
                  <li className=" dark:text-white hover:text-green-500 hover:dark:text-green-500 flex flex-row gap-3 items-center justify-center">
                    <input
                      type="checkbox"
                      checked={hideMoreChannelsSection}
                      onChange={(e) =>
                        handleMoreChannelsSectionVisibility(e.target.checked)
                      }
                    />
                    {hideMoreChannelsSection ? (
                      <span>Unhide More Channels</span>
                    ) : (
                      <span>Hide More Channels</span>
                    )}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div
          className={` w-full flex flex-col md:flex-row gap-2 mb-4 items-start justify-start   ${hideChannelsInfo ? "hidden" : "visible"}`}>
          <BackButton label=" " styles=" " />
          <div>
            <Link to={"/stream-iptv"}>
              <button className="flex flex-row items-center justify-center gap-2 dark:text-white border px-5 py-2 hover:border-purple-500 hover:bg-green-500 hover:dark:border-green-500 hover:dark:bg-purple-500 ">
                <span className="flex flex-row items-center justify-center">
                  <LayoutGrid />
                </span>{" "}
                All Channels
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* stream specific channel */}
      <div className=" w-full min-h-screen flex flex-col lg:grid lg:grid-cols-12 ">
        <div
          className={`  ${hideSidebar ? "z-10 col-span-11" : "col-span-9"}    `}>
          <StreamSpecificChannelsDetails streamData={streamData} />
        </div>
        <div
          // ${hideSidebar ? "hidden" : "visible"}
          className={` p-6 ${hideSidebar ? " col-span-1 " : " col-span-3 "} `}>
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
            hidePaginationBtns={hidePaginationBtns}
            hideSidebar={hideSidebar}
          />
        </div>
      </div>
      {/* other channels */}
      <div
        className={`w-full border border-green-50 ${hideMoreChannelsSection ? "hidden" : "visible"}`}>
        {loading && <span className="dark:text-white">Loading...</span>}

        {error && <span className="dark:text-white">Error...</span>}
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

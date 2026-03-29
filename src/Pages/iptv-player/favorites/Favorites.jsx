import {
  Bookmark,
  BookmarkCheck,
  Fullscreen,
  MonitorPlay,
  ListPlus,
} from "lucide-react";
import { useState } from "react";
import { useFavorites } from "../../../hooks/useFavorites";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import HlsVideoPlayer from "../../../Components/hls-video-player/HlsVideoPlayer";
import Sidebar from "../../../Components/favorites/Sidebar";

const Favorites = () => {
  const {
    currentPageNumber,
    numbersOfPages,
    startIndex,
    endIndex,
    inputRange,
    setInputRange,
    handleCurrentPage,
    handleGotoPage,
    handleNextPage,
    handlePrevPage,
    channelsInput,
    setChannelsInput,
    channelsPerPage,
    handleChannelsPerPage,
    totalItems,
    setTotalItems,
    showMoreChannelsInGridView,
  } = useFavorites();
  const { bookmarkedChannel, handleBookmarkChannelToggle } = useLocalStorage();
  const allBookmarkedChannels = Object.entries(bookmarkedChannel);
  setTotalItems(allBookmarkedChannels?.length);

  const [selectedChannel, setSelectedChannel] = useState(null);

  const paginatedStreams = allBookmarkedChannels.slice(startIndex, endIndex);

  const handleStreamSpecificChannel = (channelInfo) => {
    setSelectedChannel(channelInfo);
  };

  console.log("totalItems: ", totalItems);
  console.log("allBookmarkedChannels : ", allBookmarkedChannels);

  // ____UPDATED CODE FROM CHATGPT____ //
  /** ______START HERE______ */
  const maxPagesToShow = 10;
  const half = Math.floor(maxPagesToShow / 2);

  // Determine start page
  let startPage = Math.max(1, currentPageNumber - half);

  // Determine end page
  let endPage = startPage + maxPagesToShow - 1;

  // Make sure endPage doesn't exceed numbersOfPages
  if (endPage > numbersOfPages) {
    endPage = numbersOfPages;
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  // Generate pages array
  const pagesArray = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );
  // ____UPDATED CODE FROM CHATGPT____ //
  /** ______ENDs HERE______ */
  //

  return (
    <section className="  p-4 w-full min-h-screen   ">
      <h1 className="dark:text-white text-xl font-medium my-4 ">
        Your favorite channels
      </h1>

      <div className="p-2 flex flex-col dark:bg-black ">
        {/* all contents main container */}
        <div className="p-3 gap-2 ">
          {/* Toggle all channel & specific channel */}
          {/* content container */}
          {selectedChannel ? (
            // show a specific channel
            <div className=" w-full h-full flex flex-col lg:flex-row gap-2">
              {/* <div> Watching a Specific channel</div> */}
              {/* content */}
              <div className="  w-full min-h-screen flex flex-col items-center justify-start gap-2 p-4 md:p-8 lg:p-12 xl:p-16">
                <div className=" w-full border p-0  ">
                  <div className="flex flex-col  p-1 gap-1">
                    <p className="flex flex-row gap-2 dark:text-white ">
                      {" "}
                      {(currentPageNumber - 1) * channelsPerPage +
                        (selectedChannel.index + 1)}
                      .{/* {index + 1}.{" "} */}
                      <a href={selectedChannel.url} target="_blank">
                        {selectedChannel.channel || selectedChannel.title}
                      </a>
                      {/* <span>
                      (
                      {
                        currentIndexSet[
                          (currentPageNumber - 1) * channelsPerPage +
                            selectedChannel.index
                        ]
                      }
                      )
                    </span> */}
                    </p>
                    {/* icons */}
                    <div className="flex gap-3 ">
                      {/* stream a specific channel */}
                      <span
                        // onClick={() => handleStreamSpecificChannel(item)}
                        className=" p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300 ">
                        <Fullscreen />
                      </span>
                      <span className=" p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300 ">
                        <a
                          href={`${selectedChannel.url}`}
                          target="_blank"
                          rel="noopener noreferrer">
                          <MonitorPlay />
                        </a>
                      </span>
                      <span
                        onClick={() =>
                          handleBookmarkChannelToggle(selectedChannel)
                        }>
                        {bookmarkedChannel[selectedChannel.url] ? (
                          <span
                            className={` p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300  ${bookmarkedChannel ? "" : ""} `}>
                            <BookmarkCheck />
                          </span>
                        ) : (
                          <span className=" p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300 ">
                            <Bookmark />
                          </span>
                        )}
                      </span>

                      <span className=" p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300 ">
                        <ListPlus />
                      </span>
                      {(selectedChannel.feed || selectedChannel.quality) && (
                        <div className="flex flex-row gap-3 dark:text-white ">
                          {selectedChannel.feed && (
                            <p>{selectedChannel.feed}</p>
                          )}
                          {selectedChannel.quality && (
                            <p>{selectedChannel.quality}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* player */}
                  <div className="  ">
                    <div className="   ">
                      {/* <h1>HLS.js in React</h1> */}
                      <HlsVideoPlayer
                        src={selectedChannel?.url}
                        controls
                        autoPlay={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* this sidebar is under view a single page inside search page */}
              {/* sidebar */}
              <div className=" lg:w-[30%] sticky top-12 h-fit text-center flex flex-row items-start justify-start ">
                {/* ______TODO: : :ADD FUNCTIONALITY_______ */}
                <div className=" p-2 w-full h-full dark:text-white ">
                  {/* Sidebar */}
                  <Sidebar
                    currentPageNumber={currentPageNumber}
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
                    // showMoreChannelsInGridView={showMoreChannelsInGridView}
                    // setShowMoreChannelsInGridView={setShowMoreChannelsInGridView}
                    // handleToggleMoreChannelsLayout={handleToggleMoreChannelsLayout}
                    // handleCurrentPage={handleCurrentPage}
                  />
                </div>
              </div>
            </div>
          ) : (
            // show all channels when no single channel is selected for stream
            // show all channels
            <div className=" w-full min-h-screen flex flex-col lg:flex-row gap-2">
              {/* content */}
              {showMoreChannelsInGridView ? (
                // show all channels in grid view
                <div className="  lg:w-[75%] h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-start gap-2">
                  {!(paginatedStreams?.length === 0) ? (
                    paginatedStreams?.map(([url, stream], index) => (
                      <div key={url} className=" border p-0">
                        <div className="flex flex-col  p-1 gap-1">
                          <p className="flex flex-row gap-2 dark:text-white">
                            {" "}
                            {(currentPageNumber - 1) * channelsPerPage +
                              (index + 1)}
                            .{/* {index + 1}.{" "} */}
                            <a href={stream.url} target="_blank">
                              {stream.channel || stream.title}
                            </a>
                            {/* <span>
                            (
                            {
                              currentIndexSet[
                                (currentPageNumber - 1) * channelsPerPage +
                                  index
                              ]
                            }
                            )
                          </span> */}
                          </p>
                          {/* icons */}
                          <div className="flex gap-3 ">
                            {/* stream a specific channel */}
                            <span
                              onClick={() =>
                                handleStreamSpecificChannel({
                                  ...stream,
                                  index,
                                })
                              }
                              className=" p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300 ">
                              <Fullscreen />
                            </span>
                            <span className=" p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300 ">
                              <a
                                href={`${stream.url}`}
                                target="_blank"
                                rel="noopener noreferrer">
                                <MonitorPlay />
                              </a>
                            </span>
                            <span
                              onClick={() =>
                                handleBookmarkChannelToggle(stream)
                              }>
                              {bookmarkedChannel[stream.url] ? (
                                <span
                                  className={` p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300  ${bookmarkedChannel ? "" : ""} `}>
                                  <BookmarkCheck />
                                </span>
                              ) : (
                                <span className=" p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300 ">
                                  <Bookmark />
                                </span>
                              )}
                            </span>

                            <span className=" p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300 ">
                              <ListPlus />
                            </span>
                            {(stream.feed || stream.quality) && (
                              <div className=" dark:text-white flex flex-row gap-3 ">
                                {stream.feed && <p>{stream.feed}</p>}
                                {stream.quality && <p>{stream.quality}</p>}
                              </div>
                            )}
                          </div>
                        </div>
                        {/* player */}
                        <div className="">
                          <div className="App">
                            {/* <h1>HLS.js in React</h1> */}
                            <HlsVideoPlayer
                              src={stream?.url}
                              controls
                              autoPlay={false}
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-lg bg-green dark:text-white ">
                      {" "}
                      <p>No data found</p>{" "}
                    </div>
                  )}
                </div>
              ) : (
                // show all channels in list view
                <div className="  lg:w-[75%] h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-start gap-2">
                  {!(paginatedStreams?.length === 0) ? (
                    paginatedStreams?.map(([url, stream], index) => (
                      <div key={url} className=" border p-0">
                        <div className="flex flex-col  p-1 gap-1">
                          <p className="flex flex-row gap-2 dark:text-white">
                            {" "}
                            {(currentPageNumber - 1) * channelsPerPage +
                              (index + 1)}
                            .{/* {index + 1}.{" "} */}
                            <a href={stream.url} target="_blank">
                              {stream.channel || stream.title}
                            </a>
                            {/* <span>
                            (
                            {
                              currentIndexSet[
                                (currentPageNumber - 1) * channelsPerPage +
                                  index
                              ]
                            }
                            )
                          </span> */}
                          </p>
                          {/* icons */}
                          <div className="flex gap-3 ">
                            {/* stream a specific channel */}
                            <span
                              onClick={() =>
                                handleStreamSpecificChannel({
                                  ...stream,
                                  index,
                                })
                              }
                              className=" p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300 ">
                              <Fullscreen />
                            </span>
                            <span className=" p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300 ">
                              <a
                                href={`${stream.url}`}
                                target="_blank"
                                rel="noopener noreferrer">
                                <MonitorPlay />
                              </a>
                            </span>
                            <span
                              onClick={() =>
                                handleBookmarkChannelToggle(stream)
                              }>
                              {bookmarkedChannel[stream.url] ? (
                                <span
                                  className={` p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300  ${bookmarkedChannel ? "" : ""} `}>
                                  <BookmarkCheck />
                                </span>
                              ) : (
                                <span className=" p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300 ">
                                  <Bookmark />
                                </span>
                              )}
                            </span>

                            <span className=" p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300 ">
                              <ListPlus />
                            </span>
                            {(stream.feed || stream.quality) && (
                              <div className=" dark:text-white flex flex-row gap-3 ">
                                {stream.feed && <p>{stream.feed}</p>}
                                {stream.quality && <p>{stream.quality}</p>}
                              </div>
                            )}
                          </div>
                        </div>
                        {/* player */}
                        {/* <h1>HLS.js in React</h1> */}
                        {/* <div className="">
                        <div className="App">
                          <HlsVideoPlayer
                            src={item?.url}
                            controls
                            autoPlay={false}
                          />
                        </div>
                      </div> */}
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-lg bg-green dark:text-white ">
                      {" "}
                      <p>No data found</p>{" "}
                    </div>
                  )}
                </div>
              )}
              {/* sidebar */}
              <div className="  lg:w-[25%] sticky top-12 h-fit text-center flex flex-row items-start justify-start ">
                {/* sidebar */}
                {/* ______TODO: : :ADD FUNCTIONALITY_______ */}
                <div className=" p-2 w-full h-full dark:text-white  ">
                  {/* Sidebar */}
                  {/* main search page sidebar while no single channel is selected */}
                  <Sidebar
                    currentPageNumber={currentPageNumber}
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
                    // showMoreChannelsInGridView={showMoreChannelsInGridView}
                    // setShowMoreChannelsInGridView={setShowMoreChannelsInGridView}
                    // handleToggleMoreChannelsLayout={handleToggleMoreChannelsLayout}
                    // handleCurrentPage={handleCurrentPage}
                  />
                </div>
              </div>
            </div>
          )}
          {/* main search page pagination present in bottom left in the page  */}
          {/* pagination */}
          <div className="flex gap-2 flex-wrap my-3">
            {pagesArray
              ? pagesArray?.map((page, index) => (
                  <div className="w-fit h-fit" key={index}>
                    <div>
                      <button
                        onClick={() => handleCurrentPage(page)}
                        className={` border border-[#ff00ff] text-md rounded-sm hover:bg-[#a100ff] dark:text-white hover:text-white  py-2 px-5  ${
                          page === currentPageNumber
                            ? "bg-green-500 text-white"
                            : ""
                        }  `}>
                        {page}
                      </button>
                    </div>
                  </div>
                ))
              : ""}
            {numbersOfPages > 10 && (
              <div className="">
                <button
                  className={` border border-[#ff00ff] text-md rounded-sm bg-green-900 hover:bg-[#a100ff] dark:text-white hover:text-white text-white py-2 px-8 `}>
                  {numbersOfPages}
                </button>
              </div>
            )}
            <button
              // onClick={() => handleCurrentPage(page)}
              onClick={handlePrevPage}
              disabled={currentPageNumber <= 1}
              className={` border border-[#ff00ff] dark:text-white text-md rounded-sm hover:bg-[#a100ff] hover:text-white  py-2 px-5 ${
                currentPageNumber <= 1
                  ? "text-gray-400 hover:text-gray-300 hover:bg-gray-700 dark:text-gray-500 dark:hover:bg-gray-600"
                  : "text-black hover:text-white"
              } `}>
              Prev
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPageNumber >= numbersOfPages}
              // onClick={() => handleCurrentPage(page)}
              className={` border border-[#ff00ff] dark:text-white text-md rounded-sm hover:bg-[#a100ff] hover:text-white  py-2 px-5 ${
                currentPageNumber >= numbersOfPages
                  ? "text-gray-400 hover:text-gray-300 hover:bg-gray-700 dark:text-gray-500 dark:hover:bg-gray-600"
                  : "text-black hover:text-white"
              } `}>
              Next
            </button>
          </div>
          {/* show more channels while single channels is selected for stream */}
          {selectedChannel &&
            (showMoreChannelsInGridView ? (
              // show more channels in grid view
              <div className="  w-full h-full flex flex-col lg:flex-row gap-2">
                {/* // show all channel when streaming a specific channel */}
                {/* content */}
                <div className=" w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 items-center justify-start gap-2">
                  {!(paginatedStreams?.length === 0) ? (
                    paginatedStreams?.map(([url, stream], index) => (
                      <div key={url} className=" border p-0">
                        <div className="flex flex-col  p-1 gap-1">
                          <p className="flex flex-row gap-2 dark:text-white">
                            {" "}
                            {(currentPageNumber - 1) * channelsPerPage +
                              (index + 1)}
                            .{/* {index + 1}.{" "} */}
                            <a href={stream.url} target="_blank">
                              {stream.channel || stream.title}
                            </a>
                            {/* <span>
                            (
                            {
                              currentIndexSet[
                                (currentPageNumber - 1) * channelsPerPage +
                                  index
                              ]
                            }
                            )
                          </span> */}
                          </p>
                          {/* icons */}
                          <div className="flex gap-3 ">
                            {/* stream a specific channel */}
                            <span
                              onClick={() =>
                                handleStreamSpecificChannel({
                                  ...stream,
                                  index,
                                })
                              }
                              className=" p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300 ">
                              <Fullscreen />
                            </span>
                            <span className=" p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300 ">
                              <a
                                href={`${stream.url}`}
                                target="_blank"
                                rel="noopener noreferrer">
                                <MonitorPlay />
                              </a>
                            </span>
                            <span
                              onClick={() =>
                                handleBookmarkChannelToggle(stream)
                              }>
                              {bookmarkedChannel[stream.url] ? (
                                <span
                                  className={` p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300  ${bookmarkedChannel ? "" : ""} `}>
                                  <BookmarkCheck />
                                </span>
                              ) : (
                                <span className=" p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300 ">
                                  <Bookmark />
                                </span>
                              )}
                            </span>

                            <span className=" p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300 ">
                              <ListPlus />
                            </span>
                            {(stream.feed || stream.quality) && (
                              <div className="flex flex-row gap-3 dark:text-white ">
                                {stream.feed && <p>{stream.feed}</p>}
                                {stream.quality && <p>{stream.quality}</p>}
                              </div>
                            )}
                          </div>
                        </div>
                        {/* player */}
                        <div className="w-full h-full flex flex-col border border-green-50  ">
                          <HlsVideoPlayer
                            src={stream?.url}
                            controls
                            autoPlay={false}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-lg bg-green dark:text-white ">
                      {" "}
                      <p>No data found</p>{" "}
                    </div>
                  )}
                </div>
                {/* sidebar */}
              </div>
            ) : (
              // show more channels in list view
              <div className="  w-full h-full flex flex-col lg:flex-row gap-2">
                {/* // show all channel when streaming a specific channel */}
                {/* content */}
                <div className=" w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 items-center justify-start gap-2">
                  {!(paginatedStreams?.length === 0) ? (
                    paginatedStreams?.map(([url, stream], index) => (
                      <div key={url} className=" border p-0">
                        <div className="flex flex-col  p-1 gap-1">
                          <p className="flex flex-row gap-2 dark:text-white">
                            {" "}
                            {(currentPageNumber - 1) * channelsPerPage +
                              (index + 1)}
                            .{/* {index + 1}.{" "} */}
                            <a href={stream.url} target="_blank">
                              {stream.channel || stream.title}
                            </a>
                            {/* <span>
                            (
                            {
                              currentIndexSet[
                                (currentPageNumber - 1) * channelsPerPage +
                                  index
                              ]
                            }
                            )
                          </span> */}
                          </p>
                          {/* icons */}
                          <div className="flex gap-3 ">
                            {/* stream a specific channel */}
                            <span
                              onClick={() =>
                                handleStreamSpecificChannel({
                                  ...stream,
                                  index,
                                })
                              }
                              className=" p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300 ">
                              <Fullscreen />
                            </span>
                            <span className=" p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300 ">
                              <a
                                href={`${stream.url}`}
                                target="_blank"
                                rel="noopener noreferrer">
                                <MonitorPlay />
                              </a>
                            </span>
                            <span
                              onClick={() =>
                                handleBookmarkChannelToggle(stream)
                              }>
                              {bookmarkedChannel[stream.url] ? (
                                <span
                                  className={` p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300  ${bookmarkedChannel ? "" : ""} `}>
                                  <BookmarkCheck />
                                </span>
                              ) : (
                                <span className=" p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300 ">
                                  <Bookmark />
                                </span>
                              )}
                            </span>

                            <span className=" p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300 ">
                              <ListPlus />
                            </span>
                            {(stream.feed || stream.quality) && (
                              <div className="flex flex-row gap-3 dark:text-white ">
                                {stream.feed && <p>{stream.feed}</p>}
                                {stream.quality && <p>{stream.quality}</p>}
                              </div>
                            )}
                          </div>
                        </div>
                        {/* player */}
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-lg bg-green dark:text-white ">
                      {" "}
                      <p>No data found</p>{" "}
                    </div>
                  )}
                </div>
                {/* sidebar */}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Favorites;

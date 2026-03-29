import axios from "axios";
import { useEffect, useRef, useState } from "react";

import {
  Bookmark,
  BookmarkCheck,
  Fullscreen,
  MonitorPlay,
  ListPlus,
} from "lucide-react";

import { Helmet } from "react-helmet-async";
import StreamsPageSkeletonLoading from "../../../Components/streams/StreamsPageSkeletonLoading";
import HlsVideoPlayer from "../../../Components/hls-video-player/HlsVideoPlayer";
import { BASE_API_PATH } from "../../../configs/api-url.config";
import { LayoutGrid } from "lucide-react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import Sidebar from "../../../Components/search/Sidebar";
import { useSearchPage } from "../../../hooks/useSearchPage";

const SearchStreams = () => {
  // search result fetching
  const [searchData, setSearchData] = useState([]);
  const [currentIndexSet, setCurrentIndexSet] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { bookmarkedChannel, handleBookmarkChannelToggle } = useLocalStorage();
  const {
    currentPageNumber,
    // numbersOfPages,
    inputRange,
    setInputRange,
    handleGotoPage,
    handleNextPage,
    handlePrevPage,
    channelsPerPage,
    channelsInput,
    setChannelsInput,
    handleChannelsPerPage,
    totalItems,
    setTotalItems,
    handleCurrentPage,
    showMoreChannelsInGridView,
    // setShowMoreChannelsInGridView,
    // handleToggleMoreChannelsLayout,
  } = useSearchPage();

  const inputRef = useRef(null);

  // store data
  const [showSearchValue, setShowSearchValue] = useState("");
  const [searchValue, setSearchValue] = useState(() => {
    // Initialize from localStorage directly to avoid extra useEffects
    const stored = localStorage.getItem("searchValueLocal");
    return stored ? JSON.parse(stored) : "";
  });
  const [searchValueInputRange, setSearchValueInputRange] =
    useState(searchValue);

  // pagination states
  // const [currentPageNumber, setCurrentPageNumber] = useState(1);
  //   const [currentPageNumberInputRange, setCurrentPageNumberInputRange] =
  //     useState(1);

  // const [channelsPerPage, setChannelsPerPage] = useState(10);
  //   const [channelsPerPageInputRange, setChannelsPerPageInputRange] =
  //     useState(10);

  // bookmark states
  // const [bookmarkedChannel, setBookmarkedChannel] = useState({});

  const [selectedChannel, setSelectedChannel] = useState(null);

  //   const currentPageNumber = 1
  //   const channelsPerPage = 10
  // const totalChannels = searchData?.length;
  const numbersOfPages = Math.ceil(totalItems / channelsPerPage);
  const startIndex = (currentPageNumber - 1) * channelsPerPage;
  const endIndex = currentPageNumber * channelsPerPage;

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "searchValueLocal",
      JSON.stringify(searchValueInputRange),
    );
    setSearchValue(searchValueInputRange);
    // setCurrentPageNumber(1); // Reset to page 1 on new search
  };

  // UPDATED CODE BY CLAUDE
  useEffect(() => {
    const handleFocusRequest = () => {
      if (inputRef.current) {
        inputRef.current.focus();
        // console.log("Input focused!"); // Debug log
      }
    };

    const handleClearRequest = () => {
      if (inputRef.current) {
        inputRef.current.value = "";
        inputRef.current.focus();
        // console.log("Input cleared and focused!"); // Debug log
      }
    };

    window.addEventListener("focusSearchInput", handleFocusRequest);
    window.addEventListener("clearSearch", handleClearRequest);

    return () => {
      window.removeEventListener("focusSearchInput", handleFocusRequest);
      window.removeEventListener("clearSearch", handleClearRequest);
    };
  }, []);

  // UPDATED CODE FROM GEMINI
  // START HERE
  // store and get search data from browser local storage
  useEffect(() => {
    const stored = localStorage.getItem("searchValueLocal");
    setShowSearchValue(stored);
  }, [searchValue, showSearchValue, searchValueInputRange]);

  // fetch search result
  useEffect(() => {
    if (!searchValue) return;

    const fetchSearchResult = async () => {
      setLoading(true);
      try {
        const url = `${BASE_API_PATH}/api/iptv-player/testing-search-url?term=${encodeURIComponent(searchValue)}`;
        const response = await axios.get(url);
        setSearchData(response?.data?.data || []);
        setTotalItems(response?.data?.data?.length);
        setCurrentIndexSet(response?.data?.currentIndexSet || []);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResult();
  }, [searchValue]);
  // UPDATED CODE FROM GEMINI
  // ENDS HERE

  // const handleCurrentPage = (page) => {
  //   if (Number(page) > 0 && Number(page) <= numbersOfPages) {
  //     setCurrentPageNumber(page);
  //   }
  // };

  // handle bookmark channels
  // const handleBookmarkChannelToggle = (channelUrl) => {
  //   setBookmarkedChannel((prev) => ({
  //     ...prev,
  //     [channelUrl]: !prev[channelUrl],
  //   }));
  // };

  // handle handleAllAndOneChannelStream
  const handleAllAndOneChannelStream = () => {
    setSelectedChannel(null);
  };

  const handleStreamSpecificChannel = (channelInfo) => {
    setSelectedChannel(channelInfo);
  };

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

  if (loading) return <StreamsPageSkeletonLoading />;
  if (error) return <p> Error : {error.message} </p>;

  // console.log(currentIndexSet);

  return (
    // this is search page component
    /**
     * Search by channel, title and show all search results with
     * pagination and add a sidebar for filtering and control user actions
     * refactor, add all device responsiveness
     * use local storage for preferences and use a database if user have account
     */
    <div className="p-2 flex flex-col dark:bg-black ">
      {/* SEO */}
      <Helmet>
        {/* UPDATED CODE FROM GEMINI */}
        {/* START HERE */}
        {/* Standard Metadata */}
        <title>
          {showSearchValue
            ? `${showSearchValue} - Live Streams | MyStreamSite`
            : "Search 13,000+ Live Channels | MyStreamSite"}
        </title>
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SearchResultsPage",
            description: `Search results for ${showSearchValue}`,
            name: `Search results for ${showSearchValue}`,
            mainEntity: {
              "@type": "ItemList",
              itemListOrder: "https://schema.org/ItemListOrderDescending",
              numberOfItems: searchData?.length || 0,
            },
          })}
        </script>
        <meta
          name="description"
          content={`Find and watch ${showSearchValue || "live channels"} online. Streaming ${totalItems} channels in high quality. No registration required.`}
        />
        <meta
          name="keywords"
          content={`IPTV, Live Stream, ${showSearchValue}, Watch ${showSearchValue} online, Free Channels`}
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={
            showSearchValue
              ? `Watch ${showSearchValue} Live`
              : "Live Stream Search Engine"
          }
        />
        <meta
          property="og:description"
          content={`Currently showing ${totalItems} search results for ${showSearchValue}.`}
        />
        <meta
          property="og:image"
          content="https://alltvcnl.netlify.app/search-preview-image.jpg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`Search Results for: ${showSearchValue}`}
        />

        {/* Canonical Tag - CRITICAL for Search Pages */}
        <link
          rel="canonical"
          href={`https:https://iptv-player-server.vercel.app/api/iptv-player/testing-search-url?term==${encodeURIComponent(showSearchValue)}`}
        />
        {/* UPDATED CODE FORM GEMINI */}
        {/* ENDS HERE */}
      </Helmet>
      {/* search input, form */}
      <form
        onSubmit={handleSubmit}
        className="flex dark:text-white flex-col gap-3">
        <label className="flex gap-3" htmlFor="name">
          <h1 className=" ">Search</h1>
          <h2> {">"}</h2>
          {searchValueInputRange === "" ? (
            "search for "
          ) : (
            <> Searching for {searchValueInputRange} </>
          )}
          {/* showSearchValue === !"" ? (
            <>Searched for {showSearchValue} </>
          ) : */}
        </label>
        <div className="flex items-center ">
          <input
            className=" dark:text-black px-3 py-1 w-full md:w-1/3 border rounded-l-lg  "
            type="text"
            ref={inputRef}
            value={searchValueInputRange}
            onChange={(e) => setSearchValueInputRange(e.target.value)}
            placeholder="search by channel, title"
          />
          <button
            className="bg-purple-500 text-white border px-3 py-1 w-full md:w-[102px] rounded-r-lg "
            type="submit">
            Submit
          </button>
        </div>
      </form>

      {/* all contents main container */}
      <div className="p-3 gap-2 ">
        <h1 className="text-md dark:text-white">
          Showing Search results for {showSearchValue}
        </h1>
        {/* TODO:: MOVE THIS ${TOTAL CHANNELS} INSIDE SIDE BAR */}
        <h2 className="text-md mb-2 dark:text-white">
          Total channels : {searchData?.length || 0}
        </h2>
        <div onClick={handleAllAndOneChannelStream} className="">
          {selectedChannel && (
            <button className="dark:text-white flex flex-row gap-1 items-center justify-center">
              {" "}
              <span>
                <LayoutGrid />
              </span>{" "}
              Back to All{" "}
            </button>
          )}
        </div>
        {/* <p>{selectedChannel ? "Specific" : "All"}</p> */}
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
                    <span>
                      (
                      {
                        currentIndexSet[
                          (currentPageNumber - 1) * channelsPerPage +
                            selectedChannel.index
                        ]
                      }
                      )
                    </span>
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
                        {selectedChannel.feed && <p>{selectedChannel.feed}</p>}
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
                {!(searchData?.length === 0) ? (
                  searchData?.slice(startIndex, endIndex).map((item, index) => (
                    <div key={index} className=" border p-0">
                      <div className="flex flex-col  p-1 gap-1">
                        <p className="flex flex-row gap-2 dark:text-white">
                          {" "}
                          {(currentPageNumber - 1) * channelsPerPage +
                            (index + 1)}
                          .{/* {index + 1}.{" "} */}
                          <a href={item.url} target="_blank">
                            {item.channel || item.title}
                          </a>
                          <span>
                            (
                            {
                              currentIndexSet[
                                (currentPageNumber - 1) * channelsPerPage +
                                  index
                              ]
                            }
                            )
                          </span>
                        </p>
                        {/* icons */}
                        <div className="flex gap-3 ">
                          {/* stream a specific channel */}
                          <span
                            onClick={() =>
                              handleStreamSpecificChannel({ ...item, index })
                            }
                            className=" p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300 ">
                            <Fullscreen />
                          </span>
                          <span className=" p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300 ">
                            <a
                              href={`${item.url}`}
                              target="_blank"
                              rel="noopener noreferrer">
                              <MonitorPlay />
                            </a>
                          </span>
                          <span
                            onClick={() => handleBookmarkChannelToggle(item)}>
                            {bookmarkedChannel[item.url] ? (
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
                          {(item.feed || item.quality) && (
                            <div className=" dark:text-white flex flex-row gap-3 ">
                              {item.feed && <p>{item.feed}</p>}
                              {item.quality && <p>{item.quality}</p>}
                            </div>
                          )}
                        </div>
                      </div>
                      {/* player */}
                      <div className="">
                        <div className="App">
                          {/* <h1>HLS.js in React</h1> */}
                          <HlsVideoPlayer
                            src={item?.url}
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
                {!(searchData?.length === 0) ? (
                  searchData?.slice(startIndex, endIndex).map((item, index) => (
                    <div key={index} className=" border p-0">
                      <div className="flex flex-col  p-1 gap-1">
                        <p className="flex flex-row gap-2 dark:text-white">
                          {" "}
                          {(currentPageNumber - 1) * channelsPerPage +
                            (index + 1)}
                          .{/* {index + 1}.{" "} */}
                          <a href={item.url} target="_blank">
                            {item.channel || item.title}
                          </a>
                          <span>
                            (
                            {
                              currentIndexSet[
                                (currentPageNumber - 1) * channelsPerPage +
                                  index
                              ]
                            }
                            )
                          </span>
                        </p>
                        {/* icons */}
                        <div className="flex gap-3 ">
                          {/* stream a specific channel */}
                          <span
                            onClick={() =>
                              handleStreamSpecificChannel({ ...item, index })
                            }
                            className=" p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300 ">
                            <Fullscreen />
                          </span>
                          <span className=" p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300 ">
                            <a
                              href={`${item.url}`}
                              target="_blank"
                              rel="noopener noreferrer">
                              <MonitorPlay />
                            </a>
                          </span>
                          <span
                            onClick={() => handleBookmarkChannelToggle(item)}>
                            {bookmarkedChannel[item.url] ? (
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
                          {(item.feed || item.quality) && (
                            <div className=" dark:text-white flex flex-row gap-3 ">
                              {item.feed && <p>{item.feed}</p>}
                              {item.quality && <p>{item.quality}</p>}
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
                {!(searchData?.length === 0) ? (
                  searchData?.slice(startIndex, endIndex).map((item, index) => (
                    <div key={index} className=" border p-0">
                      <div className="flex flex-col  p-1 gap-1">
                        <p className="flex flex-row gap-2 dark:text-white">
                          {" "}
                          {(currentPageNumber - 1) * channelsPerPage +
                            (index + 1)}
                          .{/* {index + 1}.{" "} */}
                          <a href={item.url} target="_blank">
                            {item.channel || item.title}
                          </a>
                          <span>
                            (
                            {
                              currentIndexSet[
                                (currentPageNumber - 1) * channelsPerPage +
                                  index
                              ]
                            }
                            )
                          </span>
                        </p>
                        {/* icons */}
                        <div className="flex gap-3 ">
                          {/* stream a specific channel */}
                          <span
                            onClick={() =>
                              handleStreamSpecificChannel({
                                ...item,
                                index,
                              })
                            }
                            className=" p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300 ">
                            <Fullscreen />
                          </span>
                          <span className=" p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300 ">
                            <a
                              href={`${item.url}`}
                              target="_blank"
                              rel="noopener noreferrer">
                              <MonitorPlay />
                            </a>
                          </span>
                          <span
                            onClick={() => handleBookmarkChannelToggle(item)}>
                            {bookmarkedChannel[item.url] ? (
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
                          {(item.feed || item.quality) && (
                            <div className="flex flex-row gap-3 dark:text-white ">
                              {item.feed && <p>{item.feed}</p>}
                              {item.quality && <p>{item.quality}</p>}
                            </div>
                          )}
                        </div>
                      </div>
                      {/* player */}
                      <div className="w-full h-full flex flex-col border border-green-50  ">
                        <HlsVideoPlayer
                          src={item?.url}
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
                {!(searchData?.length === 0) ? (
                  searchData?.slice(startIndex, endIndex).map((item, index) => (
                    <div key={index} className=" border p-0">
                      <div className="flex flex-col  p-1 gap-1">
                        <p className="flex flex-row gap-2 dark:text-white">
                          {" "}
                          {(currentPageNumber - 1) * channelsPerPage +
                            (index + 1)}
                          .{/* {index + 1}.{" "} */}
                          <a href={item.url} target="_blank">
                            {item.channel || item.title}
                          </a>
                          <span>
                            (
                            {
                              currentIndexSet[
                                (currentPageNumber - 1) * channelsPerPage +
                                  index
                              ]
                            }
                            )
                          </span>
                        </p>
                        {/* icons */}
                        <div className="flex gap-3 ">
                          {/* stream a specific channel */}
                          <span
                            onClick={() =>
                              handleStreamSpecificChannel({
                                ...item,
                                index,
                              })
                            }
                            className=" p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300 ">
                            <Fullscreen />
                          </span>
                          <span className=" p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300 ">
                            <a
                              href={`${item.url}`}
                              target="_blank"
                              rel="noopener noreferrer">
                              <MonitorPlay />
                            </a>
                          </span>
                          <span
                            onClick={() => handleBookmarkChannelToggle(item)}>
                            {bookmarkedChannel[item.url] ? (
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
                          {(item.feed || item.quality) && (
                            <div className="flex flex-row gap-3 dark:text-white ">
                              {item.feed && <p>{item.feed}</p>}
                              {item.quality && <p>{item.quality}</p>}
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
  );
};

export default SearchStreams;

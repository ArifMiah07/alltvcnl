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

const SearchStreams = () => {
  // search result fetching
  const [searchData, setSearchData] = useState([]);
  const [currentIndexSet, setCurrentIndexSet] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  //   const [currentPageNumberInputRange, setCurrentPageNumberInputRange] =
  //     useState(1);

  const [channelsPerPage, setChannelsPerPage] = useState(10);
  //   const [channelsPerPageInputRange, setChannelsPerPageInputRange] =
  //     useState(10);

  // bookmark states
  const [bookmarkedChannel, setBookmarkedChannel] = useState({});
  // stream a specific channel
  // const [isStreamingSpecificChannel, setIsStreamingSpecificChannel] =
  //   useState(false);
  // const [storeSpecificChannelsInfo, setStoreSpecificChannelsInfo] = useState(
  //   {},
  // );

  const [selectedChannel, setSelectedChannel] = useState(null);

  //   const currentPageNumber = 1
  //   const channelsPerPage = 10
  const totalChannels = searchData?.length;
  const numbersOfPages = Math.ceil(totalChannels / channelsPerPage);
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
    setCurrentPageNumber(1); // Reset to page 1 on new search
  };
  // handle search value
  // const handleSearchValue = (value) => {
  //   localStorage.setItem("searchValueLocal", JSON.stringify(value));
  //   setSearchValue(value);
  // };

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
    // if (stored) {
    //   console.log("Stored value:", JSON.parse(stored));
    // }
  }, [searchValue, showSearchValue, searchValueInputRange]);
  //   console.log("stored ", showSearchValue);

  //   const getItem = localStorage.getItem("searchValueLocal");
  //   console.log("search: value:: ", searchValue, JSON.parse(getItem));

  // fetch search result
  useEffect(() => {
    if (!searchValue) return;

    const fetchSearchResult = async () => {
      setLoading(true);
      try {
        const url = `${BASE_API_PATH}/api/iptv-player/testing-search-url?term=${encodeURIComponent(searchValue)}`;
        const response = await axios.get(url);
        setSearchData(response?.data?.data || []);
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

  const handleCurrentPage = (page) => {
    // console.log(" page: ", Number(page), Math.ceil(totalChannels / 10));
    if (Number(page) > 0 && Number(page) <= numbersOfPages) {
      setCurrentPageNumber(page);
    }
  };

  // handle bookmark channels
  const handleBookmarkChannelToggle = (channelUrl) => {
    setBookmarkedChannel((prev) => ({
      ...prev,
      [channelUrl]: !prev[channelUrl],
    }));
    // const handleBookmarkToggle = (channelUrl) => {
    // };
  };

  // handle handleAllAndOneChannelStream
  const handleAllAndOneChannelStream = () => {
    //
    // console.log("Clicked");
    // setIsStreamingSpecificChannel(!isStreamingSpecificChannel);
    setSelectedChannel(null);
  };

  const handleStreamSpecificChannel = (channelInfo) => {
    // //
    // setIsStreamingSpecificChannel(!isStreamingSpecificChannel);
    // setStoreSpecificChannelsInfo((prev) => [...prev, channelInfo]);
    // console.log("channelInfo: ", { channelInfo });
    setSelectedChannel(channelInfo);
  };
  // console.log(selectedChannel);

  //   useEffect(()=> {
  //   }, [])

  //   console.log(searchData);

  //   const s = JSON.parse(showSearchValue);
  //   console.log("searchValue, showSearchValue", showSearchValue);
  //   console.log("searchValueInputRange ", searchValueInputRange);

  //   const currentPage = 10;

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
  //   console.log(pagesArray);
  // ____UPDATED CODE FROM CHATGPT____ //
  /** ______ENDs HERE______ */

  if (loading) return <StreamsPageSkeletonLoading />;
  if (error) return <p> Error : {error.message} </p>;

  console.log(currentIndexSet);

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
          content={`Find and watch ${showSearchValue || "live channels"} online. Streaming ${totalChannels} channels in high quality. No registration required.`}
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
          content={`Currently showing ${totalChannels} search results for ${showSearchValue}.`}
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
                    <span>({currentIndexSet[selectedChannel.index]})</span>
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
                      <MonitorPlay />
                    </span>
                    <span
                      onClick={() =>
                        handleBookmarkChannelToggle(selectedChannel.url)
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
              <div className="  flex flex-col gap-2 flex-wrap p-2">
                {pagesArray
                  ? pagesArray?.map((page, index) => (
                      <div className=" w-[80px] h-fit" key={index}>
                        <button
                          onClick={() => handleCurrentPage(page)}
                          className={` w-full h-full  border border-[#ff00ff] text-md rounded-sm  hover:bg-[#a100ff] hover:text-white text-black dark:text-white  py-2 px-5  ${
                            page === currentPageNumber
                              ? "bg-green-500 text-white"
                              : ""
                          }  `}>
                          {page}
                        </button>
                        {/* <div>
                      </div> */}
                      </div>
                    ))
                  : ""}
              </div>
              {/* ______TODO: : :ADD FUNCTIONALITY_______ */}
              <div className=" p-2 w-full h-full dark:text-white ">
                {/* Sidebar */}
                <div className="lg:col-span-1 ">
                  <div className="w-full border-b-2 border-red-50 ">
                    <div className="  w-full h-full flex flex-row items-center justify-start gap-2 mb-4 ">
                      <h3 className=" flex flex-row items-center justify-center gap-1 text-lg font-bold ">
                        Basic Info{" "}
                        {/* <span onClick={toggleBasicInfoExpand} className="">
              {expandBasicInfo ? (
                <MdOutlineExpandLess />
              ) : (
                <MdOutlineExpandMore />
              )}
            </span> */}
                      </h3>
                    </div>
                    <div className={`mb-4`}>
                      <div className="w-full flex flex-col items-center gap-2 px-2">
                        {/* total channels */}
                        <p
                          className={`w-full text-center border-2 border-red-50 `}>
                          Total Channels:
                        </p>
                        {/* total pages */}
                        <p
                          className={`w-full text-center border-2 border-red-50 `}>
                          Total Pages:
                        </p>
                        {/* show current page */}
                        <p
                          className={`w-full text-center border-2 border-red-50 `}>
                          Current Page:
                        </p>
                        {/* channels per page */}
                        <p
                          className={`w-full text-center border-2 border-red-50 `}>
                          Channels/page:
                        </p>
                        <div></div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full border-b-2 border-red-50 ">
                    <div className=" w-full h-full flex flex-row items-center justify-start gap-2 mb-4 ">
                      <h3 className=" flex flex-row items-center justify-center gap-1 text-lg font-bold mt-4 ">
                        Basic Controls{" "}
                        {/* <span onClick={toggleBasicControlsExpand} className="">
              {expandBasicControls ? (
                <MdOutlineExpandLess />
              ) : (
                <MdOutlineExpandMore />
              )}
            </span> */}
                      </h3>
                    </div>
                    <div className={`mb-4 px-2`}>
                      <div className="flex flex-col gap-4">
                        {/* next page btn */}
                        <button
                          //   onClick={onNext}
                          //   disabled={currentPage >= numbersOfPages}
                          className={` w-full border-2 border-red-50 hover:border-2 hover:border-[#ff00ff] text-md  hover:bg-[#a100ff] `}>
                          Next Page
                        </button>
                        {/* previous page btn */}
                        <button
                          //   onClick={onPrev}
                          //   disabled={currentPage <= 1}
                          className={` w-full border-2 border-red-50 hover:border-2 hover:border-[#ff00ff] text-md  hover:bg-[#a100ff] `}>
                          Previous Page
                        </button>
                        {/* handle go to a specific page with user input */}
                        <div className="w-full ">
                          {/* form */}
                          <form className=" w-full flex flex-col ">
                            <label htmlFor="goto_page" className="mb-1">
                              Go to a page
                            </label>
                            <div className="w-full flex flex-row  ">
                              {/* take input */}
                              <input
                                className="outline-0 w-full text-center  border-2 border-red-50 hover:border-2 hover:border-[#ff00ff] text-md  hover:bg-[#a100ff] hover:text-white"
                                // value={inputRange}
                                // onChange={(e) => setInputRange(e.target.value)}
                                placeholder="Go to a page"
                                type="text"
                                min={1}
                              />
                              {/* go to btn */}
                              <button
                                // type="submit"
                                // disabled={inputRange === ""}
                                className={`w-fit px-2  border-2 border-red-50 hover:border-2 hover:border-[#ff00ff] text-md  hover:bg-[#a100ff]  `}>
                                Go
                              </button>
                            </div>
                          </form>
                        </div>
                        {/* handle a specific numbers of channels per page with user input */}
                        <div className="w-full  ">
                          {/* form */}
                          <form
                            // onSubmit={handleChannelsPerPage}
                            className=" w-full flex flex-col  ">
                            {/* handle numbers of cnl's per page */}
                            <label htmlFor="goto_page" className="mb-1">
                              Channels per page
                            </label>
                            <div className="w-full flex flex-row  ">
                              {/* take input */}
                              <input
                                className="outline-0 w-full text-center   border-2 border-red-50 hover:border-2 hover:border-[#ff00ff] text-md  hover:bg-[#a100ff] hover:text-white "
                                // value={channelsInput}
                                // onChange={(e) => setChannelsInput(e.target.value)}
                                placeholder="Chanls per page"
                                type="text"
                                min={1}
                              />
                              {/* go to btn */}
                              <button
                                type="submit"
                                // disabled={channelsInput === ""}
                                className={`w-fit px-2 border-2 border-red-50 hover:border-2 hover:border-[#ff00ff] text-md  hover:bg-[#a100ff] `}>
                                Set
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full mt-4">{/* <BasicFilters /> */}</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // show all channels when no single channel is selected for stream
          // show all channels
          <div className=" w-full min-h-screen flex flex-col lg:flex-row gap-2">
            {/* content */}
            <div className="  lg:w-[70%] h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-start gap-2">
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
                              (currentPageNumber - 1) * channelsPerPage + index
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
                          <MonitorPlay />
                        </span>
                        <span
                          onClick={() => handleBookmarkChannelToggle(item.url)}>
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
            {/* sidebar */}
            <div className="  lg:w-[30%] sticky top-12 h-fit text-center flex flex-row items-start justify-start ">
              {/* sidebar pagination */}
              <div className=" flex flex-col gap-2 flex-wrap p-2">
                {pagesArray
                  ? pagesArray?.map((page, index) => (
                      <div className=" w-[80px] h-fit" key={index}>
                        <button
                          onClick={() => handleCurrentPage(page)}
                          className={` w-full h-full  border border-[#ff00ff] text-md rounded-sm hover:bg-[#a100ff] hover:text-white text-black dark:text-white py-2 px-5  ${
                            page === currentPageNumber
                              ? "bg-green-500 text-white"
                              : ""
                          }  `}>
                          {page}
                        </button>
                        {/* <div>
                      </div> */}
                      </div>
                    ))
                  : ""}
                <div className=" w-[80px] h-fit">
                  <button
                    className={` w-full h-full  border border-[#ff00ff] text-md rounded-sm bg-green-800 hover:bg-[#a100ff] hover:text-white text-black dark:text-white py-2 px-5 `}>
                    ...{numbersOfPages}
                  </button>
                </div>
              </div>
              {/* <div className="w-full h-full ">
            </div> */}
              {/* sidebar */}
              {/* ______TODO: : :ADD FUNCTIONALITY_______ */}
              <div className=" p-2 w-full h-full  ">
                {/* Sidebar */}
                {/* main search page sidebar while no single channel is selected */}
                <div className="lg:col-span-1 dark:text-white ">
                  <div className="w-full border-b-2 border-red-50 ">
                    <div className="  w-full h-full flex flex-row items-center justify-start gap-2 mb-4 ">
                      <h3 className=" flex flex-row items-center justify-center gap-1 text-lg font-bold ">
                        Basic Info{" "}
                        {/* <span onClick={toggleBasicInfoExpand} className="">
              {expandBasicInfo ? (
                <MdOutlineExpandLess />
              ) : (
                <MdOutlineExpandMore />
              )}
            </span> */}
                      </h3>
                    </div>
                    <div className={`mb-4`}>
                      <div className="w-full flex flex-col items-center gap-2 px-2">
                        {/* total channels */}
                        <p
                          className={`w-full text-center border-2 border-red-50 `}>
                          Total Channels:
                        </p>
                        {/* total pages */}
                        <p
                          className={`w-full text-center border-2 border-red-50 `}>
                          Total Pages:
                        </p>
                        {/* show current page */}
                        <p
                          className={`w-full text-center border-2 border-red-50 `}>
                          Current Page:
                        </p>
                        {/* channels per page */}
                        <p
                          className={`w-full text-center border-2 border-red-50 `}>
                          Channels/page:
                        </p>
                        <div></div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full border-b-2 border-red-50 ">
                    <div className=" w-full h-full flex flex-row items-center justify-start gap-2 mb-4 ">
                      <h3 className=" flex flex-row items-center justify-center gap-1 text-lg font-bold mt-4 ">
                        Basic Controls{" "}
                        {/* <span onClick={toggleBasicControlsExpand} className="">
              {expandBasicControls ? (
                <MdOutlineExpandLess />
              ) : (
                <MdOutlineExpandMore />
              )}
            </span> */}
                      </h3>
                    </div>
                    <div className={`mb-4 px-2`}>
                      <div className="flex flex-col gap-4">
                        {/* next page btn */}
                        <button
                          //   onClick={onNext}
                          //   disabled={currentPage >= numbersOfPages}
                          className={` w-full border-2 border-red-50 hover:border-2 hover:border-[#ff00ff] text-md  hover:bg-[#a100ff] `}>
                          Next Page
                        </button>
                        {/* previous page btn */}
                        <button
                          //   onClick={onPrev}
                          //   disabled={currentPage <= 1}
                          className={` w-full border-2 border-red-50 hover:border-2 hover:border-[#ff00ff] text-md  hover:bg-[#a100ff] `}>
                          Previous Page
                        </button>
                        {/* handle go to a specific page with user input */}
                        <div className="w-full ">
                          {/* form */}
                          <form className=" w-full flex flex-col ">
                            <label htmlFor="goto_page" className="mb-1">
                              Go to a page
                            </label>
                            <div className="w-full flex flex-row  ">
                              {/* take input */}
                              <input
                                className="outline-0 w-full text-center  border-2 border-red-50 hover:border-2 hover:border-[#ff00ff] text-md  hover:bg-[#a100ff] hover:text-white"
                                // value={inputRange}
                                // onChange={(e) => setInputRange(e.target.value)}
                                placeholder="Go to a page"
                                type="text"
                                min={1}
                              />
                              {/* go to btn */}
                              <button
                                // type="submit"
                                // disabled={inputRange === ""}
                                className={`w-fit px-2  border-2 border-red-50 hover:border-2 hover:border-[#ff00ff] text-md  hover:bg-[#a100ff]  `}>
                                Go
                              </button>
                            </div>
                          </form>
                        </div>
                        {/* handle a specific numbers of channels per page with user input */}
                        <div className="w-full  ">
                          {/* form */}
                          <form
                            // onSubmit={handleChannelsPerPage}
                            className=" w-full flex flex-col  ">
                            {/* handle numbers of cnl's per page */}
                            <label htmlFor="goto_page" className="mb-1">
                              Channels per page
                            </label>
                            <div className="w-full flex flex-row  ">
                              {/* take input */}
                              <input
                                className="outline-0 w-full text-center   border-2 border-red-50 hover:border-2 hover:border-[#ff00ff] text-md  hover:bg-[#a100ff] hover:text-white "
                                // value={channelsInput}
                                // onChange={(e) => setChannelsInput(e.target.value)}
                                placeholder="Chanls per page"
                                type="text"
                                min={1}
                              />
                              {/* go to btn */}
                              <button
                                type="submit"
                                // disabled={channelsInput === ""}
                                className={`w-fit px-2 border-2 border-red-50 hover:border-2 hover:border-[#ff00ff] text-md  hover:bg-[#a100ff] `}>
                                Set
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full mt-4">{/* <BasicFilters /> */}</div>
                </div>
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
          <div className="">
            <button
              className={` border border-[#ff00ff] text-md rounded-sm bg-green-900 hover:bg-[#a100ff] dark:text-white hover:text-white  py-2 px-8 `}>
              ...{numbersOfPages}
            </button>
          </div>
        </div>
        {/* show more channels while single channels is selected to stream */}
        {selectedChannel && (
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
                        <span>({currentIndexSet[index]})</span>
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
                          <MonitorPlay />
                        </span>
                        <span
                          onClick={() => handleBookmarkChannelToggle(item.url)}>
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
        )}
      </div>
    </div>
  );
};

export default SearchStreams;

import axios from "axios";
import { useEffect, useState } from "react";
import StreamsPageSkeletonLoading from "../../Components/streams/StreamsPageSkeletonLoading";

import {
  Bookmark,
  BookmarkCheck,
  Fullscreen,
  MonitorPlay,
  ListPlus,
} from "lucide-react";
import HlsVideoPlayer from "./HlsVideoPlayer";
import { Helmet } from "react-helmet-async";
import { BASE_API_PATH } from "../../configs/api-url.config";

const TestingPage = () => {
  // search result fetching
  const [searchData, setSearchData] = useState([]);
  const [currentIndexSet, setCurrentIndexSet] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // UPDATED CODE FROM GEMINI
  // START HERE
  // store and get search data from browser local storage
  useEffect(() => {
    const stored = localStorage.getItem("searchValueLocal");
    setShowSearchValue(stored);
    if (stored) {
      console.log("Stored value:", JSON.parse(stored));
    }
  }, [searchValue, showSearchValue, searchValueInputRange]);
  // console.log("stored ", showSearchValue);

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

  //   useEffect(()=> {
  //   }, [])

  // console.log(searchData);

  //   const s = JSON.parse(showSearchValue);
  // console.log("searchValue, showSearchValue", showSearchValue);
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
  // console.log(pagesArray);
  // ____UPDATED CODE FROM CHATGPT____ //
  /** ______ENDs HERE______ */

  if (loading) return <StreamsPageSkeletonLoading />;
  if (error) return <p> Error : {error.message} </p>;

  // console.log(currentIndexSet);
  //   const videoUrl = "https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8";

  return (
    // this is search page component
    /**
     * Search by channel, title and show all search results with
     * pagination and add a sidebar for filtering and control user actions
     * refactor, add all device responsiveness
     */
    <div className="p-2 flex flex-col">
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
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="flex gap-3" htmlFor="name">
          <h1 className=" ">Search</h1>
          <h2> {">"}</h2>
          {searchValueInputRange === "" ? (
            "search for "
          ) : (
            <> Searching for {searchValueInputRange} </>
          )}
        </label>
        <div className="flex items-center ">
          <input
            className=" px-3 py-1 w-full md:w-1/3 border rounded-l-lg  "
            type="text"
            value={searchValueInputRange}
            onChange={(e) => setSearchValueInputRange(e.target.value)}
            placeholder="search by channel, title"
          />
          <button
            className="bg-blue-400 px-3 py-1 w-full md:w-[102px] rounded-r-lg "
            type="submit">
            Submit
          </button>
        </div>
      </form>

      <div className="p-3 gap-2">
        <h1 className="text-md">
          Showing Search results for {showSearchValue}
        </h1>
        <h2 className="text-md mb-2">
          Total channels : {searchData?.length || 0}
        </h2>
        {/* content container */}
        <div className=" border border-red-500 w-full min-h-screen flex flex-col lg:flex-row gap-2">
          {/* content */}
          <div className=" lg:w-[70%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {!(searchData?.length === 0) ? (
              searchData?.slice(startIndex, endIndex).map((item, index) => (
                <div key={index} className="border border-red-500 p-0">
                  <div className="flex flex-col border border-red-400 p-1 gap-1">
                    <p className="flex flex-row gap-2">
                      {" "}
                      {(currentPageNumber - 1) * channelsPerPage + (index + 1)}.
                      {/* {index + 1}.{" "} */}
                      <a href={item.url} target="_blank">
                        {item.channel || item.title}
                      </a>
                      <span>({currentIndexSet[index]})</span>
                    </p>
                    {/* icons */}
                    <div className="flex gap-3 ">
                      <span className=" p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300 ">
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
                        <div className="flex flex-row gap-3 ">
                          {item.feed && <p>{item.feed}</p>}
                          {item.quality && <p>{item.quality}</p>}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* player */}
                  <div className="border border-red-400">
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
              <div className="p-4 text-lg bg-green ">
                {" "}
                <p>No data found</p>{" "}
              </div>
            )}
          </div>
          {/* sidebar */}
          <div>this is sidebar</div>
        </div>
        {/* pagination */}
        <div className="flex gap-2 flex-wrap my-3">
          {pagesArray
            ? pagesArray?.map((page, index) => (
                <div className="w-fit h-fit" key={index}>
                  <div>
                    <button
                      onClick={() => handleCurrentPage(page)}
                      className={` border border-[#ff00ff] text-md rounded-sm hover:bg-[#a100ff] hover:text-white  py-2 px-5  ${
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
        </div>
      </div>
    </div>
  );
};

export default TestingPage;

/**
 * localStorage.setItem(key, value): Stores a key-value pair. The value must be a string.
 * localStorage.getItem(key): Retrieves the value associated with the given key. Returns null
 * if the key doesn't exist.
 * localStorage.removeItem(key): Removes a specific item based on its key.
 * localStorage.clear(): Removes all key-value pairs for the current domain.
 * localStorage.key(index): Retrieves the key name at a specific index (less commonly used).
 */

// //
//  searchData?.length < 1000 ? (
//                 searchData
//                   ?.slice(0, searchData?.length - 1)
//                   .map((item, index) => (
//                     <div key={index}>
//                       <p>
//                         {" "}
//                         {index + 1}.{" "}
//                         <a href={item.url} target="_blank">
//                           {item.channel || item.title}
//                         </a>
//                       </p>
//                     </div>
//                   ))
//               ) :

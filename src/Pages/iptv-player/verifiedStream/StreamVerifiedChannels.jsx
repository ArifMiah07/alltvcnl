import { useEffect, useState, useCallback } from "react";
import HlsVideoPlayer from "../../../Components/hls-video-player/HlsVideoPlayer";
import {
  Bookmark,
  BookmarkCheck,
  Fullscreen,
  MonitorPlay,
  ListPlus,
  Search,
  X,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { BASE_VSTREAMS_API_URL } from "../../../configs/api-url.config";

const CHANNELS_PER_PAGE = 10;

const StreamCollectedChannels = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [verifying, setVerifying] = useState(false);

  const [groups, setGroups] = useState(["All"]);
  const [filterGroup, setFilterGroup] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const { bookmarkedChannel, handleBookmarkChannelToggle } = useLocalStorage();

  // debounce raw search input into the term that actually triggers a fetch
  useEffect(() => {
    const t = setTimeout(() => {
      setSearchTerm(searchInput);
      setCurrentPageNumber(1);
    }, 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  // groups for the sidebar, fetched once on mount
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await fetch(`${BASE_VSTREAMS_API_URL}/groups`);
        const json = await res.json();
        if (json?.status) setGroups(json.data);
      } catch (err) {
        console.error("Failed to load groups:", err);
      }
    };
    fetchGroups();
  }, []);

  const fetchChannels = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        currentPage: currentPageNumber,
        channelsPerPage: CHANNELS_PER_PAGE,
        search: searchTerm,
        group: filterGroup,
      });
      const response = await fetch(`${BASE_VSTREAMS_API_URL}?${params}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const json = await response.json();
      if (!json?.status) throw new Error(json?.error || "Failed to load channels");

      setChannels(json.data || []);
      setTotalItems(json.totalItems || 0);
      setTotalPages(json.totalPages || 1);
      setVerifying(Boolean(json.verifying));
      setError(null);
    } catch (err) {
      console.error("Failed to load channels:", err);
      setError(err.message || "Failed to load channels");
    } finally {
      setLoading(false);
    }
  }, [currentPageNumber, searchTerm, filterGroup]);

  useEffect(() => {
    fetchChannels();
  }, [fetchChannels]);

  // Poll while the backend is still verifying streams in the background,
  // so the list/groups fill in without the user having to refresh manually.
  useEffect(() => {
    if (!verifying) return;
    const interval = setInterval(fetchChannels, 15000);
    return () => clearInterval(interval);
  }, [verifying, fetchChannels]);

  const handleGroupFilter = (group) => {
    setFilterGroup(group);
    setCurrentPageNumber(1);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearchTerm("");
    setCurrentPageNumber(1);
  };

  const goToPage = (page) => {
    if (page > 0 && page <= totalPages) setCurrentPageNumber(page);
  };

  // pagination window, capped at 7 numbered buttons around the current page
  const maxPagesToShow = 7;
  const half = Math.floor(maxPagesToShow / 2);
  let startPage = Math.max(1, currentPageNumber - half);
  let endPage = startPage + maxPagesToShow - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }
  const pagesArray = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  const pageTitle = `Watch Verified IPTV Channels Live - Page ${currentPageNumber} | All TV`;
  const pageDescription = `Stream ${totalItems}+ verified live IPTV channels online. Page ${currentPageNumber} of ${totalPages}.`;
  const canonicalUrl = `https://alltvcnl.netlify.app/collected-channels${currentPageNumber > 1 ? `?page=${currentPageNumber}` : ""}`;

  if (loading && channels.length === 0)
    return <p className="p-8 text-center dark:text-white">Loading channels...</p>;
  if (error)
    return <p className="p-8 text-center text-red-500 dark:text-red-400">Error: {error}</p>;

  return (
    <div className="w-full p-12 flex flex-col">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        {currentPageNumber > 1 && (
          <link
            rel="prev"
            href={`https://alltvcnl.netlify.app/collected-channels?page=${currentPageNumber - 1}`}
          />
        )}
        {currentPageNumber < totalPages && (
          <link
            rel="next"
            href={`https://alltvcnl.netlify.app/collected-channels?page=${currentPageNumber + 1}`}
          />
        )}
      </Helmet>

      <div className="p-4 w-full">
        <header className="mb-6">
          <h1 className="text-3xl font-bold mb-2 dark:text-white">
            Watch Verified IPTV Channels Live
          </h1>
          <p className="text-black dark:text-gray-300">
            Stream {totalItems}+ verified channels online.
          </p>
          {verifying && (
            <p className="text-xs text-purple-500 dark:text-purple-300 mt-1">
              Still verifying more channels in the background — list updates automatically.
            </p>
          )}
        </header>

        {/* Search + group filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search channels..."
              className="w-full pl-9 pr-9 py-2 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:border-purple-400"
            />
            {searchInput && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X size={16} />
              </button>
            )}
          </div>

          <select
            value={filterGroup}
            onChange={(e) => handleGroupFilter(e.target.value)}
            className="sm:w-[180px] py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:border-purple-400">
            {groups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        {/* result count */}
        <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          {searchTerm || filterGroup !== "All" ? (
            <>
              Showing{" "}
              <span className="font-semibold text-black dark:text-white">
                {totalItems}
              </span>{" "}
              result
              {totalItems !== 1 ? "s" : ""}
              {searchTerm && (
                <>
                  {" "}
                  for{" "}
                  <span className="font-semibold text-black dark:text-white">
                    {searchTerm}
                  </span>
                </>
              )}
              {filterGroup !== "All" && (
                <>
                  {" "}
                  in{" "}
                  <span className="font-semibold text-black dark:text-white">
                    {filterGroup}
                  </span>
                </>
              )}
            </>
          ) : (
            <>
              Total verified channels:{" "}
              <span className="font-semibold text-black dark:text-white">
                {totalItems}
              </span>
            </>
          )}
        </h3>

        <div className="w-full flex flex-col lg:flex-row gap-4">
          {/* channel grid */}
          <div className="border dark:border-gray-700 w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-2">
            {channels.length > 0 ? (
              channels.map((item) => (
                <div key={item.url || item.index} className="border dark:border-gray-700 p-0">
                  <div className="flex flex-col p-1 gap-1">
                    <p className="flex flex-row gap-2 items-center text-black dark:text-white">
                      {item.index + 1}.{" "}
                      <a href={item.url} target="_blank" rel="noreferrer" className="dark:text-white">
                        {item.channelName}
                      </a>
                      {item.logo && (
                        <div className="flex items-center justify-center w-[24px] h-[24px]">
                          <img
                            className="w-[24px]"
                            src={item.logo}
                            alt={`${item.channelName} logo`}
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        </div>
                      )}
                      {item.quality && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 border dark:border-gray-600 px-1 rounded">
                          {item.quality}
                        </span>
                      )}
                    </p>

                    {/* icons */}
                    <div className="flex gap-3">
                      <span className="p-1 flex items-center justify-center w-[24px] h-[24px] bg-purple-300 dark:bg-purple-700">
                        <Fullscreen />
                      </span>
                      <span className="p-1 flex items-center justify-center w-[24px] h-[24px] bg-purple-300 dark:bg-purple-700">
                        <MonitorPlay />
                      </span>
                      <span onClick={() => handleBookmarkChannelToggle(item)}>
                        {bookmarkedChannel[item.url] ? (
                          <span className="p-1 flex items-center justify-center w-[24px] h-[24px] bg-purple-300 dark:bg-purple-700">
                            <BookmarkCheck />
                          </span>
                        ) : (
                          <span className="p-1 flex items-center justify-center w-[24px] h-[24px] bg-purple-300 dark:bg-purple-700">
                            <Bookmark />
                          </span>
                        )}
                      </span>
                      <span className="p-1 flex items-center justify-center w-[24px] h-[24px] bg-purple-300 dark:bg-purple-700">
                        <ListPlus />
                      </span>
                    </div>
                  </div>

                  {/* player */}
                  <div className="App">
                    <HlsVideoPlayer src={item?.url} controls autoPlay={false} />
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-lg col-span-3 text-black dark:text-white">
                <p>
                  {searchTerm
                    ? `No channels found for "${searchTerm}"`
                    : "No channels found"}
                </p>
              </div>
            )}
          </div>

          {/* group filter sidebar */}
          <div className="lg:w-[30%] flex flex-col border dark:border-gray-700 max-h-[400px] overflow-y-auto">
            {groups.map((group, i) => (
              <div
                key={group}
                className={filterGroup === group ? "bg-green-500" : "dark:bg-gray-800"}>
                <button
                  onClick={() => handleGroupFilter(group)}
                  className="w-full p-1 border dark:border-gray-700 text-left">
                  <span
                    className={filterGroup === group ? "text-white" : "text-black dark:text-white"}>
                    {i + 1}. {group}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* pagination: first / prev / numbers / next / last */}
      <div className="flex gap-2 flex-wrap items-center my-3">
        <button
          onClick={() => goToPage(1)}
          disabled={currentPageNumber === 1}
          className="border border-[#ff00ff] text-md rounded-sm hover:bg-[#a100ff] hover:text-white py-2 px-4 disabled:opacity-40 dark:text-white">
          « First
        </button>
        <button
          onClick={() => goToPage(currentPageNumber - 1)}
          disabled={currentPageNumber === 1}
          className="border border-[#ff00ff] text-md rounded-sm hover:bg-[#a100ff] hover:text-white py-2 px-4 disabled:opacity-40 dark:text-white">
          ‹ Prev
        </button>

        {pagesArray.map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`border border-[#ff00ff] text-md rounded-sm hover:bg-[#a100ff] hover:text-white py-2 px-5 dark:text-white ${
              page === currentPageNumber ? "bg-green-500 text-white" : ""
            }`}>
            {page}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPageNumber + 1)}
          disabled={currentPageNumber === totalPages}
          className="border border-[#ff00ff] text-md rounded-sm hover:bg-[#a100ff] hover:text-white py-2 px-4 disabled:opacity-40 dark:text-white">
          Next ›
        </button>
        <button
          onClick={() => goToPage(totalPages)}
          disabled={currentPageNumber === totalPages}
          className="border border-[#ff00ff] text-md rounded-sm hover:bg-[#a100ff] hover:text-white py-2 px-4 disabled:opacity-40 dark:text-white">
          Last »
        </button>

        <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
          Page {currentPageNumber} of {totalPages}
        </span>
      </div>
    </div>
  );
};

export default StreamCollectedChannels;
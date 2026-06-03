import { useEffect, useState } from "react";
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

const StreamCollectedChannels = () => {
  const [channelsData, setChannelsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterGroup, setFilterGroup] = useState("All");
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [channelsPerPage] = useState(10);

  const { bookmarkedChannel, handleBookmarkChannelToggle } = useLocalStorage();

  // fetch local JSON
  useEffect(() => {
    const fetchLocalJSON = async () => {
      setLoading(true);
      try {
        const response = await fetch("/jsons/collected_channels_01.json");
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        if (!Array.isArray(data))
          throw new Error("Invalid data format: expected an array");
        setChannelsData(data);
        const uniqueGroups = [
          "All",
          ...new Set(data.map((ch) => ch.group).filter(Boolean)),
        ];
        setGroups(uniqueGroups);
        setError(null);
      } catch (err) {
        console.error("Failed to load channels:", err);
        setError(err.message || "Failed to load channels");
      } finally {
        setLoading(false);
      }
    };

    fetchLocalJSON();
  }, []);

  // filter by group + search
  const filteredChannels = channelsData
    .filter((ch) => filterGroup === "All" || ch.group === filterGroup)
    .filter((ch) =>
      ch.name?.toLowerCase().includes(searchTerm.toLowerCase().trim()),
    );

  const totalItems = filteredChannels.length;
  const totalPages = Math.ceil(totalItems / channelsPerPage);

  const paginatedChannels = filteredChannels.slice(
    (currentPageNumber - 1) * channelsPerPage,
    currentPageNumber * channelsPerPage,
  );

  const handleCurrentPage = (page) => {
    if (page > 0 && page <= totalPages) setCurrentPageNumber(page);
  };

  const handleGroupFilter = (group) => {
    setFilterGroup(group);
    setCurrentPageNumber(1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPageNumber(1);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setCurrentPageNumber(1);
  };

  // pagination window
  const maxPagesToShow = 10;
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

  // SEO
  const pageTitle = `Watch Collected IPTV Channels Live - Page ${currentPageNumber} | All TV`;
  const pageDescription = `Stream ${totalItems}+ live IPTV channels online. Page ${currentPageNumber} of ${totalPages}.`;
  const canonicalUrl = `https://alltvcnl.netlify.app/collected-channels${currentPageNumber > 1 ? `?page=${currentPageNumber}` : ""}`;

  if (loading) return <p className="p-8 text-center">Loading channels...</p>;
  if (error)
    return <p className="p-8 text-center text-red-500">Error: {error}</p>;

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
        {/* header */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold mb-2">
            Watch Collected IPTV Channels Live
          </h1>
          <p className="text-black">
            Stream {channelsData.length}+ channels online.
          </p>
        </header>

        {/* ── Search + Filter bar ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          {/* searchbar */}
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search channels..."
              className="w-full pl-9 pr-9 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-purple-400"
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X size={16} />
              </button>
            )}
          </div>

          {/* group filter dropdown */}
          <select
            value={filterGroup}
            onChange={(e) => handleGroupFilter(e.target.value)}
            className="sm:w-[180px] py-2 px-3 border border-gray-300 rounded-sm focus:outline-none focus:border-purple-400 bg-white">
            {groups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        {/* result count */}
        <h3 className="text-sm text-gray-500 mb-3">
          {searchTerm || filterGroup !== "All" ? (
            <>
              Showing{" "}
              <span className="font-semibold text-black">{totalItems}</span>{" "}
              result
              {totalItems !== 1 ? "s" : ""}
              {searchTerm && (
                <>
                  {" "}
                  for{" "}
                  <span className="font-semibold text-black">{searchTerm}</span>
                </>
              )}
              {filterGroup !== "All" && (
                <>
                  {" "}
                  in{" "}
                  <span className="font-semibold text-black">
                    {filterGroup}
                  </span>
                </>
              )}
            </>
          ) : (
            <>
              Total channels:{" "}
              <span className="font-semibold text-black">{totalItems}</span>
            </>
          )}
        </h3>

        <div className="w-full flex flex-col lg:flex-row gap-4">
          {/* channel grid */}
          <div className="border w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-2">
            {paginatedChannels.length > 0 ? (
              paginatedChannels.map((item, index) => (
                <div key={item.url || index} className="border p-0">
                  <div className="flex flex-col p-1 gap-1">
                    <p className="flex flex-row gap-2 items-center">
                      {(currentPageNumber - 1) * channelsPerPage + (index + 1)}.{" "}
                      <a href={item.url} target="_blank" rel="noreferrer">
                        {item.name}
                      </a>
                      {item.logo && (
                        <div className="flex items-center justify-center w-[24px] h-[24px]">
                          <img
                            className="w-[24px]"
                            src={item.logo}
                            alt={`${item.name} logo`}
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        </div>
                      )}
                    </p>

                    {/* icons */}
                    <div className="flex gap-3">
                      <span className="p-1 flex items-center justify-center w-[24px] h-[24px] bg-purple-300">
                        <Fullscreen />
                      </span>
                      <span className="p-1 flex items-center justify-center w-[24px] h-[24px] bg-purple-300">
                        <MonitorPlay />
                      </span>
                      <span onClick={() => handleBookmarkChannelToggle(item)}>
                        {bookmarkedChannel[item.url] ? (
                          <span className="p-1 flex items-center justify-center w-[24px] h-[24px] bg-purple-300">
                            <BookmarkCheck />
                          </span>
                        ) : (
                          <span className="p-1 flex items-center justify-center w-[24px] h-[24px] bg-purple-300">
                            <Bookmark />
                          </span>
                        )}
                      </span>
                      <span className="p-1 flex items-center justify-center w-[24px] h-[24px] bg-purple-300">
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
              <div className="p-4 text-lg col-span-3">
                <p>
                  {searchTerm
                    ? `No channels found for "${searchTerm}"`
                    : "No channels found"}
                </p>
              </div>
            )}
          </div>

          {/* group filter sidebar */}
          <div className="lg:w-[30%] flex flex-col border max-h-[400px] overflow-y-auto">
            {groups.map((group, i) => (
              <div
                key={group}
                className={`${filterGroup === group ? "bg-green-500" : ""}`}>
                <button
                  onClick={() => handleGroupFilter(group)}
                  className="w-full p-1 border">
                  <span
                    className={`${filterGroup === group ? "text-white" : "text-black"}`}>
                    {i + 1}. {group}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* pagination */}
      <div className="flex gap-2 flex-wrap my-3">
        {pagesArray.map((page, index) => (
          <div className="w-fit h-fit" key={index}>
            <button
              onClick={() => handleCurrentPage(page)}
              className={`border border-[#ff00ff] text-md rounded-sm hover:bg-[#a100ff] hover:text-white py-2 px-5 ${
                page === currentPageNumber ? "bg-green-500 text-white" : ""
              }`}>
              {page}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreamCollectedChannels;

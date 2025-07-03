// IPTVComponent.js
import { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { HiViewfinderCircle } from "react-icons/hi2";
import { FaBookmark } from "react-icons/fa";

const IPTVComponent = () => {
  const [channels, setChannels] = useState([]);
  const [filteredChannels, setFilteredChannels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [channelsPerPage, setChannelsPerPage] = useState(10);
  const [channelsPerPageInput, setChannelsPerPageInput] = useState("");
  const [sectionNumberInput, setSectionNumberInput] = useState("");
  const [bookmarkedChannels, setBookmarkedChannels] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [country, setCountry] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [filterType, setFilterType] = useState("all"); // "all", "country", "channel", "name"


  // Load data from localStorage on component mount
  useEffect(() => {
    const savedChannelsPerPage = localStorage.getItem("iptv_channels_per_page");
    const savedSectionNumber = localStorage.getItem("iptv_section_number");
    const savedBookmarks = localStorage.getItem("iptv_bookmarked_channels");

    if (savedChannelsPerPage) {
      const parsedChannelsPerPage = parseInt(savedChannelsPerPage);
      if (!isNaN(parsedChannelsPerPage) && parsedChannelsPerPage > 0) {
        setChannelsPerPage(parsedChannelsPerPage);
        setChannelsPerPageInput(savedChannelsPerPage);
      }
    }

    if (savedSectionNumber) {
      const parsedSectionNumber = parseInt(savedSectionNumber);
      if (!isNaN(parsedSectionNumber) && parsedSectionNumber > 0) {
        setCurrentPage(parsedSectionNumber);
        setSectionNumberInput(savedSectionNumber);
      }
    }

    if (savedBookmarks) {
      try {
        const parsedBookmarks = JSON.parse(savedBookmarks);
        setBookmarkedChannels(parsedBookmarks);
      } catch (error) {
        console.error("Error parsing bookmarks:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchIPTVData = async () => {
      try {
        const response = await axios.get(
          "https://iptv-org.github.io/api/streams.json"
        );
        setChannels(response.data);
        setFilteredChannels(response.data);
      } catch (error) {
        console.error("Error fetching IPTV data:", error);
      }
    };

    fetchIPTVData();
  }, []);

  // Fetch country data when search text changes
  useEffect(() => {
    const fetchCountries = async () => {
      if (searchText.trim() === "") {
        setCountry([]);
        return;
      }

      try {
        const res = await fetch(
          `https://restcountries.com/v3.1/name/${searchText}?fields=name,cca2,flags`
        );
        if (res.ok) {
          const data = await res.json();
          setCountry(data);
        } else {
          setCountry([]);
        }
      } catch (error) {
        console.error("Failed to fetch countries", error);
        setCountry([]);
      }
    };

    const debounceTimer = setTimeout(fetchCountries, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchText]);

  // Get channels to display (filtered or all)
  const channelsToDisplay = isFiltering ? filteredChannels : channels;
  const totalPages = Math.ceil(channelsToDisplay.length / channelsPerPage);

  const indexOfLastChannel = currentPage * channelsPerPage;
  const indexOfFirstChannel = indexOfLastChannel - channelsPerPage;
  const currentChannels = channelsToDisplay.slice(
    indexOfFirstChannel,
    indexOfLastChannel
  );

  // Bookmark functionality
  const isChannelBookmarked = (channelUrl) => {
    return bookmarkedChannels.some((bookmark) => bookmark.url === channelUrl);
  };

  const toggleBookmark = (channel) => {
    let updatedBookmarks;

    if (isChannelBookmarked(channel.url)) {
      // Remove bookmark
      updatedBookmarks = bookmarkedChannels.filter(
        (bookmark) => bookmark.url !== channel.url
      );
    } else {
      // Add bookmark
      const bookmarkData = {
        id: channel.id,
        name: channel.name || channel.channel || "Unknown Channel",
        url: channel.url,
        channel: channel.channel,
        dateBookmarked: new Date().toISOString(),
      };
      updatedBookmarks = [...bookmarkedChannels, bookmarkData];
    }

    setBookmarkedChannels(updatedBookmarks);
    localStorage.setItem(
      "iptv_bookmarked_channels",
      JSON.stringify(updatedBookmarks)
    );
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      localStorage.setItem("iptv_section_number", pageNumber.toString());
      setSectionNumberInput(pageNumber.toString());
    }
  };

  const handleSubmitSectionForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const value = parseInt(form.cnlPerPage.value);

    if (!isNaN(value) && value > 0 && value <= totalPages) {
      setCurrentPage(value);
      localStorage.setItem("iptv_section_number", value.toString());
      setSectionNumberInput(value.toString());
    } else {
      alert(`Please enter a valid section number between 1 and ${totalPages}.`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const value = parseInt(form.cnlPerPage.value);

    if (!isNaN(value) && value > 0) {
      setChannelsPerPage(value);
      setCurrentPage(1);
      localStorage.setItem("iptv_channels_per_page", value.toString());
      localStorage.setItem("iptv_section_number", "1");
      setChannelsPerPageInput(value.toString());
      setSectionNumberInput("1");
    } else {
      alert("Please enter a valid positive number.");
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      localStorage.setItem("iptv_section_number", newPage.toString());
      setSectionNumberInput(newPage.toString());
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      localStorage.setItem("iptv_section_number", newPage.toString());
      setSectionNumberInput(newPage.toString());
    }
  };

  const handleUrl = (url) => {
    console.log(url);
  };

  // Enhanced filtering functionality
  const handleSubmitFiltering = (e) => {
    e.preventDefault();

    if (searchText.trim() === "") {
      // If search is empty, show all channels
      setIsFiltering(false);
      setFilteredChannels([]);
      setCurrentPage(1);
      return;
    }

    let filtered = [];
    const searchLower = searchText.toLowerCase().trim();

    switch (filterType) {
      case "channel":
        // Filter by exact channel match
        filtered = channels.filter(
          (cnl) => cnl.channel && cnl.channel.toLowerCase() === searchLower
        );
        break;

      case "name":
        // Filter by channel name (partial match)
        filtered = channels.filter(
          (cnl) =>
            (cnl.name && cnl.name.toLowerCase().includes(searchLower)) ||
            (cnl.channel && cnl.channel.toLowerCase().includes(searchLower))
        );
        break;

      case "country":
        // Filter by country code from domain (after the dot)
        if (country.length > 0) {
          const countryCode = country[0].cca2.toLowerCase();

          filtered = channels.filter((cnl) => {
            if (!cnl.channel) return false;

            // Split by dot and get the last part (domain extension)
            const parts = cnl.channel.split(".");
            if (parts.length > 1) {
              const domainExtension = parts[parts.length - 1].toLowerCase();
              // Check if the domain extension matches the country code
              return domainExtension === countryCode;
            }
            return false;
          });
        } else {
          // If country not found in API, try direct search for country code
          filtered = channels.filter((cnl) => {
            if (!cnl.channel) return false;

            const parts = cnl.channel.split(".");
            if (parts.length > 1) {
              const domainExtension = parts[parts.length - 1].toLowerCase();
              return domainExtension === searchLower;
            }
            return false;
          });
        }
        break;

      default:
        // "all" - search in all fields
        filtered = channels.filter((cnl) => {
          const channelMatch =
            cnl.channel && cnl.channel.toLowerCase().includes(searchLower);
          const nameMatch =
            cnl.name && cnl.name.toLowerCase().includes(searchLower);
          const urlMatch =
            cnl.url && cnl.url.toLowerCase().includes(searchLower);

          return channelMatch || nameMatch || urlMatch;
        });

        // If no direct matches found, try country matching
        if (filtered.length === 0 && country.length > 0) {
          const countryCode = country[0].cca2.toLowerCase();

          filtered = channels.filter((cnl) => {
            if (!cnl.channel) return false;

            // Split by dot and get the last part (domain extension)
            const parts = cnl.channel.split(".");
            if (parts.length > 1) {
              const domainExtension = parts[parts.length - 1].toLowerCase();
              // Check if the domain extension matches the country code
              return domainExtension === countryCode;
            }
            return false;
          });
        }
    }

    setFilteredChannels(filtered);
    setIsFiltering(true);
    setCurrentPage(1);
  };

  // Clear filters
  const clearFilters = () => {
    setSearchText("");
    setIsFiltering(false);
    setFilteredChannels([]);
    setCurrentPage(1);
    setCountry([]);
  };

  return (
    <div className="min-h-screen w-full mb-12 ">
      {/* Navigation */}
      <nav className="bg-green-500 p-4 mb-6 lg:mb-12">
        <div className="flex flex-col lg:flex-row justify-end items-center gap-5 ">
          <div className="text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">
            <h1>IPTV Channels : {channels.length}</h1>
          </div>

          {/* Filter Type Selection */}
          <div className="flex w-fit bg-green-700">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="outline-none py-2 px-3 bg-white text-black">
              <option value="all">All Fields</option>
              <option value="channel">Channel Exact</option>
              <option value="name">Channel Name</option>
              <option value="country">Country</option>
            </select>
          </div>
          {/* Enhanced Search Section */}
          <div className="flex flex-col flex-1 border border-green-500 bg-green-600 items-center">
            {/* Search Form */}
            <form
              onSubmit={handleSubmitFiltering}
              className="flex flex-col lg:flex-row items-center gap-0 w-full">
              <input
                className="outline-none text-center py-2 px-3 bg-white w-full lg:w-full"
                placeholder={`Search By ${
                  filterType === "all"
                    ? "Country, Channel Name, URL"
                    : filterType === "country"
                    ? "Country Name"
                    : filterType === "channel"
                    ? "Channel Name (Exact)"
                    : "Channel Name"
                }`}
                type="text"
                name="searchText"
                id="searchText"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button
                className="text-center py-2 px-3 bg-purple-600 hover:bg-purple-700 text-white w-full lg:w-fit"
                type="submit">
                Search
              </button>
              {isFiltering && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-center py-2 px-3 bg-red-600 hover:bg-red-700 text-white w-full lg:w-fit">
                  Clear
                </button>
              )}
            </form>

            {/* Filter Status */}
            {isFiltering && (
              <div className="w-full bg-yellow-100 text-black text-center py-1 px-2 text-sm">
                Showing {filteredChannels.length} filtered results for &quot;
                {searchText}&quot; ({filterType})
              </div>
            )}

            {/* Country Suggestions */}
            {country.length > 0 && filterType === "country" && (
              <div className="w-full bg-blue-100 text-black text-center py-1 px-2 text-sm">
                Found country: {country[0].name.common} ({country[0].cca2})
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-4">
            <span className="text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">
              <h1>
                {isFiltering
                  ? `Filtered: ${filteredChannels.length}`
                  : `Total: ${channels.length}`}
              </h1>
            </span>
            <Link
              to="/saved-channels"
              className="text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded flex items-center gap-2">
              Saved Channels ({bookmarkedChannels.length})
            </Link>
          </div>
        </div>
      </nav>

      {/* Section Info & Prev/Next */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-3 items-center justify-between my-4">
        <h3 className="capitalize bg-purple-600 text-white py-2 px-3 w-full lg:w-auto text-center">
          Current Section: {currentPage} / {totalPages}
        </h3>
        <div className="flex flex-col border border-green-500 bg-green-600 items-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col lg:flex-row items-center gap-0 w-full">
            <input
              className="outline-none text-center py-2 px-3 bg-white w-full lg:w-full"
              placeholder="Cnl's Per Sec."
              type="number"
              name="cnlPerPage"
              id="cnlPerPage"
              min="1"
              value={channelsPerPageInput}
              onChange={(e) => setChannelsPerPageInput(e.target.value)}
            />
            <button
              className="text-center py-2 px-3 bg-green-500 text-white w-full lg:w-fit"
              type="submit">
              Submit
            </button>
          </form>
        </div>
        <div className="flex flex-col border border-green-500 bg-green-600 items-center">
          <form
            onSubmit={handleSubmitSectionForm}
            className="flex flex-col lg:flex-row items-center gap-0 w-full">
            <input
              className="outline-none text-center py-2 px-3 bg-white w-full lg:w-full"
              placeholder="Sec. Num"
              type="number"
              name="cnlPerPage"
              id="sectionNumber"
              min="1"
              max={totalPages}
              value={sectionNumberInput}
              onChange={(e) => setSectionNumberInput(e.target.value)}
            />
            <button
              className="text-center py-2 px-3 bg-green-500 text-white w-full lg:w-fit"
              type="submit">
              Submit
            </button>
          </form>
        </div>
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`py-2 px-5 rounded text-white ${
            currentPage === 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500"
          }`}>
          Previous Section
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`py-2 px-5 rounded text-white ${
            currentPage === totalPages || totalPages === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500"
          }`}>
          Next Section
        </button>
      </div>

      {/* No Results Message */}
      {isFiltering && filteredChannels.length === 0 && (
        <div className="text-center py-8 bg-yellow-100 rounded-lg mx-4">
          <h3 className="text-lg font-semibold text-gray-700">
            No channels found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search criteria or filter type.
          </p>
          <button
            onClick={clearFilters}
            className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Show All Channels
          </button>
        </div>
      )}

      {/* Channel Cards */}
      <div className="flex flex-wrap justify-center gap-5 my-12 channels-container">
        {currentChannels?.map((channel, index) => (
          <div key={index} className="bg-red-50 p-0 w-80 channel-card relative">
            {/* Bookmark indicator */}
            {isChannelBookmarked(channel?.url) && (
              <div className="absolute top-2 right-2 bg-yellow-100 hover:bg-yellow-200 text-black px-2 py-1 rounded text-xs font-bold">
                <FaBookmark />
              </div>
            )}

            <h2 className="mx-3 text-gray-500 text-lg">{channel?.channel}</h2>
            {channel?.name && channel?.name !== channel?.channel && (
              <p className="mx-3 text-gray-400 text-sm">{channel?.name}</p>
            )}

            {/* Action buttons */}
            <div className="flex gap-2 mx-3 my-3">
              <button onClick={() => handleUrl(channel?.url)}>
                <Link
                  to={`/view`}
                  state={{
                    channelName: channel?.channel,
                    channelUrl: channel?.url,
                    channelId: channel?.id,
                    from: location.pathname,
                  }}>
                  <span className="bg-purple-100 hover:bg-purple-200 text-black py-2 px-4 rounded cursor-pointer">
                    <HiViewfinderCircle className="inline-block w-5 h-5 mr-2" />
                  </span>
                </Link>
              </button>

              <button
                onClick={() => toggleBookmark(channel)}
                className={`py-2 px-4 rounded text-black font-medium ${
                  isChannelBookmarked(channel?.url)
                    ? "bg-red-100 hover:bg-red-200"
                    : "bg-green-100 hover:bg-green-200"
                }`}>
                {isChannelBookmarked(channel?.url) ? "★" : "☆"}
              </button>
              <button
                // onClick={() => toggleBookmark(channel)}
                className={`py-2 bg-pink-100 hover:bg-pink-200 px-4 rounded text-gray-500 font-medium`}>
                {index + 1}
              </button>
            </div>
            {channel?.url && ReactPlayer.canPlay(channel.url) ? (
              <ReactPlayer
                url={channel.url}
                controls
                width="100%"
                height="auto"
              />
            ) : (
              <div className="text-center text-gray-400 py-6">
                Stream not available
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      {totalPages > 0 && (
        <div className="flex flex-wrap gap-3 pagination items-center justify-center">
          <span className="bg-green-400 py-2 px-5 text-white">
            All Sections: {totalPages}
          </span>
          {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
            // Show first 5, current page area, and last 5 pages
            let pageNum;
            if (totalPages <= 10) {
              pageNum = i + 1;
            } else if (currentPage <= 5) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 4) {
              pageNum = totalPages - 9 + i;
            } else {
              pageNum = currentPage - 4 + i;
            }

            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`flex gap-2 items-center py-2 px-4 rounded ${
                  currentPage === pageNum
                    ? "bg-red-400 text-white"
                    : "bg-yellow-50 text-gray-600"
                }`}>
                {pageNum}
              </button>
            );
          })}
          {totalPages > 10 && (
            <span className="bg-gray-200 py-2 px-3 rounded text-gray-600">
              ... {totalPages}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default IPTVComponent;

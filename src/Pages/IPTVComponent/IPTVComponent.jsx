// IPTVComponent.js
import { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { HiViewfinderCircle } from "react-icons/hi2";
import { FaBookmark } from "react-icons/fa";

const IPTVComponent = () => {
  const [channels, setChannels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [channelsPerPage, setChannelsPerPage] = useState(10);
  const [channelsPerPageInput, setChannelsPerPageInput] = useState("");
  const [sectionNumberInput, setSectionNumberInput] = useState("");
  const [bookmarkedChannels, setBookmarkedChannels] = useState([]);

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
      } catch (error) {
        console.error("Error fetching IPTV data:", error);
      }
    };

    fetchIPTVData();
  }, []);

  const totalPages = Math.ceil(channels.length / channelsPerPage);

  const indexOfLastChannel = currentPage * channelsPerPage;
  const indexOfFirstChannel = indexOfLastChannel - channelsPerPage;
  const currentChannels = channels.slice(
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

  console.log(channels);

  return (
    <div>
      {/* Navigation */}
      <nav className="bg-gray-800 p-4 mb-6">
        <div className="flex justify-between items-center">
          {/* <h1 className="text-white text-xl font-bold">IPTV Player</h1> */}
          <div className="flex gap-4">
            <Link
              to="/about"
              className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
              All Channels
            </Link>
            <Link
              to="/saved-channels"
              className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded flex items-center gap-2">
              Saved Channels ({bookmarkedChannels.length})
            </Link>
          </div>
        </div>
      </nav>

      <h1>IPTV Channels : {channels.length}</h1>

      {/* Section Info & Prev/Next */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-3 items-center  justify-between  px-4 my-4">
        <h3 className="capitalize bg-purple-600 text-white py-2 px-3 w-full lg:w-auto text-center">
          Current Section: {currentPage}
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
              className="text-center py-2 px-3 bg-green-400 text-white w-full lg:w-fit"
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
              className="text-center py-2 px-3 bg-green-400 text-white w-full lg:w-fit"
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

      {/* Channel Cards */}
      <div className="flex flex-wrap justify-center gap-5 my-12 channels-container">
        {currentChannels.map((channel, index) => (
          <div
            key={index}
            className="bg-red-50 border border-red-300 p-0 w-80 channel-card relative">
            {/* Bookmark indicator */}
            {isChannelBookmarked(channel.url) && (
              <div className="absolute top-2 right-2 bg-yellow-100 hover:bg-yellow-200 text-black px-2 py-1 rounded text-xs font-bold">
                <FaBookmark />
              </div>
            )}

            <h2 className="text-white text-lg">{channel.channel}</h2>

            {/* Action buttons */}
            <div className="flex gap-2 my-3">
              <button onClick={() => handleUrl(channel.url)}>
                <Link
                  to={`/view`}
                  state={{
                    channelName: channel.channel,
                    channelUrl: channel.url,
                    channelId: channel.id,
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
                  isChannelBookmarked(channel.url)
                    ? "bg-red-100 hover:bg-red-200"
                    : "bg-green-100 hover:bg-green-200"
                }`}>
                {isChannelBookmarked(channel.url) ? "★" : "☆"}
              </button>
            </div>

            <ReactPlayer
              url={channel.url}
              controls={true}
              width="100%"
              height="auto"
            />
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex flex-wrap gap-3 pagination items-center justify-center">
        <span className="bg-green-400 py-2 px-5 text-white">All Sections:</span>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`flex gap-2 items-center flex-1 py-2 px-4 rounded ${
              currentPage === i + 1
                ? "bg-red-400 text-white"
                : "bg-yellow-50 text-gray-600"
            }`}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default IPTVComponent;

import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const SavedChannelsPage = () => {
  const [bookmarkedChannels, setBookmarkedChannels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem("iptv_bookmarked_channels");
    if (savedBookmarks) {
      try {
        const parsedBookmarks = JSON.parse(savedBookmarks);
        setBookmarkedChannels(parsedBookmarks);
      } catch (error) {
        console.error("Error parsing bookmarks:", error);
      }
    }
  }, []);

  const removeBookmark = (channelUrl) => {
    const updatedBookmarks = bookmarkedChannels.filter(
      (bookmark) => bookmark.url !== channelUrl
    );
    setBookmarkedChannels(updatedBookmarks);
    localStorage.setItem(
      "iptv_bookmarked_channels",
      JSON.stringify(updatedBookmarks)
    );

    // Adjust current page if needed after removal
    const totalPages = Math.ceil(updatedBookmarks.length / itemsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  };

  const clearAllBookmarks = () => {
    if (window.confirm("Are you sure you want to remove all saved channels?")) {
      setBookmarkedChannels([]);
      localStorage.removeItem("iptv_bookmarked_channels");
      setCurrentPage(1);
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(bookmarkedChannels.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentChannels = bookmarkedChannels.slice(startIndex, endIndex);

  // Pagination controls
  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="container mx-auto p-0 mb-12">
      <Helmet>
        <title>Saved Channels | IPTV Player</title>
        <meta
          name="description"
          content="Learn more about our IPTV Player and the team behind the experience."
        />
      </Helmet>

      {/* Navigation */}
      <nav className="bg-green-500 p-4 mb-6">
        <div className="flex justify-end items-center">
          <div className="flex gap-4">
            <Link
              to="/iptv"
              className="text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">
              Back to All Channels
            </Link>
            {bookmarkedChannels?.length > 0 && (
              <button
                onClick={clearAllBookmarks}
                className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded">
                Clear All
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Your Saved Channels ({bookmarkedChannels?.length})
        </h2>
        <p className="text-gray-600">
          Manage your bookmarked IPTV channels here
        </p>
      </div>

      {bookmarkedChannels?.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📺</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Saved Channels Yet
          </h3>
          <p className="text-gray-500 mb-6">
            Start saving your favorite channels to access them quickly
          </p>
          <Link
            to="/more"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg">
            Browse Channels
          </Link>
        </div>
      ) : (
        <>
          {/* Items per page selector and pagination info */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <label htmlFor="itemsPerPage" className="text-sm text-gray-600">
                Show:
              </label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-gray-300 rounded px-2 py-1 text-sm">
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-sm text-gray-600">per page</span>
            </div>

            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, bookmarkedChannels.length)} of{" "}
              {bookmarkedChannels.length} channels
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Channel Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Saved
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentChannels?.map((channel, index) => (
                    <tr key={startIndex + index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {startIndex + index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {channel.name}
                        </div>
                        {channel?.channel &&
                          channel?.channel !== channel?.name && (
                            <div className="text-sm text-gray-500">
                              {channel?.channel}
                            </div>
                          )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 break-all max-w-xs">
                          {channel?.url?.length > 50
                            ? `${channel?.url?.substring(0, 50)}...`
                            : channel?.url}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(channel?.dateBookmarked).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <Link
                            to={`/view`}
                            state={{
                              channelName: channel?.channel || "Unknown Channel",
                              channelUrl: channel?.url,
                              channelId: channel?.id,
                              from: "/saved-channels",
                            }}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm">
                            View
                          </Link>
                          <button
                            onClick={() => removeBookmark(channel?.url)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 gap-2">
              {/* Previous Button */}
              <button
                onClick={goToPrevious}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded text-sm font-medium ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}>
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex gap-1">
                {getPageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === "number" && goToPage(page)}
                    disabled={page === "..."}
                    className={`px-3 py-2 rounded text-sm font-medium ${
                      page === currentPage
                        ? "bg-purple-600 text-white"
                        : page === "..."
                        ? "bg-white text-gray-400 cursor-default"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                    }`}>
                    {page}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={goToNext}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded text-sm font-medium ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}>
                Next
              </button>
            </div>
          )}

          {/* Bottom pagination info */}
          {totalPages > 1 && (
            <div className="text-center mt-4 text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SavedChannelsPage;

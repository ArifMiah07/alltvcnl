import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export const SavedChannelsPage = () => {
  const [bookmarkedChannels, setBookmarkedChannels] = useState([]);

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
      bookmark => bookmark.url !== channelUrl
    );
    setBookmarkedChannels(updatedBookmarks);
    localStorage.setItem("iptv_bookmarked_channels", JSON.stringify(updatedBookmarks));
  };

  const clearAllBookmarks = () => {
    if (window.confirm("Are you sure you want to remove all saved channels?")) {
      setBookmarkedChannels([]);
      localStorage.removeItem("iptv_bookmarked_channels");
    }
  };

  return (
    <div className="container mx-auto p-0">
          <Helmet>
                <title>Saved Channels | IPTV Player</title>
                <meta name="description" content="Learn more about our IPTV Player and the team behind the experience." />
              </Helmet>
      {/* Navigation */}
      <nav className="bg-green-500 p-4 mb-6 ">
        <div className="flex justify-end items-center">
          {/* <h1 className="text-white text-xl font-bold">Saved Channels</h1> */}
          <div className="flex gap-4">
            <Link 
              to="/" 
              className="text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
            >
              Back to All Channels
            </Link>
            {bookmarkedChannels.length > 0 && (
              <button
                onClick={clearAllBookmarks}
                className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Your Saved Channels ({bookmarkedChannels.length})
        </h2>
        <p className="text-gray-600">
          Manage your bookmarked IPTV channels here
        </p>
      </div>

      {bookmarkedChannels.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📺</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Saved Channels Yet
          </h3>
          <p className="text-gray-500 mb-6">
            Start saving your favorite channels to access them quickly
          </p>
          <Link 
            to="/" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
          >
            Browse Channels
          </Link>
        </div>
      ) : (
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
                {bookmarkedChannels.map((channel, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {channel.name}
                      </div>
                      {channel.channel && channel.channel !== channel.name && (
                        <div className="text-sm text-gray-500">
                          {channel.channel}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 break-all max-w-xs">
                        {channel.url.length > 50 
                          ? `${channel.url.substring(0, 50)}...` 
                          : channel.url
                        }
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(channel.dateBookmarked).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <Link
                          to={`/view`}
                          state={{
                            channelName: channel.channel || 'Unknown Channel',
                            channelUrl: channel.url,
                            channelId: channel.id,
                            from: "/saved-channels",
                          }}
                          className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => removeBookmark(channel.url)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                        >
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
      )}
    </div>
  );
};
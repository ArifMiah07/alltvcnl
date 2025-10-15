import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const BATCH_SIZE = 50;

const IPTVLN = () => {
  const [allChannels, setAllChannels] = useState([]);
  const [visibleChannels, setVisibleChannels] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView();
  const location = useLocation();

  // Fetch all channels once
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await axios.get(
          "https://iptv-org.github.io/api/streams.json"
        );
        setAllChannels(response.data);
        setVisibleChannels(response.data.slice(0, BATCH_SIZE));
      } catch (error) {
        console.error("Error fetching channels:", error);
      }
    };

    fetchChannels();
  }, []);

  // Load next batch for infinite scroll
  const loadMore = useCallback(() => {
    const start = page * BATCH_SIZE;
    const end = start + BATCH_SIZE;
    const nextBatch = allChannels.slice(start, end);
    if (nextBatch.length > 0) {
      setVisibleChannels((prev) => [...prev, ...nextBatch]);
      setPage((prev) => prev + 1);
    }
  }, [page, allChannels]);

  // Trigger load more when inView changes
  useEffect(() => {
    if (inView && !loading) {
      setLoading(true);
      setTimeout(() => {
        loadMore();
        setLoading(false);
      }, 500); // simulate slight delay
    }
  }, [inView, loadMore, loading]);

  return (
    <div className="max-w-4xl min-h-screen mx-auto p-4">
      <h1 className="text-2xl text-black font-bold mb-4">IPTV Channels : {allChannels.length}</h1>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">index</th>
            <th className="border border-gray-300 p-2 text-left">Channel Name</th>
            <th className="border border-gray-300 p-2 text-left">Link</th>
            <th className="border border-gray-300 p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {visibleChannels?.map((channel, index) => (
            <tr key={channel?.id || index} className="hover:bg-purple-50">
              <td className="border border-gray-300 p-2">
                {index + 1 || "Unknown index"}
              </td>
              <td className="border border-gray-300 p-2">
                {channel?.channel || channel?.title || "Unknown Channel"}
              </td>
              <td className="border border-gray-300 p-2">
                <a
                  href={channel?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Watch
                </a>
              </td>
              <td className="border border-gray-300 p-2">
                <Link
                  to={`/view`}
                  state={{
                    channelName: channel?.channel || "Unknown Channel",
                    channelUrl: channel?.url,
                    channelId: channel?.id,
                    from: location.pathname,
                  }}
                >
                  <button className="bg-purple-100 hover:bg-purple-200 text-black py-1 px-3 rounded cursor-pointer inline-flex items-center">
                    View
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Infinite scroll trigger */}
      <div ref={ref} className="text-center mt-6 text-gray-500">
        {loading ? "Loading more channels..." : "Scroll down to load more..."}
      </div>
    </div>
  );
};

export default IPTVLN;

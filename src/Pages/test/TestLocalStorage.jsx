// testing local storage more simply :>

import { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import HlsVideoPlayer from "../../Components/hls-video-player/HlsVideoPlayer";
import axios from "axios";

const TestLocalStorage = () => {
  // states
  // const [userInfoInput, setUserInfoInput] = useState(null);
  const { bookmarkedChannel } = useLocalStorage();
  const allBookmarkedChannels = Object.keys(bookmarkedChannel);
  const [results, setResults] = useState(null);

  const [bookmarkedStreams, setBookmarkedStreams] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleProcessData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/iptv-player/testing-bookmarked-channels",
          bookmarkedChannel, // axios automatically sets Content-Type header
        );

        setResults(response.data);
      } catch (err) {
        console.error("Failed to fetch:", err);
      }
    };

    handleProcessData();
  }, [bookmarkedChannel]);

  console.log("result .......", results);

  useEffect(() => {
    const fetchBookmarkedStreams = async () => {
      // Don't fetch if no bookmarks
      if (Object.keys(bookmarkedChannel).length === 0) {
        setBookmarkedStreams([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.post(
          "http://localhost:5000/api/iptv-player/testing-bookmarked-channels",
          bookmarkedChannel,
        );

        setBookmarkedStreams(response.data.data); // Adjust based on your API response
      } catch (err) {
        console.error("Failed to fetch bookmarked streams:", err);
        setError("Failed to load bookmarked channels");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookmarkedStreams();
  }, [bookmarkedChannel]); // Re-fetch when bookmarks change

  // Loading state
  if (isLoading) {
    return (
      <section className="p-12 w-full min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading your bookmarked channels...</div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="p-12 w-full min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </section>
    );
  }

  // Empty state
  if (!bookmarkedStreams || bookmarkedStreams.length === 0) {
    return (
      <section className="p-12 w-full min-h-screen flex items-center justify-center">
        <div className="text-xl">No bookmarked channels yet</div>
      </section>
    );
  }

  return (
    <section className="border border-red-400 p-12 w-full min-h-screen">
      {/* hello */}
      <div></div>
      <div className="min-h-screen p-16">
        {allBookmarkedChannels?.slice(2, 3).map((channel, index) => (
          <div className="p-2" key={index}>
            <div>
              <HlsVideoPlayer src={channel} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestLocalStorage;

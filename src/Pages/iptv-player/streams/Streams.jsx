// stream here

import axios from "axios";
import { useEffect, useState } from "react";
import { usePagination } from "../../../hooks/usePagination";
import ReactPlayer from "react-player";

/**
 *
 * @params
 * channel: null
 * feed: null
 * quality: "480p"
 * referrer: null
 * title: "Iman TV"
 * url: "https://live.relentlessinnovations.net:1936/imantv/imantv/playlist.m3u8"
 * user_agent : null
 */

const Streams = () => {
  // react states
  const [streams, setStreams] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //
  const { currentPage, itemsPerPage } = usePagination();

  // effects
  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/iptv-player/streams`,
          {
            params: { currentPage, itemsPerPage },
          }
        );
        setStreams(response?.data?.data);
        setError(null);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        //
        setLoading(false);
      }
    };

    fetchStreams();
  }, [currentPage, itemsPerPage]);

  console.log(streams);

  //
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  //
  return (
    <div className="min-h-screen w-full p-4">
      <h1>this is </h1>
      <p>total pages {streams?.length}</p>
      <div>Streams Page</div>
      <div></div>
      <div className="w-full p-3 grid grid-cols-2 gap-5">
        {streams.map((stream, index) => (
          <div className="w-full border border-red-500 p-3" key={index}>
            <p>{index}</p>
            <div className="border border-blue-500">
              <ReactPlayer
                controls
                url={stream?.url}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Streams;

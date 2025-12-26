// stream here

import axios from "axios";
import { useEffect, useState } from "react";

const Streams = () => {
  // react states
  const [streams, setStreams] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const baseUrl = "http://localhost:5000";
  const streamApiAddress = `/api/iptv-player/streams`;

  const apiUrl = `${baseUrl + streamApiAddress}`;
  // effects
  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const response = await axios.get(apiUrl, {
          params: { currentPage, itemsPerPage },
        });
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
    <div>
      <h1>this is </h1>
      <div>Streams Page</div>
    </div>
  );
};

export default Streams;

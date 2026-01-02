// fetch api here
import axios from "axios";
import { useEffect, useState } from "react";
import { usePagination } from "./usePagination";
// import { API_URL } from "../constants/url";
// import { usePagination } from "../contexts/PaginationContext";

const API_URL = {
  streams_api_url: "http://localhost:5000/api/iptv-player/streams",
  streams_api_url_prod:
    "https://iptv-player-server.vercel.app/api/iptv-player/streams",
};

const useFetchStreams = () => {
  // react states
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [totalItems, setTotalItems] = useState(0);

  const { currentPage, channelsPerPage, setTotalItems } = usePagination();

  // use hooks
  // constants

  // react side effects
  // fetch streams api from backend
  useEffect(() => {
    // fetch
    async function fetchStreams() {
      try {
        const response = await axios.get(API_URL.streams_api_url_prod, {
          params: { currentPage, channelsPerPage },
        });
        console.log(response?.data?.data);
        setStreams(response?.data?.data);
        setTotalItems(response?.data?.totalItems);
        setError(null); // clear previous error
      } catch (error) {
        //
        // console.log(error);
        setError(error.message || "something went wrong!");
      } finally {
        //
        setLoading(false);
        // console.log("complete");
      }
    }
    // call
    fetchStreams();
  }, [currentPage, channelsPerPage]);

  console.log(streams);

  return { streams, loading, error };
};

export default useFetchStreams;

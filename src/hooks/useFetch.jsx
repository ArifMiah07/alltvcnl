// fetch api here
import axios from "axios";
import { useEffect, useState } from "react";
import { usePagination } from "./usePagination";
import { BASE_STREAMS_API_URL } from "../configs/api-url.config";
// import { API_URL } from "../constants/url";
// import { usePagination } from "../contexts/PaginationContext";

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
        const response = await axios.get(BASE_STREAMS_API_URL, {
          params: { currentPage, channelsPerPage },
        });
        console.log(response?.data);
        // console.log(BASE_STREAMS_API_URL);
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
  }, [currentPage, channelsPerPage, setTotalItems]);

  // console.log(streams);

  return { streams, loading, error };
};

export default useFetchStreams;

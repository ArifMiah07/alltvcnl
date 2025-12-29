// stream here

// import axios from "axios";

import { usePagination } from "../../../hooks/usePagination";
import useFetchStreams from "../../../hooks/useFetch";
import StreamsGrid from "../../../Components/streams/StreamsGrid";
import PaginationNumbers from "../../../Components/pagination/PaginationNUmbers";

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
  // const [streams, setStreams] = useState();
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // react states
  // const [specificChannelStream, setSpecificChannelStream] = useState({});
  // const [bookmarks, setBookmark] = useState({});
  // const [specificChannelParams, setSpecificChannelParams] = useState({});

  // console.log("", specificChannelStream);
  // use hooks
  const { streams, loading, error } = useFetchStreams();
  const {
    currentPage,
    numbersOfPages,
    inputRange,
    setInputRange,
    handleCurrentPage,
    handleGotoPage,
    handleNextPage,
    handlePrevPage,
    channelsPerPage,
    channelsInput,
    setChannelsInput,
    handleChannelsPerPage,
    totalItems,
    // setTotalItems,
  } = usePagination();

  console.log(streams);

  const startPage = Math.max(1, currentPage - 4);
  const pagesArray = Array.from({ length: 10 }, (_, i) => startPage + i);

  //
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log(pagesArray);
  return (
    <div className="min-h-screen w-full p-4">
      <h1>this is </h1>
      <p>total pages {numbersOfPages}</p>
      <div>Streams Page</div>
      {/* <div></div> */}
      {/* main content */}
      <div className="w-full h-full flex flex-col lg:grid lg:grid-cols-5 ">
        {/* streams grid */}
        <StreamsGrid
          streams={streams}
          currentPage={currentPage}
          channelsPerPage={channelsPerPage}
        />
        {/* sidebar */}
        {/* <Sidebar
          currentPage={currentPage}
          numbersOfPages={numbersOfPages}
          inputRange={inputRange}
          setInputRange={setInputRange}
          onNext={handleNextPage}
          onPrev={handlePrevPage}
          onGoto={handleGotoPage}
          channelsPerPage={channelsPerPage}
          channelsInput={channelsInput}
          setChannelsInput={setChannelsInput}
          handleChannelsPerPage={handleChannelsPerPage}
          totalChannels={totalItems}
        /> */}
      </div>
      <div className=" flex flex-row gap-3 p-3 w-full">
        <div>{/* <p className="text-lg font-black">{currentPage}</p> */}</div>
      </div>
      {/* pagination */}
      {/* <div className="w-full my-6 ">
        <div className="p-2 flex flex-row justify-between items-center">
          {pagesArray?.map((page, index) => (
            <button
              onClick={() => handleCurrentPage(page)}
              key={index}
              className={` border border-[#ff00ff] text-md rounded-sm hover:bg-[#a100ff] hover:text-white  py-2 px-5  ${
                page === currentPage ? "bg-green-500 text-white" : ""
              }  `}>
              {page}
            </button>
          ))}
        </div>
      </div> */}
      {/* pagination */}
      <div className="w-full p-4 flex flex-row items-center justify-center">
        <PaginationNumbers
          numbersOfPages={numbersOfPages}
          currentPage={currentPage}
          handleCurrentPage={handleCurrentPage}
        />
      </div>
    </div>
  );
};

export default Streams;

// streams here

import { usePagination } from "../../../hooks/usePagination";
import useFetchStreams from "../../../hooks/useFetch";
import StreamsGrid from "../../../Components/streams/StreamsGrid";
import PaginationNumbers from "../../../Components/pagination/PaginationNumbers";
import Sidebar from "../../../Components/sidebar/Sidebar";
// import { Toaster } from "sonner";
import StreamsPageSkeletonLoading from "../../../Components/streams/StreamsPageSkeletonLoading";

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

  // console.log({
  //   currentPage,
  //   numbersOfPages,
  //   inputRange,
  //   setInputRange,
  //   handleCurrentPage,
  //   handleGotoPage,
  //   handleNextPage,
  //   handlePrevPage,
  //   channelsPerPage,
  //   channelsInput,
  //   setChannelsInput,
  //   handleChannelsPerPage,
  //   totalItems,
  //   // setTotalItems,
  // });

  // console.log(streams);

  // const startPage = Math.max(1, currentPage - 4);
  // const pagesArray = Array.from({ length: 10 }, (_, i) => startPage + i);

  //
  if (loading) return <StreamsPageSkeletonLoading />;
  if (error) return <p>Error: {error}</p>;

  // console.log(import.meta.env.NODE_ENV);

  // console.log(pagesArray);
  return (
    <div className="min-h-screen w-full p-4">
      {/* toast */}
      {/* <Toaster richColors position="top-right" className="z-30" /> */}
      {/* <ClockPage /> */}
      <h1 className="text-lg font-normal">Iptv player {">"} Streaming</h1>
      <div className="  flex flex-row gap-3 p-3 w-full">
        {/* basic information and action */}
      </div>
      {/* main content */}
      <div className="w-full h-full flex flex-col lg:grid lg:grid-cols-5 ">
        {/* streams grid */}
        <StreamsGrid
          streams={streams}
          currentPage={currentPage}
          channelsPerPage={channelsPerPage}
        />
        {/* sidebar */}
        <Sidebar
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
        />
      </div>
      <div className=" flex flex-row gap-3 p-3 w-full">
        <div>{/* <p className="text-lg font-black">{currentPage}</p> */}</div>
      </div>
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

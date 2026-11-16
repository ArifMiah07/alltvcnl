// streams here

import { usePagination } from "../../../hooks/usePagination";
import useFetchStreams from "../../../hooks/useFetch";
import StreamsGrid from "../../../Components/streams/StreamsGrid";
import PaginationNumbers from "../../../Components/pagination/PaginationNumbers";
import Sidebar from "../../../Components/sidebar/Sidebar";
// import { Toaster } from "sonner";
import StreamsPageSkeletonLoading from "../../../Components/streams/StreamsPageSkeletonLoading";
import { Helmet } from "react-helmet-async";
import BackButton from "../../../Components/buttons/BackButton";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import BasicFilters from "../../../Components/sidebar/BasicFilters";

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

  const [currentPageTabContentsToggle, setCurrentPageTabContentsToggle] =
    useState(true);
  const [controlPageTabContentsToggle, setControlPageTabContentsToggle] =
    useState(false);
  const [filterPageTabContentsToggle, setFilterPageTabContentsToggle] =
    useState(false);
  // const [TabContentsToggle, setTabContentsToggle] = useState(true);

  // use hooks
  const { streams, loading, error } = useFetchStreams();

  console.log(streams);
  const {
    currentPage,
    numbersOfPages,
    inputRange,
    setInputRange,
    handleGotoPage,
    handleNextPage,
    handlePrevPage,
    channelsPerPage,
    channelsInput,
    setChannelsInput,
    handleChannelsPerPage,
    totalItems,
    handleCurrentPage,
    // showMoreChannelsInGridView,
    // setShowMoreChannelsInGridView,
    // handleToggleMoreChannelsLayout,
    // setTotalItems,
    toggleBasicFiltersExpand,
    expandBasicFilters,
  } = usePagination();

  // handles
  const handleCurrentPageTabContentsToggle = () => {
    setCurrentPageTabContentsToggle(!currentPageTabContentsToggle);
    setControlPageTabContentsToggle(false);
    setFilterPageTabContentsToggle(false);
    console.log(currentPageTabContentsToggle);
  };
  const handleControlPageTabContentsToggle = () => {
    setControlPageTabContentsToggle(!controlPageTabContentsToggle);
    setCurrentPageTabContentsToggle(false);
    setFilterPageTabContentsToggle(false);
    // console.log(controlPageTabContentsToggle);
  };
  const handleFilterPageTabContentsToggle = () => {
    setFilterPageTabContentsToggle(!filterPageTabContentsToggle);
    setControlPageTabContentsToggle(false);
    setCurrentPageTabContentsToggle(false);
    console.log(filterPageTabContentsToggle);
  };

  //
  if (loading) return <StreamsPageSkeletonLoading />;
  if (error) return <p className="dark:text-white">Error: {error}</p>;

  // SEO metadata
  const pageTitle = `Watch Live IPTV Streams - Page ${currentPage} | All TV`;
  const pageDescription = `Browse ${totalItems}+ live IPTV channels and streams. Watch free TV channels online in HD quality. Page ${currentPage} of ${numbersOfPages}.`;
  const canonicalUrl = `https://alltvcnl.netlify.app/streams?page=${currentPage}`;

  // console.log(import.meta.env.NODE_ENV);

  // console.log(pagesArray);
  return (
    <div className=" min-h-screen w-full p-1 md:p-4 ">
      {/* SEO Head */}
      <Helmet>
        {/* Page-specific SEO */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Pagination SEO */}
        {currentPage > 1 && (
          <link
            rel="prev"
            href={`https://alltvcnl.netlify.app/streams${currentPage > 2 ? `?page=${currentPage - 1}` : ""}`}
          />
        )}
        {currentPage < numbersOfPages && (
          <link
            rel="next"
            href={`https://alltvcnl.netlify.app/streams?page=${currentPage + 1}`}
          />
        )}

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: streams
              .slice(
                (currentPage - 1) * channelsPerPage,
                currentPage * channelsPerPage,
              )
              .map((stream, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: stream.title,
                url: `https://alltvcnl.netlify.app/streams/${stream.id || index}`,
              })),
          })}
        </script>
      </Helmet>
      {/* toast */}
      {/* <Toaster richColors position="top-right" className="z-30" /> */}
      {/* <ClockPage /> */}
      <div className="flex flex-row flex-wrap lg:flex-col items-start gap-1 md:gap-2 my-0 md:my-6">
        <BackButton label=" " styles=" " />
        <h1 className="shadow-md bg-white/30 hover:bg-purple-600 hover:text-white backdrop-blur-md isolate px-2 py-1 md:px-5 md:py-2 border text-md md:text-lg font-normal dark:text-white">
          Iptv player {">"} Streaming
        </h1>
      </div>
      {/* tabs */}
      <div className=" flex flex-row flex-wrap lg:flex-col items-start gap-1 md:gap-2 my-1 md:my-1 lg:hidden">
        <button
          onClick={handleCurrentPageTabContentsToggle}
          className={`cursor-pointer shadow-md bg-white/30 hover:bg-purple-600 hover:text-white backdrop-blur-md isolate px-2 py-1 md:px-5 md:py-2 border text-md md:text-lg font-normal dark:text-white ${currentPageTabContentsToggle && "border-blue-500"}`}>
          Current Page
        </button>
        <button
          onClick={handleControlPageTabContentsToggle}
          className={`cursor-pointer shadow-md bg-white/30 hover:bg-purple-600 hover:text-white backdrop-blur-md isolate px-2 py-1 md:px-5 md:py-2 border text-md md:text-lg font-normal dark:text-white ${controlPageTabContentsToggle && "border-blue-500"}`}>
          Controls
        </button>
        <button
          onClick={handleFilterPageTabContentsToggle}
          className={`cursor-pointer shadow-md bg-white/30 hover:bg-purple-600 hover:text-white backdrop-blur-md isolate px-2 py-1 md:px-5 md:py-2 border text-md md:text-lg font-normal dark:text-white ${filterPageTabContentsToggle && "border-blue-500"}`}>
          Filters
        </button>
        <button
          onClick={handleNextPage}
          className="cursor-pointer shadow-md bg-white/30 hover:bg-purple-600 hover:text-white backdrop-blur-md isolate px-2 py-1 md:px-5 md:py-2 border text-md md:text-lg font-normal dark:text-white">
          Next
        </button>
        <button
          onClick={handlePrevPage}
          className="cursor-pointer shadow-md bg-white/30 hover:bg-purple-600 hover:text-white backdrop-blur-md isolate px-2 py-1 md:px-5 md:py-2 border text-md md:text-lg font-normal dark:text-white">
          Previous
        </button>
        {/* <BackButton label=" " styles=" " /> */}
      </div>
      {/* basic information and action */}
      {/* <div className="  flex flex-row gap-3 p-3 w-full">
      </div> */}
      {/* main content for small devices*/}
      {/* contents */}
      <div className="lg:hidden">
        {currentPageTabContentsToggle && (
          <div>
            <StreamsGrid
              streams={streams}
              currentPage={currentPage}
              channelsPerPage={channelsPerPage}
            />
          </div>
        )}
      </div>
      {/* controls */}
      <div className="lg:hidden">
        {controlPageTabContentsToggle && (
          <div>
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
              // showMoreChannelsInGridView={showMoreChannelsInGridView}
              // setShowMoreChannelsInGridView={setShowMoreChannelsInGridView}
              // handleToggleMoreChannelsLayout={handleToggleMoreChannelsLayout}
              // handleCurrentPage={handleCurrentPage}
            />
          </div>
        )}
      </div>
      {/* filters */}
      <div className="lg:hidden">
        {filterPageTabContentsToggle && (
          <div className="w-full border-b-2 border-red-50 ">
            <div className=" w-full h-full flex flex-row items-center justify-start gap-2 mb-4 border-2 border-red-50 shadow-md hover:text-white bg-white/30 hover:bg-purple-600 backdrop-blur-md isolate px-5 py-2">
              <h3 className=" flex flex-row items-center justify-center gap-1 text-lg font-bold dark:text-white ">
                Basic Filters{" "}
                <span onClick={toggleBasicFiltersExpand} className="">
                  {expandBasicFilters ? <ChevronUp /> : <ChevronDown />}
                </span>
              </h3>
            </div>
            <div
              className={`mb-4 dark:text-white px-2 ${expandBasicFilters ? "hidden" : "visible"}`}>
              <BasicFilters />
            </div>
          </div>
        )}
      </div>
      {/* main content for large devices*/}
      <div className="w-full h-full flex-col lg:grid lg:grid-cols-12 hidden ">
        {/* streams grid */}
        <div className="col-span-9">
          <StreamsGrid
            streams={streams}
            currentPage={currentPage}
            channelsPerPage={channelsPerPage}
          />
        </div>
        {/* sidebar */}
        <div className="col-span-3 sticky top-12 h-fit">
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
            // showMoreChannelsInGridView={showMoreChannelsInGridView}
            // setShowMoreChannelsInGridView={setShowMoreChannelsInGridView}
            // handleToggleMoreChannelsLayout={handleToggleMoreChannelsLayout}
            // handleCurrentPage={handleCurrentPage}
          />
        </div>
      </div>
      {/* <div className=" flex flex-row gap-3 p-3 w-full">
        <div>{/* <p className="text-lg font-black">{currentPage}</p> }</div>
      </div> */}
      {/* pagination */}
      <div className="w-full p-4 flex flex-row items-center justify-center mb-12">
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

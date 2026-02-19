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
  } = usePagination();

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
    <div className="min-h-screen w-full p-4 dark:bg-black">
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
      <div className="flex flex-col items-start gap-2 my-6">
        <h1 className="text-lg font-normal dark:text-white">
          Iptv player {">"} Streaming
        </h1>
        <BackButton label=" " styles=" " />
      </div>
      <div className="  flex flex-row gap-3 p-3 w-full">
        {/* basic information and action */}
      </div>
      {/* main content */}
      <div className="w-full h-full flex flex-col lg:grid lg:grid-cols-12  ">
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

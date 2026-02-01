import axios from "axios";
import { useEffect, useState } from "react";
import HlsVideoPlayer from "../../../Components/hls-video-player/HlsVideoPlayer";
import {
  MdBookmark,
  MdBookmarkBorder,
  MdOutlinePlaylistAdd,
} from "react-icons/md";
import { LuMonitorPlay } from "react-icons/lu";
import { HiViewfinderCircle } from "react-icons/hi2";
import { chinaIPTVSources } from "../../../utils/chinaIptvSourceData";
import { Helmet } from "react-helmet-async";
import { BASE_API_PATH } from "../../../configs/api-url.config";

const StreamChinaIptv = () => {
  const [searchData, setSearchData] = useState([]);
  //   const [currentIndexSet, setCurrentIndexSet] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [channelsPerPage, setChannelsPerPage] = useState(10);

  const [bookmarkedChannel, setBookmarkedChannel] = useState({});

  const [term, setTerm] = useState("Global");

  // SEO metadata
  const currentSource = chinaIPTVSources.find((s) => s.base === term);
  const pageTitle = `Watch ${currentSource?.name || "Chinese"} IPTV Channels Live - Page ${currentPageNumber} | All TV`;
  const pageDescription = `Stream live Chinese IPTV channels from ${currentSource?.name || "China"}. Watch ${totalItems}+ Chinese TV channels online in HD quality. Page ${currentPageNumber} of ${totalPages}.`;
  const canonicalUrl = `https://alltvcnl.netlify.app/china-iptv${currentPageNumber > 1 ? `?page=${currentPageNumber}` : ""}${term !== "Global" ? `&source=${term}` : ""}`;
  const keywords =
    "chinese iptv, china tv live, mandarin tv channels, chinese television, cctv live, chinese streaming, 中国电视";

  // fetch search result
  useEffect(() => {
    if (!term) return;

    const fetchSearchResult = async () => {
      setLoading(true);
      try {
        const url = `${BASE_API_PATH}/api/iptv-player/stream/china-iptv`;
        const response = await axios.get(url, {
          params: {
            term,
            currentPage: currentPageNumber,
            channelsPerPage,
          },
        });

        setSearchData(response?.data?.data || []);
        setTotalPages(response?.data?.totalPages || 0);
        setTotalItems(response?.data?.totalItems || 0);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResult();
  }, [term, currentPageNumber, channelsPerPage]);

  const handleCurrentPage = (page) => {
    // console.log(" page: ", Number(page), Math.ceil(totalChannels / 10));
    if (Number(page) > 0 && Number(page) <= totalPages) {
      setCurrentPageNumber(page);
    }
  };

  // handle bookmark channels
  const handleBookmarkChannelToggle = (channelUrl) => {
    setBookmarkedChannel((prev) => ({
      ...prev,
      [channelUrl]: !prev[channelUrl],
    }));
    // const handleBookmarkToggle = (channelUrl) => {
    // };
  };

  const handleChianIptvSource = (source) => {
    setTerm(source);
    setCurrentPageNumber(1);
  };
  // console.log(term);

  // export default chinaIPTVSources;
  // console.log(chinaIPTVSources);

  // ____UPDATED CODE FROM CHATGPT____ //
  /** ______START HERE______ */
  const maxPagesToShow = 10;
  const half = Math.floor(maxPagesToShow / 2);

  // Determine start page
  let startPage = Math.max(1, currentPageNumber - half);

  // Determine end page
  let endPage = startPage + maxPagesToShow - 1;

  // Make sure endPage doesn't exceed numbersOfPages
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  // Generate pages array
  const pagesArray = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );
  //   console.log(pagesArray);
  // ____UPDATED CODE FROM CHATGPT____ //
  /** ______ENDs HERE______ */

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="w-full p-12 flex flex-col">
      {/* SEO Meta Tags */}
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta
          property="og:image"
          content="https://alltvcnl.netlify.app/og-china-iptv.png"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta
          name="twitter:image"
          content="https://alltvcnl.netlify.app/og-china-iptv.png"
        />

        {/* Pagination SEO */}
        {currentPageNumber > 1 && (
          <link
            rel="prev"
            href={`https://alltvcnl.netlify.app/china-iptv${currentPageNumber > 2 ? `?page=${currentPageNumber - 1}` : ""}${term !== "Global" ? `&source=${term}` : ""}`}
          />
        )}
        {currentPageNumber < totalPages && (
          <link
            rel="next"
            href={`https://alltvcnl.netlify.app/china-iptv?page=${currentPageNumber + 1}${term !== "Global" ? `&source=${term}` : ""}`}
          />
        )}

        {/* Structured Data - BroadcastService */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BroadcastService",
            name: "Chinese IPTV Channels",
            description: pageDescription,
            provider: {
              "@type": "Organization",
              name: "All TV IPTV Player",
              url: "https://alltvcnl.netlify.app",
            },
            broadcastDisplayName: currentSource?.name || "Chinese TV Channels",
            broadcastTimezone: "Asia/Shanghai",
            potentialAction: {
              "@type": "WatchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: canonicalUrl,
                actionPlatform: [
                  "http://schema.org/DesktopWebPlatform",
                  "http://schema.org/MobileWebPlatform",
                ],
              },
            },
            areaServed: {
              "@type": "Place",
              name: "Worldwide",
            },
          })}
        </script>

        {/* ItemList Schema for channels */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `${currentSource?.name || "Chinese"} IPTV Channels - Page ${currentPageNumber}`,
            numberOfItems: totalItems,
            itemListElement: searchData.slice(0, 10).map((channel, index) => ({
              "@type": "ListItem",
              position: (currentPageNumber - 1) * channelsPerPage + index + 1,
              name: channel.name,
              url: channel.url,
            })),
          })}
        </script>

        {/* Breadcrumb */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://alltvcnl.netlify.app",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Chinese IPTV Channels",
                item: "https://alltvcnl.netlify.app/china-iptv",
              },
              ...(term !== "Global"
                ? [
                    {
                      "@type": "ListItem",
                      position: 3,
                      name: currentSource?.name,
                      item: canonicalUrl,
                    },
                  ]
                : []),
            ],
          })}
        </script>
      </Helmet>
      <div className="p-4 w-full ">
        {/* SEO-friendly header */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold mb-2">
            Watch {currentSource?.name || "Chinese"} IPTV Channels Live
          </h1>
          <p className="text-black">
            Stream {totalItems}+ Chinese television channels online. Browse
            CCTV, provincial channels, and more.
          </p>
        </header>
        <h3 className="text-md mb-2">Total channels : {totalItems}</h3>
        <div className=" w-full flex flex-col lg:flex-row gap-4">
          <div className=" border w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-start gap-2">
            {!(searchData?.length === 0) ? (
              searchData?.map((item, index) => (
                <div key={index} className=" border p-0">
                  <div className="flex flex-col  p-1 gap-1">
                    <p className="flex flex-row gap-2">
                      {" "}
                      {(currentPageNumber - 1) * channelsPerPage + (index + 1)}.
                      {/* {index + 1}.{" "} */}
                      <a href={item.url} target="_blank">
                        {item.name}
                      </a>
                      {/* <span>({currentIndexSet[index]})</span> */}
                      {item["tvg-logo"] && (
                        <div className=" flex flex-col items-center justify-center w-[24px] h-[24px] ">
                          <img
                            className="w-[24px]"
                            src={item["tvg-logo"]}
                            alt="logo"
                          />
                        </div>
                      )}
                    </p>
                    {/* icons */}
                    <div className="flex gap-3 ">
                      {/* stream a specific channel */}
                      <span
                        // onClick={() =>
                        //   handleStreamSpecificChannel({ ...item, index })
                        // }
                        className=" p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300 ">
                        <HiViewfinderCircle />
                      </span>
                      <span className=" p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300 ">
                        <LuMonitorPlay />
                      </span>
                      <span
                        onClick={() => handleBookmarkChannelToggle(item.url)}>
                        {bookmarkedChannel[item.url] ? (
                          <span
                            className={` p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300  ${bookmarkedChannel ? "" : ""} `}>
                            <MdBookmark />
                          </span>
                        ) : (
                          <span className=" p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300 ">
                            <MdBookmarkBorder />
                          </span>
                        )}
                      </span>

                      <span className=" p-1 flex flex-row items-center justify-center w-[24px] h-[24px] bg-purple-300 ">
                        <MdOutlinePlaylistAdd />
                      </span>
                    </div>
                  </div>
                  {/* player */}
                  <div className="">
                    <div className="App">
                      <HlsVideoPlayer
                        src={item?.url}
                        controls
                        autoPlay={false}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-lg bg-green ">
                {" "}
                <p>No data found</p>{" "}
              </div>
            )}
          </div>
          <div className="  lg:w-[30%] flex flex-col lg:flex-col flex-wrap border">
            {chinaIPTVSources.map((el, i) => (
              <div
                className={`${term === el.base ? "bg-green-500" : ""}`}
                key={el.key}>
                <button
                  onClick={() => handleChianIptvSource(el.base)}
                  className=" w-full  p-1 border ">
                  <span
                    className={`${term === el.base ? "text-white" : "text-black"}`}>
                    {i + 1}. {el.name}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* pagination */}
      <div className="flex gap-2 flex-wrap my-3">
        {pagesArray
          ? pagesArray?.map((page, index) => (
              <div className="w-fit h-fit" key={index}>
                <div>
                  <button
                    onClick={() => handleCurrentPage(page)}
                    className={` border border-[#ff00ff] text-md rounded-sm hover:bg-[#a100ff] hover:text-white  py-2 px-5  ${
                      page === currentPageNumber
                        ? "bg-green-500 text-white"
                        : ""
                    }  `}>
                    {page}
                  </button>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default StreamChinaIptv;

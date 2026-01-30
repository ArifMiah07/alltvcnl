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

const StreamChinaIptv = () => {
  const [searchData, setSearchData] = useState([]);
  //   const [currentIndexSet, setCurrentIndexSet] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [channelsPerPage, setChannelsPerPage] = useState(10);

  const [bookmarkedChannel, setBookmarkedChannel] = useState({});

  const [term, setTerm] = useState("");

  // fetch search result
  useEffect(() => {
    // if (!searchValue) return;

    const fetchSearchResult = async () => {
      setLoading(true);
      try {
        const url = `http://localhost:5000/api/iptv-player/stream/china-iptv?term=${encodeURIComponent(term)}&currentPage=1&channelsPerPage=10`;
        const response = await axios.get(url);
        setSearchData(response?.data?.data || []);
        // setCurrentIndexSet(response?.data?.currentIndexSet || []);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResult();
  }, [term]);

  const totalChannels = searchData?.length;
  const numbersOfPages = Math.ceil(totalChannels / channelsPerPage);
  const startIndex = (currentPageNumber - 1) * channelsPerPage;
  const endIndex = currentPageNumber * channelsPerPage;

  console.log(numbersOfPages);

  const handleCurrentPage = (page) => {
    // console.log(" page: ", Number(page), Math.ceil(totalChannels / 10));
    if (Number(page) > 0 && Number(page) <= numbersOfPages) {
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
    console.log(source);
    setTerm(source);
  };
  console.log(term);

  const chinaIPTVSources = [
    // ===== Global / Overseas =====
    { key: "global", region: "global", name: "Global", base: "Global" },
    { key: "usa", region: "global", name: "USA", base: "USA" },
    { key: "uk", region: "global", name: "UK", base: "UK" },
    { key: "russia", region: "global", name: "Russia", base: "Russia" },
    { key: "japan", region: "global", name: "Japan", base: "Japan" },
    {
      key: "singapore",
      region: "global",
      name: "Singapore",
      base: "Singapore",
    },
    {
      key: "north-korea",
      region: "global",
      name: "North Korea",
      base: "NorthKorea",
    },
    {
      key: "south-korea",
      region: "global",
      name: "South Korea",
      base: "southKorea",
    },
    {
      key: "other",
      region: "global",
      name: "Other Countries",
      base: "otherCountry",
    },

    // ===== China Regions =====
    {
      key: "hongkong",
      region: "china-region",
      name: "Hong Kong",
      base: "HongKong",
    },
    { key: "macao", region: "china-region", name: "Macao", base: "Macao" },
    { key: "taiwan", region: "china-region", name: "Taiwan", base: "TaiWan" },

    // ===== China National =====
    {
      key: "cctv-all",
      region: "china-national",
      name: "CCTV All",
      base: "cnTV1_ALL",
    },
    {
      key: "cctv-guoji",
      region: "china-national",
      name: "CCTV International",
      base: "cnTV1_GuoJi",
    },
    {
      key: "cctv-guonei",
      region: "china-national",
      name: "CCTV Domestic",
      base: "cnTV2_GuoNei",
    },
    {
      key: "cctv-auto",
      region: "china-national",
      name: "CCTV Auto Update",
      base: "cnTV_AutoUpdate",
    },

    // ===== Provincial / Local =====
    {
      key: "hunan-1",
      region: "province",
      name: "Hunan TV 1",
      base: "HunanTV1",
    },
    {
      key: "hunan-2",
      region: "province",
      name: "Hunan TV 2",
      base: "HunanTV2",
    },
    {
      key: "hunan-3",
      region: "province",
      name: "Hunan TV 3",
      base: "HunanTV3_notOK",
      status: "notOK",
    },
    {
      key: "hunan-auto",
      region: "province",
      name: "Hunan TV Auto Update",
      base: "HunanTV_AutoUpdate",
    },
  ];

  // export default chinaIPTVSources;
  console.log(chinaIPTVSources);

  // ____UPDATED CODE FROM CHATGPT____ //
  /** ______START HERE______ */
  const maxPagesToShow = 10;
  const half = Math.floor(maxPagesToShow / 2);

  // Determine start page
  let startPage = Math.max(1, currentPageNumber - half);

  // Determine end page
  let endPage = startPage + maxPagesToShow - 1;

  // Make sure endPage doesn't exceed numbersOfPages
  if (endPage > numbersOfPages) {
    endPage = numbersOfPages;
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

  /**
   * {
      "duration": "-1",
      "group-title": "international",
      "name": "ION Plus",
      "url": "https://jmp2.uk/SamsungTVPlus/USBD300003LK.m3u8"
    },
    {
      "duration": "-1",
      "tvg-id": "S1.ru",
      "tvg-logo": "https://i.imgur.com/chNBF5t.png",
      "group-title": "",
      "name": "S1",
      "url": "https://sitv.ru/hls/stv.m3u8"
    },
   */

  return (
    <div className="w-full p-12 flex flex-col">
      <div className="p-4 w-full ">
        <h2 className="text-md mb-2">
          Total channels : {searchData?.length || 0}
        </h2>
        <div className=" w-full flex flex-col lg:flex-row gap-4">
          <div className=" border w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-start gap-2">
            {!(searchData?.length === 0) ? (
              searchData?.slice(startIndex, endIndex).map((item, index) => (
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
                      {/* {(item.feed || item.quality) && (
                    <div className="flex flex-row gap-3 ">
                      {item.feed && <p>{item.feed}</p>}
                      {item.quality && <p>{item.quality}</p>}
                    </div>
                  )} */}
                    </div>
                  </div>
                  {/* player */}
                  <div className="">
                    <div className="App">
                      {/* <h1>HLS.js in React</h1> */}
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

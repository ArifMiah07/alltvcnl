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

  // fetch search result
  useEffect(() => {
    if (!term) return;

    const fetchSearchResult = async () => {
      setLoading(true);
      try {
        const url = `http://localhost:5000/api/iptv-player/stream/china-iptv`;
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
  console.log(term);

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
      <div className="p-4 w-full ">
        <h2 className="text-md mb-2">Total channels : {totalItems}</h2>
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

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

  // fetch search result
  useEffect(() => {
    // if (!searchValue) return;

    const fetchSearchResult = async () => {
      setLoading(true);
      try {
        const url = `http://localhost:5000/api/iptv-player/stream/china-iptv?currentPage=4&channelsPerPage=45`;
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
  }, []);

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
   */

  return (
    <div className="p-12">
      <h2 className="text-md mb-2">
        Total channels : {searchData?.length || 0}
      </h2>
      <div className="  lg:w-[70%] h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-start gap-2">
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
                  <span onClick={() => handleBookmarkChannelToggle(item.url)}>
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
                  <HlsVideoPlayer src={item?.url} controls autoPlay={false} />
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

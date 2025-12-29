// stream here

// import axios from "axios";
import { useState } from "react";
import { usePagination } from "../../../hooks/usePagination";
import ReactPlayer from "react-player";
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";
import { HiViewfinderCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";
import useFetchStreams from "../../../hooks/useFetch";

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
  const [specificChannelStream, setSpecificChannelStream] = useState({});
  const [bookmarks, setBookmark] = useState({});
  // const [specificChannelParams, setSpecificChannelParams] = useState({});

  console.log("", specificChannelStream);

  //
  const {
    currentPage,
    setCurrentPage,
    // itemsPerPage,
    channelsPerPage,
    // setItemsPerPage,
    // totalItems,
    // setTotalItems,
    // totalPage,
    // setTotalPage,
    // currentPageInputRange,
    // setCurrentPageInputRange,
    // setChannelsPerPage,
    // channelsInput,
    // setChannelsInput,
  } = usePagination();

  const { streams, loading, error } = useFetchStreams();

  // // effects
  // useEffect(() => {
  //   const fetchStreams = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5000/api/iptv-player/streams`,
  //         {
  //           params: { currentPage, itemsPerPage },
  //         }
  //       );
  //       setStreams(response?.data?.data);
  //       setError(null);
  //     } catch (error) {
  //       console.log(error);
  //       setError(error.message);
  //     } finally {
  //       //
  //       setLoading(false);
  //     }
  //   };

  //   fetchStreams();
  // }, [currentPage, itemsPerPage]);

  console.log(streams);

  const handleCurrentPage = (page) => {
    setCurrentPage(Number(page));
  };

  // handler functions
  // handle a specific channels stream
  const handleSpecificChannelStream = (channelInfo) => {
    setSpecificChannelStream(channelInfo);
    // setSpecificChannelParams(channelInfo);
  };
  // console.log(specificChannelParams);
  // handle bookmark toggle
  const handleBookmarkToggle = (streamUrl) => {
    setBookmark((prev) => ({
      ...prev,
      [streamUrl]: !prev[streamUrl],
    }));
  };
  //
  const startPage = Math.max(1, currentPage - 4);
  const pagesArray = Array.from({ length: 10 }, (_, i) => startPage + i);

  //
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log(pagesArray);
  return (
    <div className="min-h-screen w-full p-4">
      <h1>this is </h1>
      <p>total pages {streams?.length}</p>
      <div>Streams Page</div>
      <div></div>
      <div className=" w-full h-full col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 items-center justify-items-center gap-4 p-4  ">
        {streams ? (
          streams?.map((stream_item, stream_index) => (
            <div
              className=" w-full h-full flex flex-col items-center justify-center border border-rose-50 bg-radial-[at_50%_75%] from-sky-100 via-violet-100 to-fuchsia-100 to-90%"
              key={stream_index}>
              <div className="w-full flex flex-col flex-wrap">
                {/* channel info */}
                <div className="flex gap-2 px-2">
                  {/* channel number */}
                  <span className="font-medium">
                    {(currentPage - 1) * channelsPerPage + (stream_index + 1)}.
                  </span>
                  {/* channel name or title */}
                  <p>
                    {stream_item?.channel
                      ? stream_item.channel
                      : stream_item.title}
                  </p>
                </div>
                {/* basic actions */}
                <div className="w-full flex flex-row gap-2 flex-wrap items-center p-2  ">
                  {/* stream a specific channel */}
                  <span
                    onClick={() => handleSpecificChannelStream({ stream_item })}
                    className=" flex flex-col items-center justify-center rounded-sm bg-purple-200 hover:bg-purple-300 w-6 h-6 ">
                    <Link
                      to={`/specific-channel/${
                        (currentPage - 1) * channelsPerPage + (stream_index + 1)
                      }/${encodeURIComponent(
                        stream_item.channel || stream_item.title
                      )}`}
                      state={{ streamData: stream_item }}>
                      {/* /${
                    stream_item.channel
                      ? stream_item.channel
                      : stream_item.title
                  } */}
                      <HiViewfinderCircle className="" />
                    </Link>
                  </span>
                  {/* bookmark a specific channel */}
                  {/* save or locally or save to a playlist <localStorage || default, playlist name> */}
                  <span
                    onClick={() => handleBookmarkToggle(stream_item.url)}
                    className=" flex flex-col items-center justify-center rounded-sm bg-purple-200 hover:bg-purple-300 w-6 h-6 ">
                    {bookmarks[stream_item.url] ? (
                      <MdOutlineStar />
                    ) : (
                      <MdOutlineStarBorder />
                    )}
                  </span>
                  <span>{""}</span>
                </div>
              </div>
              <div className="w-full h-full flex flex-col border border-green-50  ">
                <ReactPlayer
                  // pip={true}
                  controls={true}
                  src={stream_item.url}
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          ))
        ) : (
          <p>No streams to play</p>
        )}
      </div>
      {/* pagination */}
      <div className="w-full my-6 ">
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
      </div>
    </div>
  );
};

export default Streams;

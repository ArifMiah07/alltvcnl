import PropTypes from "prop-types";
// import { useLocalStorage } from "../../../hooks/useLocalStorage";

import {
  Bookmark,
  BookmarkCheck,
  Fullscreen,
  MonitorPlay,
  ListPlus,
} from "lucide-react";

import { Link } from "react-router-dom";

export const ListView = ({
  paginatedStreams,
  pagesArray,
  handleCurrentPage,
  currentPageNumber,
  numbersOfPages,
  channelsPerPage,
  handleSpecificChannelStream,
  handleBookmarkChannelToggle,
  bookmarkedChannel,
}) => {
  return (
    <div className="">
      {/* <p>Grid tab</p> */}
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
        {/* contents */}
        <div className="w-full h-full lg:col-span-9 ">
          <div className=" border w-full h-full  p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start justify-evenly ">
            <div className=" w-full h-full col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 items-center justify-items-center gap-4 p-4  ">
              {paginatedStreams ? (
                paginatedStreams?.map(([url, stream], index) => (
                  // player container
                  <div
                    className=" w-full h-full flex flex-col items-center justify-center border border-rose-50 bg-radial-[at_50%_75%] from-sky-100 via-violet-100 to-fuchsia-100 to-90%"
                    key={url}>
                    {/* user actions */}
                    <div className="w-full flex flex-col flex-wrap">
                      {/* channel info */}
                      <div className="flex gap-2 px-2 text-[18px]">
                        {/* channel number */}
                        <span className="font-medium dark:text-white">
                          {(currentPageNumber - 1) * channelsPerPage +
                            (index + 1)}
                          .
                        </span>
                        {/* channel name or title */}
                        <p className="dark:text-white">
                          {stream?.channel ? stream.channel : stream.title}
                        </p>
                      </div>
                      {/* basic actions */}
                      <div className="w-full flex flex-row gap-2 flex-wrap items-center p-2  ">
                        {/* stream a specific channel */}
                        <span
                          onClick={() =>
                            handleSpecificChannelStream({ stream })
                          }
                          className=" flex flex-col items-center justify-center rounded-sm bg-purple-200 hover:bg-purple-300  w-6 h-6 ">
                          <Link
                            to={`/specific-channel/${
                              (currentPageNumber - 1) * channelsPerPage +
                              (index + 1)
                            }/${encodeURIComponent(
                              stream.channel || stream.title,
                            )}`}
                            state={{ streamData: stream }}>
                            <Fullscreen className="" />
                          </Link>
                        </span>
                        {/* stream a specific channel on browser in a separate tab */}
                        <span className=" flex flex-col items-center justify-center rounded-sm bg-purple-200 hover:bg-purple-300  w-6 h-6 ">
                          <a
                            href={`${stream.url}`}
                            target="_blank"
                            rel="noopener noreferrer">
                            <MonitorPlay />
                          </a>
                        </span>
                        {/* bookmark a specific channel */}
                        {/* save or locally or save to a playlist <localStorage || default, playlist name> */}
                        <span
                          onClick={() => handleBookmarkChannelToggle(stream)}
                          className=" flex flex-col items-center justify-center rounded-sm bg-purple-200 hover:bg-purple-300  w-6 h-6 ">
                          {bookmarkedChannel[stream.url] ? (
                            <BookmarkCheck />
                          ) : (
                            <Bookmark />
                          )}
                        </span>
                        <span className=" flex flex-col items-center justify-center rounded-sm bg-purple-200 hover:bg-purple-300  w-6 h-6 ">
                          <ListPlus />
                        </span>
                        {(stream.feed || stream.quality) && (
                          <div className="flex flex-row gap-3 dark:text-white ">
                            {stream.feed && <p>{stream.feed}</p>}
                            {stream.quality && <p>{stream.quality}</p>}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* <div className="w-full h-full flex flex-col border border-green-50  ">
                      <HlsVideoPlayer
                        src={stream?.url}
                        controls
                        autoPlay={false}
                      />
                    </div> */}
                  </div>
                ))
              ) : (
                <p className="dark:text-white">No streams to play</p>
              )}
            </div>
          </div>
        </div>
        {/* pagination */}
        <div className=" w-fit h-fit p-1  flex flex-col gap-2 flex-wrap my-3">
          {pagesArray
            ? pagesArray?.map((page, index) => (
                <div className="w-fit h-fit" key={index}>
                  <div>
                    <button
                      onClick={() => handleCurrentPage(page)}
                      className={` border border-[#ff00ff] text-md rounded-sm hover:bg-[#a100ff] dark:text-white hover:text-white  py-2 px-5  ${
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
          {numbersOfPages >= 10 && (
            <div className="">
              <button
                className={` border border-[#ff00ff] text-md rounded-sm bg-green-900 hover:bg-[#a100ff] dark:text-white hover:text-white  py-2 px-8 `}>
                {numbersOfPages}
                {/* ...{numbersOfPages} */}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ListView.propTypes = {
  paginatedStreams: PropTypes.array,
  pagesArray: PropTypes.array,
  handleCurrentPage: PropTypes.func,
  currentPageNumber: PropTypes.number || PropTypes.string,
  numbersOfPages: PropTypes.number || PropTypes.string,
  channelsPerPage: PropTypes.number || PropTypes.string,
  handleSpecificChannelStream: PropTypes.func,
  handleBookmarkChannelToggle: PropTypes.func,
  bookmarkedChannel: PropTypes.object,
};

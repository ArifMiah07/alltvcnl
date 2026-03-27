import PropTypes from "prop-types";
// import { useLocalStorage } from "../../../hooks/useLocalStorage";

import { Bookmark, BookmarkCheck, Fullscreen, MonitorPlay } from "lucide-react";

import { Link } from "react-router-dom";

export const TableView = ({
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
    <div className=" w-full h-full ">
      {/* <p>Grid tab</p> */}
      <div className=" w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
        {/* contents */}
        <div className="w-full lg:col-span-9 ">
          <table className=" w-full border-collapse">
            <thead className="">
              <tr className=" text-black dark:text-white text-left border border-rose-50">
                <th>Index</th>
                <th>Channel</th>
                <th>Quality</th>
                <th>Feed</th>
                <th>Saved</th>
                <th>Open IA</th>
                <th>Open OA</th>
              </tr>
            </thead>

            <tbody>
              {paginatedStreams && paginatedStreams.length > 0 ? (
                paginatedStreams.map(([url, stream], index) => (
                  <tr
                    key={url}
                    className="border border-rose-50 bg-radial-[at_50%_75%] from-sky-100 via-violet-100 to-fuchsia-100 to-90%">
                    <td className="px-2 py-1">
                      <span className="font-medium dark:text-white">
                        {(currentPageNumber - 1) * channelsPerPage +
                          (index + 1)}
                        .
                      </span>
                    </td>

                    <td className="text-black dark:text-white px-2 py-1">
                      <p className="">
                        {stream?.channel ? stream.channel : stream.title}
                      </p>
                    </td>

                    <td className="text-black dark:text-white px-2 py-1">
                      <p>{stream?.quality ?? "x"}</p>
                    </td>

                    <td className="text-black dark:text-white px-2 py-1">
                      <p>{stream?.feed ?? "x"}</p>
                    </td>
                    <td className="px-2 py-1">
                      <span
                        onClick={() => handleBookmarkChannelToggle(stream)}
                        className=" flex flex-col items-center justify-center rounded-sm bg-purple-200 hover:bg-purple-300  w-6 h-6 ">
                        {bookmarkedChannel[stream.url] ? (
                          <BookmarkCheck />
                        ) : (
                          <Bookmark />
                        )}
                      </span>
                    </td>
                    <td className="px-2 py-1">
                      <span
                        onClick={() => handleSpecificChannelStream({ stream })}
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
                    </td>
                    <td className="px-2 py-1">
                      <span className=" flex flex-col items-center justify-center rounded-sm bg-purple-200 hover:bg-purple-300  w-6 h-6 ">
                        <a
                          href={`${stream.url}`}
                          target="_blank"
                          rel="noopener noreferrer">
                          <MonitorPlay />
                        </a>
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 dark:text-white">
                    No streams to play
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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

TableView.propTypes = {
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

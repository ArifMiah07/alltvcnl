import { useState } from "react";
import HlsVideoPlayer from "../../../Components/hls-video-player/HlsVideoPlayer";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

const Favorites = () => {
  const { bookmarkedChannel } = useLocalStorage();
  const allBookmarkedChannels = Object.keys(bookmarkedChannel);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [channelsPerPage, setChannelsPerPage] = useState(10);

  // console.log(getStreams);// getStreams.data => 12k+
  const totalItems = allBookmarkedChannels.length || 0;
  // const currentPageNumber = parseInt(req.query?.currentPage) || 1;
  // const itemsPerPage = parseInt(req.query?.channelsPerPage) || 10;
  const numbersOfPages = Math.ceil(totalItems / channelsPerPage);
  const startIndex = (currentPageNumber - 1) * channelsPerPage;
  const endIndex = currentPageNumber * channelsPerPage;
  const paginatedStreams = allBookmarkedChannels.slice(startIndex, endIndex);

  console.log(bookmarkedChannel, allBookmarkedChannels?.length);

  //
  const handleCurrentPage = (page) => {
    console.log(page);
    setCurrentPageNumber(page);
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
  // ____UPDATED CODE FROM CHATGPT____ //
  /** ______ENDs HERE______ */

  return (
    <section className="  w-full min-h-screen border border-red-400  ">
      <div>
        <ul className="flex flex-row gap-3">
          <li>
            <button className="border px-6 py-2 dark:text-white">
              List View
            </button>
          </li>
          <li>
            <button className="border px-6 py-2 dark:text-white">
              Grid View
            </button>
          </li>
          <li>
            <button className="border px-6 py-2 dark:text-white">
              Table View
            </button>
          </li>
        </ul>
      </div>
      <h1 className="dark:text-white">ur favorite channels list</h1>
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
        {/* contents */}
        <div className="w-full h-full lg:col-span-9 ">
          <div className=" border w-full h-full  p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start justify-evenly ">
            {paginatedStreams?.map((channel, index) => (
              <div className="p-2" key={index}>
                <HlsVideoPlayer src={channel} />
                {/* <div>s */}
              </div>
            ))}
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
    </section>
  );
};

export default Favorites;

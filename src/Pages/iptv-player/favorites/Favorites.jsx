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
  const numberOfPages = Math.ceil(totalItems / channelsPerPage);
  const startIndex = (currentPageNumber - 1) * channelsPerPage;
  const endIndex = currentPageNumber * channelsPerPage;
  const paginatedStreams = allBookmarkedChannels.slice(startIndex, endIndex);

  console.log(bookmarkedChannel, allBookmarkedChannels?.length);
  return (
    <section className="  w-full min-h-screen border border-red-400  ">
      <h1 className="dark:text-white">ur favorite channels list</h1>
      <div className="min-h-screen p-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start justify-start">
        {paginatedStreams?.map((channel, index) => (
          <div className="p-2" key={index}>
            <div>
              <HlsVideoPlayer src={channel} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Favorites;

import { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";

const IPTVComponent = () => {
  const [channels, setChannels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [channelsPerPage] = useState(10); // Change this value to adjust channels per page

  useEffect(() => {
    const fetchIPTVData = async () => {
      try {
        const response = await axios.get(
          "https://iptv-org.github.io/api/streams.json"
        );
        console.log(response.data);
        setChannels(response.data);
      } catch (error) {
        console.error("Error fetching IPTV data:", error);
      }
    };

    fetchIPTVData();
  }, []);

  // Get current channels for current page
  const indexOfLastChannel = currentPage * channelsPerPage;
  const indexOfFirstChannel = indexOfLastChannel - channelsPerPage;
  const currentChannels = channels.slice(indexOfFirstChannel, indexOfLastChannel);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>IPTV Channels</h1>
      <div className="channels-container">
        {currentChannels.map((channel, index) => (
          <div key={index} className="channel-card">
            <h2>{channel.channel}</h2>
            <ReactPlayer
              url={channel.url}
              controls={true}
              width="100%"
              height="auto"
            />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 pagination">
        {Array.from({ length: Math.ceil(channels.length / channelsPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)}>{i + 1}</button>
        ))}
      </div>
    </div>
  );
};

export default IPTVComponent;

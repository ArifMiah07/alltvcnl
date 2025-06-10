import { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";

const IPTVComponent = () => {
  const [channels, setChannels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [channelsPerPage, setChannelsPerPage] = useState(10); // dynamic now
  const [sectionControl, setSectionControl] = useState(false);

  useEffect(() => {
    const fetchIPTVData = async () => {
      try {
        const response = await axios.get(
          "https://iptv-org.github.io/api/streams.json"
        );
        setChannels(response.data);
      } catch (error) {
        console.error("Error fetching IPTV data:", error);
      }
    };

    fetchIPTVData();
  }, []);

  // Pagination logic
  const indexOfLastChannel = currentPage * channelsPerPage;
  const indexOfFirstChannel = indexOfLastChannel - channelsPerPage;
  const currentChannels = channels.slice(
    indexOfFirstChannel,
    indexOfLastChannel
  );

  const handleSectionControl = () => {
    setSectionControl(!sectionControl);
  };

  // Page navigation
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle user input to change channels per section
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const value = parseInt(form.cnlPerPage.value);

    if (!isNaN(value) && value > 0) {
      setChannelsPerPage(value);
      setCurrentPage(1); // Reset to first page when count changes
    } else {
      alert("Please enter a valid positive number.");
    }
  };

  return (
    <div>
      <h1>IPTV Channels : {channels.length}</h1>

      {/* Input Form */}
      <div className="flex p-2  relative">
        {sectionControl && (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-1 w-full">
            <label
              className="text-left  text-gray-700 w-full lg:w-1/3 "
              htmlFor="cnlPerPage">
              Channels Per Section:
            </label>
            <input
              className=" text-center py-2 px-3 bg-white w-full lg:w-1/3"
              placeholder="Enter number of channels per section"
              type="number"
              name="cnlPerPage"
              id="cnlPerPage"
              min="1"
            />
            <button
              className=" text-center py-2 px-3 bg-green-400 text-white w-full lg:w-1/3"
              type="submit">
              Submit
            </button>
          </form>
        )}

        <div className="abosolute top-0 right-0 p-0">
          {sectionControl ? (
            <button
              onClick={handleSectionControl}
              className=" text-black">
              X
            </button>
          ) : (
            <button
              onClick={handleSectionControl}
              className=" text-black">
              ^
            </button>
          )}
          {/* <button className="bg-red-500 p-2 text-white">X</button> */}
        </div>
      </div>

      <h3 className="capitalize bg-purple-600 text-white p-3">
        Current Section: {currentPage}
      </h3>

      {/* Channel Cards */}
      <div className="flex flex-wrap justify-center gap-5 my-12 channels-container">
        {currentChannels.map((channel, index) => (
          <div key={index} className="w-80 channel-card">
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

      {/* Pagination Buttons */}
      <div className="flex flex-wrap gap-3 pagination items-center">
        <span className="bg-green-400 py-2 px-5 text-white">Section:</span>
        {Array.from(
          { length: Math.ceil(channels.length / channelsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`flex gap-2 items-center flex-1 py-2 px-4 rounded ${
                currentPage === i + 1
                  ? "bg-red-400 text-white"
                  : "bg-yellow-50 text-gray-600"
              }`}>
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default IPTVComponent;

import ReactPlayer from "react-player";

import PropTypes from "prop-types";

const StreamSpecificChannelsDetails = ({ streamData }) => {
  //   console.log(streamData.url);
  return (
    <div>
      {/* <h1>StreamSpecificChannelsDetails.jsx</h1> */}
      <div className="w-full h-full flex flex-col border border-green-50 p-4 md:p-8 lg:p-12 xl:p-16 ">
        <ReactPlayer
          // pip={true}
          controls={true}
          src={streamData.url}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default StreamSpecificChannelsDetails;

StreamSpecificChannelsDetails.propTypes = {
  streamData: PropTypes.object.isRequired,
};

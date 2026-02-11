import PropTypes from "prop-types";
import HlsVideoPlayer from "../hls-video-player/HlsVideoPlayer";

const StreamSpecificChannelsDetails = ({ streamData }) => {
  //   console.log(streamData.url);
  return (
    <div>
      {/* <h1>StreamSpecificChannelsDetails.jsx</h1> */}
      <div className="w-full h-full flex flex-col  px-4 py-4 md:px-8 md:py-8 lg:px-12 lg:py-12 xl:px-16 xl:py-24 ">
        <HlsVideoPlayer src={streamData?.url} controls autoPlay={false} />
      </div>
    </div>
  );
};

export default StreamSpecificChannelsDetails;

StreamSpecificChannelsDetails.propTypes = {
  streamData: PropTypes.object.isRequired,
};

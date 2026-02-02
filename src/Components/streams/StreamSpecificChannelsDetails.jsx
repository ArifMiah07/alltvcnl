import PropTypes from "prop-types";
import HlsVideoPlayer from "../hls-video-player/HlsVideoPlayer";

const StreamSpecificChannelsDetails = ({ streamData }) => {
  //   console.log(streamData.url);
  return (
    <div>
      {/* <h1>StreamSpecificChannelsDetails.jsx</h1> */}
      <div className="w-full h-full flex flex-col  p-4 md:p-8 lg:p-12 xl:p-16 ">
        <HlsVideoPlayer src={streamData?.url} controls autoPlay={false} />
      </div>
    </div>
  );
};

export default StreamSpecificChannelsDetails;

StreamSpecificChannelsDetails.propTypes = {
  streamData: PropTypes.object.isRequired,
};

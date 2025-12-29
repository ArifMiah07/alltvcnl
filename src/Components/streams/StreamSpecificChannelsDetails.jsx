import ReactPlayer from "react-player";

import PropTypes from "prop-types";
import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlaybackRateButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaFullscreenButton,
  MediaCaptionsButton,
  MediaPipButton,
} from "media-chrome/react";

const StreamSpecificChannelsDetails = ({ streamData }) => {
  //   console.log(streamData.url);
  return (
    <div>
      {/* <h1>StreamSpecificChannelsDetails.jsx</h1> */}
      <div className="w-full h-full flex flex-col  p-4 md:p-8 lg:p-12 xl:p-16 ">
        <MediaController
          style={{
            width: "100%",
            aspectRatio: "16/9",
          }}>
          <ReactPlayer
            // pip={true}
            slot="media"
            controls={false}
            src={streamData.url}
            style={{
              width: "100%",
              height: "100%",
              "--controls": "none",
            }}>
            {" "}
          </ReactPlayer>

          <MediaControlBar>
            <MediaPlayButton />
            <MediaSeekBackwardButton seekOffset={10} />
            <MediaSeekForwardButton seekOffset={10} />
            <MediaTimeRange />
            <MediaTimeDisplay showDuration />
            <MediaMuteButton />
            <MediaVolumeRange />
            <MediaPlaybackRateButton />
            <MediaCaptionsButton />
            <MediaPipButton />
            <MediaFullscreenButton />
          </MediaControlBar>
        </MediaController>
      </div>
    </div>
  );
};

export default StreamSpecificChannelsDetails;

StreamSpecificChannelsDetails.propTypes = {
  streamData: PropTypes.object.isRequired,
};

// ____UPDATED CODE FROM GEMINI____ //
/** ______START HERE______ */

import { useEffect, useRef } from "react";
import Hls from "hls.js";

import PropTypes from "prop-types";

const HlsVideoPlayer = ({ src, controls, autoPlay, muted }) => {
  const videoRef = useRef(null);
  const hls = useRef(null);

  useEffect(() => {
    // Configuration for efficient data usage and performance
    const hlsConfig = {
      maxBufferLength: 10, // Limit pre-loading to 10 seconds (default is 30s)
      maxMaxBufferLength: 20, // Hard cap buffer at 20s
      capLevelToPlayerSize: true, // Only fetch resolution needed for player's current size
      autoStartLoad: true,
    };

    if (Hls.isSupported()) {
      // Initialize HLS.js
      hls.current = new Hls(hlsConfig);
      hls.current.loadSource(src);
      hls.current.attachMedia(videoRef.current);

      // Handle autoplay after manifest is parsed
      hls.current.on(Hls.Events.MANIFEST_PARSED, () => {
        // Autoplay requires muted in most 2026 browsers
        if (autoPlay && muted) {
          videoRef.current.play();
        }
      });
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      // Fallback for native Safari support (doesn't use Hls.js config)
      videoRef.current.src = src;
      if (autoPlay && muted) {
        videoRef.current.play();
      }
    }

    // Cleanup function: essential for React lists to prevent memory leaks/zombie audio
    return () => {
      if (hls.current) {
        hls.current.destroy();
      }
      // Ensure we clean up the video element state on unmount
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.removeAttribute("src"); // Clear the source
        videoRef.current.load();
      }
    };
  }, [src, autoPlay, muted]); // Re-run effect only if src, autoplay settings change

  return (
    // Add a consistent aspect ratio wrapper for uniform grid sizes
    <div
      className="overflow-hidden bg-black"
      style={{
        aspectRatio: "16 / 9",
        width: "100%",
        // Add a temporary height if aspect ratio isn't supported in old browsers
        minHeight: "150px",
      }}>
      <video
        ref={videoRef}
        controls={controls}
        muted={muted}
        autoPlay={autoPlay}
        className="w-full h-full"
        style={{
          objectFit: "cover", // Fills the container (crops edges) to prevent height issues
        }}
      />
    </div>
  );
};

// Define PropTypes for validation
HlsVideoPlayer.propTypes = {
  src: PropTypes.string.isRequired, // Source URL is mandatory
  controls: PropTypes.bool, // Controls is optional, defaults to false if not provided
  autoPlay: PropTypes.bool, // AutoPlay is optional
  muted: PropTypes.bool, // Muted is optional
};

// Define default props if they are not passed in
HlsVideoPlayer.defaultProps = {
  controls: false,
  autoPlay: false,
  muted: false,
};

export default HlsVideoPlayer;
// ____UPDATED CODE FROM GEMINI____ //
/** ______ENDS HERE______ */

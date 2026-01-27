// ____UPDATED CODE FROM GEMINI____ //
/** ______START HERE______ */
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import PropTypes from "prop-types";

const HlsVideoPlayer = ({ src, controls, autoPlay }) => {
  const videoRef = useRef(null);
  const hls = useRef(null);

  // Track visual states based on your logic
  const [isSlowLoading, setIsSlowLoading] = useState(false); // For Blue Border
  const [isSuccessfullyLoaded, setIsSuccessfullyLoaded] = useState(false); // For Green Border

  useEffect(() => {
    // Reset all states when a new source is provided
    setIsSlowLoading(false);
    setIsSuccessfullyLoaded(false);

    // 1. The 15-second Watchdog Timer
    const watchdogTimer = setTimeout(() => {
      // If we haven't successfully loaded yet, show the Blue Border
      // readyState < 3 means it's not ready to play through smoothly
      if (
        videoRef.current &&
        videoRef.current.readyState < 3 &&
        !isSuccessfullyLoaded
      ) {
        setIsSlowLoading(true);
      }
    }, 15000);

    const hlsConfig = {
      maxBufferLength: 15,
      capLevelToPlayerSize: true,
      autoStartLoad: true,
      // Increased patience for slow manifests
      manifestLoadingMaxRetry: 10,
    };

    const handleSuccess = () => {
      clearTimeout(watchdogTimer);
      setIsSlowLoading(false); // Remove blue
      setIsSuccessfullyLoaded(true); // Turn green
    };

    if (Hls.isSupported()) {
      hls.current = new Hls(hlsConfig);
      hls.current.loadSource(src);
      hls.current.attachMedia(videoRef.current);

      // Event: Data is loaded and video is ready to play
      hls.current.on(Hls.Events.LEVEL_LOADED, handleSuccess);

      // Event: Fatal error (like CORS) triggers blue border immediately
      hls.current.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          setIsSlowLoading(true);
        }
      });
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      // Native Safari Fallback
      videoRef.current.src = src;
      videoRef.current.addEventListener("canplay", handleSuccess);
    }

    return () => {
      clearTimeout(watchdogTimer);
      if (hls.current) hls.current.destroy();
      if (videoRef.current) {
        const v = videoRef.current;
        v.removeEventListener("canplay", handleSuccess);
        v.pause();
        v.removeAttribute("src");
        v.load();
      }
    };
  }, [src]);

  // Determine the border color based on the current logic state
  let borderClasses = "border-transparent";
  if (isSlowLoading) {
    borderClasses = "border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]";
  } else if (isSuccessfullyLoaded) {
    borderClasses = "border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]";
  }

  return (
    <div
      className={`relative overflow-hidden bg-black transition-all duration-700 border-[1px] ${borderClasses}`}
      style={{ aspectRatio: "16 / 9", width: "100%", minHeight: "150px" }}>
      {/* Blue Border Fallback: Show manual link if loading is slow */}
      {isSlowLoading && (
        <div className="absolute top-2 right-2 z-20 flex flex-col items-end gap-1">
          <span className="text-[10px] bg-blue-600/80 text-white px-2 py-0.5 rounded font-bold uppercase">
            Slow Stream
          </span>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-700 text-[10px] font-black px-3 py-1 rounded shadow-lg hover:bg-gray-100 transition-colors uppercase">
            Open in New Tab
          </a>
        </div>
      )}

      {/* Green Border Indicator: Show success badge */}
      {/* {isSuccessfullyLoaded && (
        <div className="absolute top-2 left-2 z-20 bg-green-500 text-white text-[10px] font-black px-3 py-1 rounded shadow-md uppercase tracking-tighter">
          Live & Connected
        </div>
      )} */}

      <video
        ref={videoRef}
        controls={controls}
        // muted={muted}
        autoPlay={autoPlay}
        className="h-full w-full"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

HlsVideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  controls: PropTypes.bool,
  autoPlay: PropTypes.bool,
  muted: PropTypes.bool,
};

HlsVideoPlayer.defaultProps = {
  controls: true,
  autoPlay: false,
  muted: true,
};

export default HlsVideoPlayer;
// ____UPDATED CODE FROM GEMINI____ //
/** ______ENDS HERE______ */

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import PropTypes from "prop-types";

const HlsVideoPlayer = ({ src, controls = true, autoPlay = false, status }) => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  // 1. If status === true from API prop, initialize immediately as "purple"
  const [streamStatus, setStreamStatus] = useState(
    status === true ? "purple" : "green"
  );

  useEffect(() => {
    // 2. Keep state updated if status or src changes
    setStreamStatus(status === true ? "purple" : "green");

    const watchdogTimer = setTimeout(() => {
      if (videoRef.current && videoRef.current.readyState < 3) {
        setStreamStatus((prev) => (prev === "purple" ? "purple" : "blue"));
      }
    }, 15000);

    const hlsConfig = {
      maxBufferLength: 15,
      capLevelToPlayerSize: true,
      autoStartLoad: true,
      manifestLoadingMaxRetry: 5,
    };

    if (Hls.isSupported()) {
      if (hlsRef.current) hlsRef.current.destroy();

      const hls = new Hls(hlsConfig);
      hlsRef.current = hls;

      hls.loadSource(src);
      hls.attachMedia(videoRef.current);

      // If manifest parses successfully, turn purple
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        clearTimeout(watchdogTimer);
        setStreamStatus("purple");
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          clearTimeout(watchdogTimer);
          setStreamStatus("blue");
        }
      });
    } else if (videoRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = src;
    }

    return () => {
      clearTimeout(watchdogTimer);
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      if (videoRef.current) {
        const v = videoRef.current;
        v.pause();
        v.removeAttribute("src");
        v.load();
      }
    };
  }, [src, status]);

  // Original border-[1px] styling strictly preserved
  let borderClasses = "border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]";

  if (streamStatus === "purple") {
    borderClasses = "border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)]";
  } else if (streamStatus === "blue") {
    borderClasses = "border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]";
  }

  return (
    <div
      className={`relative overflow-hidden bg-black transition-all duration-500 border-[1px] ${borderClasses}`}
      style={{ aspectRatio: "16 / 9", width: "100%", minHeight: "150px" }}
    >
      {/* {streamStatus === "purple" && (
        // <div className="absolute top-2 left-2 z-20 bg-purple-600/90 text-white text-[10px] font-black px-2 py-0.5 rounded shadow uppercase tracking-wider">
        //   Verified
        // </div>
      )} */}

      {streamStatus === "blue" && (
        <div className="absolute top-2 right-2 z-20 flex flex-col items-end gap-1">
          <span className="text-[10px] bg-blue-600/90 text-white px-2 py-0.5 rounded font-bold uppercase">
            Unreachable
          </span>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-700 text-[10px] font-black px-3 py-1 rounded shadow hover:bg-gray-100 transition-colors uppercase"
          >
            Open Stream Link
          </a>
        </div>
      )}

      <video
        ref={videoRef}
        controls={controls}
        autoPlay={autoPlay}
        onPlaying={() => setStreamStatus("purple")}
        onError={() => setStreamStatus("blue")}
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
  status: PropTypes.bool,
};

export default HlsVideoPlayer;
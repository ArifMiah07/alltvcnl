import { useEffect, useRef } from "react";
import Hls from "hls.js";

const HlsVideoPlayer = ({ src, controls, autoPlay }) => {
  const videoRef = useRef(null);
  const hls = useRef(null);

  useEffect(() => {
    if (Hls.isSupported()) {
      // If HLS.js is supported, instantiate it
      hls.current = new Hls();
      hls.current.loadSource(src);
      hls.current.attachMedia(videoRef.current);
      hls.current.on(Hls.Events.MANIFEST_PARSED, () => {
        if (autoPlay) {
          videoRef.current.play();
        }
      });
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      // Fallback for native Safari support
      videoRef.current.src = src;
      if (autoPlay) {
        videoRef.current.play();
      }
    }

    // Cleanup function
    return () => {
      if (hls.current) {
        hls.current.destroy();
      }
    };
  }, [src, autoPlay]); // Re-run effect if src or autoPlay changes

  return (
    <video
      ref={videoRef}
      controls={controls}
      style={{ width: "100%", height: "auto" }}
    />
  );
};

export default HlsVideoPlayer;

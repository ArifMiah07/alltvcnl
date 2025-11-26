// src/components/Watch.jsx
import { useEffect, useState, useRef } from "react";
import Hls from "hls.js";

const Watch = () => {
  const [streams, setStreams] = useState([]);
  const [selectedStreamUrl, setSelectedStreamUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  // Fetch the list of available streams on component mount
  useEffect(() => {
    setLoading(true);
    fetch("https://iptv-org.github.io/api/streams.json")
      .then((res) => res.json())
      .then((data) => {
        // Filter for HLS streams only
        const hlsStreams = data.filter(s => s.url && s.url.includes('.m3u8'));
        setStreams(hlsStreams);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching streams:", error);
        setError("Failed to load streams");
        setLoading(false);
      });
  }, []);

  // Effect to handle video playback when a new stream is selected
  useEffect(() => {
    if (!selectedStreamUrl || !videoRef.current) return;

    setError(null);
    
    // The URL for the video manifest, proxied through our Node.js server
const encodedUrl = btoa(selectedStreamUrl);
const proxiedUrl = `http://localhost:5000/proxy/${encodedUrl}`;
    const videoElement = videoRef.current;
    let hls;

    if (Hls.isSupported()) {
      hls = new Hls({
        debug: false,
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90
      });
      
      hls.loadSource(proxiedUrl);
      hls.attachMedia(videoElement);
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log("Manifest parsed, starting playback...");
        videoElement.play().catch(e => {
          console.error("Autoplay was prevented:", e);
          setError("Autoplay prevented - please click play manually");
        });
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error("HLS error:", data);
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              setError("Network error - please try another stream");
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              setError("Media error - trying to recover...");
              hls.recoverMediaError();
              break;
            default:
              setError("Fatal error occurred");
              hls.destroy();
              break;
          }
        }
      });

    } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
      // For native HLS support (like Safari)
      videoElement.src = proxiedUrl;
      videoElement.addEventListener('loadedmetadata', () => {
        videoElement.play().catch(e => {
          console.error("Autoplay was prevented:", e);
          setError("Autoplay prevented - please click play manually");
        });
      });
    } else {
      setError("HLS not supported in this browser");
    }

    // Cleanup function to destroy HLS instance when component unmounts or stream changes
    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [selectedStreamUrl]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ color: "#333", marginBottom: "20px" }}>IPTV Player</h1>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        Select a stream from the dropdown below. This player uses a smart proxy to handle CORS and HLS streaming.
      </p>
      
      {loading && (
        <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
          Loading streams...
        </div>
      )}
      
      {error && (
        <div style={{ 
          padding: "10px", 
          backgroundColor: "#ffebee", 
          color: "#c62828", 
          border: "1px solid #ef5350",
          borderRadius: "4px",
          marginBottom: "20px"
        }}>
          {error}
        </div>
      )}
      
      <select
        onChange={(e) => setSelectedStreamUrl(e.target.value)}
        value={selectedStreamUrl}
        style={{ 
          width: '100%', 
          padding: '12px', 
          marginBottom: '20px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '16px'
        }}
        disabled={loading}
      >
        <option value="" disabled>
          {loading ? "Loading streams..." : "Select a stream"}
        </option>
        {streams.slice(0, 100).map((stream, index) => (
          <option key={index} value={stream.url}>
            {stream.channel || stream.name || `Stream ${index + 1}`}
          </option>
        ))}
      </select>

      {selectedStreamUrl && (
        <div style={{ 
          marginTop: "20px", 
          backgroundColor: "#000", 
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
        }}>
          <video
            ref={videoRef}
            controls
            autoPlay
            muted
            width="100%"
            height="auto"
            style={{ display: "block" }}
          />
        </div>
      )}
    </div>
  );
};

export default Watch;

// ai is trash
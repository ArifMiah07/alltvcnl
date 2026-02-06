import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import HlsVideoPlayer from "../../Components/hls-video-player/HlsVideoPlayer";
// import Watch from "../IPTVComponent/Watch";

const isDirectPlayableUrl = (url) => {
  if (!url) return false;
  const lower = url.toLowerCase();
  return (
    lower.includes("youtube.com") ||
    lower.includes("youtu.be") ||
    lower.includes("facebook.com") ||
    lower.endsWith(".m3u8") ||
    lower.endsWith(".mp4") ||
    lower.endsWith(".webm") ||
    lower.endsWith(".ogg") ||
    lower.endsWith(".mov")
  );
};

const isInstagramUrl = (url) => {
  const lower = url.toLowerCase();
  return (
    lower.includes("instagram.com/p/") || lower.includes("instagram.com/reel/")
  );
};

const isTikTokUrl = (url) => url.toLowerCase().includes("tiktok.com");

const isXUrl = (url) => {
  const lower = url.toLowerCase();
  return lower.includes("twitter.com") || lower.includes("x.com");
};

const loadTwitterScript = () => {
  if (typeof window !== "undefined") {
    if (!window.twttr) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
      window.twttr.widgets.load();
    }
  }
};

const loadTikTokScript = () => {
  if (
    !document.querySelector('script[src="https://www.tiktok.com/embed.js"]')
  ) {
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  } else if (window.tiktokEmbed) {
    window.tiktokEmbed.init();
  }
};

const loadInstagramScript = () => {
  if (
    !document.querySelector('script[src="https://www.instagram.com/embed.js"]')
  ) {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  } else if (window.instgrm && window.instgrm.Embeds) {
    window.instgrm.Embeds.process();
  }
};

const VPlayer = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [playingUrl, setPlayingUrl] = useState("");
  const [urlType, setUrlType] = useState("none");

  useEffect(() => {
    if (!playingUrl) {
      setUrlType("none");
      return;
    }
    if (isDirectPlayableUrl(playingUrl)) setUrlType("direct");
    else if (isInstagramUrl(playingUrl)) setUrlType("instagram");
    else if (isTikTokUrl(playingUrl)) setUrlType("tiktok");
    else if (isXUrl(playingUrl)) setUrlType("x");
    else setUrlType("unsupported");
  }, [playingUrl]);

  useEffect(() => {
    if (urlType === "instagram") loadInstagramScript();
    if (urlType === "tiktok") loadTikTokScript();
    if (urlType === "x") loadTwitterScript();
  }, [urlType]);

  useEffect(() => {
    if (urlType === "x" && playingUrl) {
      loadTwitterScript();
    }
  }, [playingUrl, urlType]);

  const getTweetId = (url) => {
    const match = url.match(/status\/(\d+)/);
    return match ? match[1] : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let url = videoUrl.trim();

    if (!url) {
      alert("Please enter a valid video URL.");
      setPlayingUrl("");
      return;
    }

    //  Fix malformed Facebook watch URL
    if (url.includes("facebook.com/watch?v=")) {
      url = url.replace("facebook.com/watch?v=", "facebook.com/watch/?v=");
    }

    //  Validate X (Twitter) URL format
    if (isXUrl(url) && !url.includes("/status/")) {
      alert("Invalid X (Twitter) URL — it must include '/status/1234567890'.");
      setPlayingUrl("");
      return;
    }

    setPlayingUrl(url);
  };

  const handleReset = () => {
    setVideoUrl("");
    setPlayingUrl("");
    setUrlType("none");
  };

  return (
    <div className="min-h-screen dark:bg-gray-900 bg-gray-50 flex flex-col items-center justify-center p-6">
      <Helmet>
        <title> Video Player</title>
        <meta
          name="description"
          content="Learn more about our IPTV Player and the team behind the experience."
        />
      </Helmet>
      <h1 className="text-2xl dark:text-white font-bold mb-4 text-center max-w-xl">
        Welcome to the Video Player
      </h1>

      <p className="max-w-xl mb-6 text-center dark:text-white text-gray-700">
        This player supports:
        <ul className="list-disc list-inside">
          <li>
            Direct video URLs from{" "}
            <strong>
              YouTube, Facebook, .m3u8 streams, and common video files (MP4,
              WebM)
            </strong>
          </li>
          <li>
            Embedded videos from{" "}
            <strong>Instagram, TikTok, and X (Twitter)</strong>
          </li>
        </ul>
      </p>

      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
        <label
          htmlFor="video-url"
          className="block dark:text-white text-gray-700 mb-2 font-medium">
          Enter Video URL or Embed Link
        </label>
        <input
          id="video-url"
          name="url"
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="e.g. https://youtube.com/watch?v=xyz or https://instagram.com/reel/abc"
          className="w-full p-2 border bg-white dark:text-white dark:bg-gray-900 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
          autoComplete="off"
        />

        <div className="mt-4 flex justify-between">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition">
            Play Video
          </button>
          <button
            type="reset"
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded transition">
            Reset
          </button>
        </div>
      </form>

      {playingUrl && (
        <div className="w-full mt-8 lg:p-12">
          {urlType === "direct" && (
            <div className=" lg:p-10 min-h-screen w-full aspect-video rounded overflow-hidden shadow-lg">
              <HlsVideoPlayer
                src={playingUrl}
                controls
                width="100%"
                height="100%"
                playing
                config={{
                  file: { attributes: { controlsList: "nodownload" } },
                }}
              />
            </div>
          )}

          {urlType === "instagram" && (
            <div
              className="instagram-video-container"
              style={{ minHeight: "400px" }}>
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={playingUrl}
                data-instgrm-version="14"
                style={{ margin: "auto", maxWidth: "540px" }}
              />
            </div>
          )}

          {urlType === "tiktok" && (
            <div style={{ minHeight: "600px", overflow: "hidden" }}>
              <blockquote
                className="tiktok-embed"
                cite={playingUrl}
                data-video-id={(function () {
                  const parts = playingUrl.split("/video/");
                  if (parts.length > 1) {
                    return parts[1].split("?")[0];
                  }
                  return "";
                })()}
                style={{ maxWidth: "540px", margin: "auto" }}>
                <section> </section>
              </blockquote>
            </div>
          )}

          {urlType === "x" &&
            (() => {
              const tweetId = getTweetId(playingUrl);
              if (!tweetId) {
                return (
                  <div className="text-red-600 font-semibold">
                    Invalid X (Twitter) URL — unable to extract tweet ID.
                  </div>
                );
              }
              return (
                <blockquote
                  className="twitter-tweet"
                  data-lang="en"
                  style={{ margin: "auto", maxWidth: "540px" }}>
                  <a
                    href={playingUrl}
                    target="_blank"
                    rel="noopener noreferrer">
                    View Tweet
                  </a>
                </blockquote>
              );
            })()}

          {urlType === "unsupported" && (
            <div
              className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded"
              role="alert">
              <p className="font-bold">Notice:</p>
              <p>
                The URL you provided is not supported or not a direct video
                stream playable by this player.
              </p>
              <p className="mt-2">
                For Instagram, TikTok, or X (Twitter) videos, please use their
                official embed URLs or embed codes.
                <br />
                Or provide a direct video URL like YouTube, Facebook, or a .m3u8
                stream.
              </p>
            </div>
          )}
        </div>
      )}
      {/* <div className="my-12 p-12">
        <Watch></Watch>
      </div> */}
    </div>
  );
};

export default VPlayer;

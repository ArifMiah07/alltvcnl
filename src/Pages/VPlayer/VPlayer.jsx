import { useState } from "react";
import ReactPlayer from "react-player";

const VPlayer = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [playingUrl, setPlayingUrl] = useState("");

  // Handle form submission - start playback
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = videoUrl.trim();

    if (url) {
      setPlayingUrl(url);
    } else {
      alert("Please enter a valid video URL.");
      setPlayingUrl("");
    }
  };

  // Handle reset - clear inputs and stop playback
  const handleReset = () => {
    setVideoUrl("");
    setPlayingUrl("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-xl font-semibold mb-6 text-center max-w-xl">
        This is an video player. Enter the video link you want to play.
      </h1>

      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="w-full max-w-md bg-white rounded-lg shadow-md p-6"
      >
        <label
          htmlFor="video-url"
          className="block text-gray-700 mb-2 font-medium"
        >
          Video URL
        </label>
        <input
          id="video-url"
          name="url"
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Enter m3u8 video URL here"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />

        <div className="mt-4 flex justify-between">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition"
          >
            Play Video
          </button>
          <button
            type="reset"
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded transition"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Video player */}
      {playingUrl && (
        <div className="w-full min-h-screen max-w-md mt-6 aspect-video">
          <ReactPlayer
            url={playingUrl}
            controls
            width="100%"
            height="100%"
            playing
            config={{
              file: {
                attributes: {
                  controlsList: "nodownload",
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default VPlayer;

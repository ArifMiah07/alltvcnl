import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Search,
  Loader,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

export default function IP() {
  const [channels, setChannels] = useState([]);
  const [currentChannel, setCurrentChannel] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [playerError, setPlayerError] = useState(null);
  const [ready, setReady] = useState(false);
  const playerRef = useRef(null);

  // Parse m3u playlist
  const parseM3U = (content) => {
    const lines = content.split("\n");
    const parsed = [];
    let currentItem = {};

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.startsWith("#EXTINF:")) {
        const tvgIdMatch = line.match(/tvg-id="([^"]*)"/);
        const tvgNameMatch = line.match(/tvg-name="([^"]*)"/);
        const tvgLogoMatch = line.match(/tvg-logo="([^"]*)"/);
        const groupTitleMatch = line.match(/group-title="([^"]*)"/);
        const nameMatch = line.split(",").pop();

        currentItem = {
          id: parsed.length,
          name: nameMatch || tvgNameMatch?.[1] || "Unknown Channel",
          logo: tvgLogoMatch?.[1] || "",
          group: groupTitleMatch?.[1] || "Other",
          tvgId: tvgIdMatch?.[1] || "",
        };
      } else if (line && !line.startsWith("#") && currentItem.name) {
        currentItem.url = line;
        parsed.push(currentItem);
        currentItem = {};
      }
    }

    return parsed;
  };

  // Fetch and parse playlist
  const fetchPlaylist = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://iptv-org.github.io/iptv/index.m3u",
        {
          method: "GET",
          headers: {
            Accept: "*/*",
          },
          mode: "cors",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      const parsedChannels = parseM3U(text);

      if (parsedChannels.length === 0) {
        throw new Error("No channels found in playlist");
      }

      setChannels(parsedChannels);
      console.log(`Loaded ${parsedChannels.length} channels`);
    } catch (err) {
      console.error("Playlist fetch error:", err);
      setError("Failed to load playlist: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylist();
  }, []);

  // Play selected channel
  const playChannel = (channel) => {
    console.log("Playing channel:", channel.name, channel.url);
    setCurrentChannel(channel);
    setPlaying(true);
    setPlayerError(null);
    setReady(false);
  };

  // Toggle play/pause
  const togglePlay = () => {
    setPlaying(!playing);
  };

  // Toggle mute
  const toggleMute = () => {
    setMuted(!muted);
  };

  // Handle player errors
  const handlePlayerError = (error) => {
    console.error("Player error:", error);
    setPlayerError(
      `Failed to load stream. The channel may be offline or incompatible.`
    );
    setPlaying(false);
  };

  // Handle player ready
  const handleReady = () => {
    console.log("Player ready");
    setReady(true);
    setPlayerError(null);
  };

  // Retry current channel
  const retryChannel = () => {
    if (currentChannel) {
      setPlayerError(null);
      setReady(false);
      setPlaying(true);
    }
  };

  // Filter channels by search
  const filteredChannels = channels.filter(
    (channel) =>
      channel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      channel.group.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group channels by category
  const groupedChannels = filteredChannels.reduce((acc, channel) => {
    const group = channel.group || "Other";
    if (!acc[group]) acc[group] = [];
    acc[group].push(channel);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-500" />
          <p className="text-xl">Loading channels...</p>
          <p className="text-sm text-gray-400 mt-2">Fetching IPTV playlist</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
          <p className="text-xl mb-2 text-red-400">Error Loading Playlist</p>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={fetchPlaylist}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition flex items-center gap-2 mx-auto">
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Channel List Sidebar */}
      <div className="w-80 bg-gray-800 flex flex-col border-r border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-2xl font-bold mb-4">IPTV Player</h1>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search channels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          <p className="text-sm text-gray-400 mt-2">
            {filteredChannels.length} of {channels.length} channels
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {Object.keys(groupedChannels).length === 0 ? (
            <div className="p-4 text-center text-gray-400">
              <p>No channels found</p>
            </div>
          ) : (
            Object.keys(groupedChannels)
              .sort()
              .map((group) => (
                <div key={group} className="mb-4">
                  <div className="px-4 py-2 bg-gray-700 text-sm font-semibold sticky top-0 z-10">
                    {group} ({groupedChannels[group].length})
                  </div>
                  {groupedChannels[group].map((channel) => (
                    <div
                      key={channel.id}
                      onClick={() => playChannel(channel)}
                      className={`px-4 py-3 cursor-pointer hover:bg-gray-700 transition flex items-center gap-3 ${
                        currentChannel?.id === channel.id
                          ? "bg-blue-600 hover:bg-blue-700"
                          : ""
                      }`}>
                      {channel.logo ? (
                        <img
                          src={channel.logo}
                          alt=""
                          className="w-10 h-10 rounded object-cover flex-shrink-0"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextElementSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div
                        className="w-10 h-10 bg-gray-600 rounded flex items-center justify-center flex-shrink-0"
                        style={{ display: channel.logo ? "none" : "flex" }}>
                        <Play className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{channel.name}</p>
                        {channel.tvgId && (
                          <p className="text-xs text-gray-400 truncate">
                            {channel.tvgId}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))
          )}
        </div>
      </div>

      {/* Video Player */}
      <div className="flex-1 flex flex-col">
        {currentChannel ? (
          <>
            <div className="flex-1 bg-black flex items-center justify-center relative">
              {playerError ? (
                <div className="text-center p-8">
                  <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
                  <p className="text-xl mb-2 text-white">Playback Error</p>
                  <p className="text-gray-400 mb-4">{playerError}</p>
                  <button
                    onClick={retryChannel}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition flex items-center gap-2 mx-auto">
                    <RefreshCw className="w-4 h-4" />
                    Retry Channel
                  </button>
                </div>
              ) : (
                <>
                  {!ready && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                      <Loader className="w-12 h-12 animate-spin text-blue-500" />
                    </div>
                  )}
                  <ReactPlayer
                    ref={playerRef}
                    url={currentChannel.url}
                    playing={playing}
                    muted={muted}
                    volume={volume}
                    width="100%"
                    height="100%"
                    onReady={handleReady}
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                    onError={handlePlayerError}
                    config={{
                      file: {
                        forceHLS: true,
                        hlsOptions: {
                          maxLoadingDelay: 4,
                          minAutoBitrate: 0,
                          lowLatencyMode: true,
                          enableWorker: true,
                          debug: false,
                        },
                        attributes: {
                          crossOrigin: "anonymous",
                        },
                      },
                    }}
                  />
                </>
              )}
            </div>

            {/* Controls */}
            <div className="bg-gray-800 p-4 border-t border-gray-700">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  disabled={!!playerError}
                  className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed">
                  {playing ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </button>

                <button
                  onClick={toggleMute}
                  disabled={!!playerError}
                  className="p-2 hover:bg-gray-700 rounded-lg transition disabled:opacity-50">
                  {muted ? (
                    <VolumeX className="w-6 h-6" />
                  ) : (
                    <Volume2 className="w-6 h-6" />
                  )}
                </button>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  disabled={!!playerError}
                  className="w-24 disabled:opacity-50"
                />

                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">
                    {currentChannel.name}
                  </p>
                  <p className="text-sm text-gray-400 truncate">
                    {currentChannel.group}
                  </p>
                </div>

                {ready && !playerError && (
                  <div className="px-3 py-1 bg-green-600 rounded-full text-xs font-medium">
                    LIVE
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-xl mb-2">Select a channel to start watching</p>
              <p className="text-sm">
                Choose from {channels.length} available channels
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

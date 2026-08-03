// src/components/PlaylistManager.jsx
import { useState, useEffect } from "react";
import { PlaylistStorage } from "../../services/playlistStorage";

export default function PlaylistManager() {
  const [playlists, setPlaylists] = useState({ default: [], favorites: [] });
  const [activeCategory, setActiveCategory] = useState("default");

  // Form state
  const [playlistNameInput, setPlaylistNameInput] = useState("default");
  const [channelName, setChannelName] = useState("");
  const [channelUrl, setChannelUrl] = useState("");
  const [loading, setLoading] = useState(true);

  // Load data asynchronously on mount
  useEffect(() => {
    async function loadData() {
      const data = await PlaylistStorage.getPlaylists();
      setPlaylists(data.playlists);
      setLoading(false);
    }
    loadData();
  }, []);

  // Handle adding a channel (creates a new category key if it doesn't exist yet)
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!channelName.trim() || !playlistNameInput.trim()) return;

    // Sanitize playlist name to act as a clean object key (lowercase, trim spaces)
    const categoryKey = playlistNameInput.trim().toLowerCase();

    await PlaylistStorage.addChannel(categoryKey, {
      cnl: channelName,
      url: channelUrl,
    });

    // Refresh state from storage
    const updated = await PlaylistStorage.getPlaylists();
    setPlaylists(updated.playlists);

    // Reset channel inputs but keep playlist context or reset as needed
    setChannelName("");
    setChannelUrl("");
    setActiveCategory(categoryKey); // Switch view to the updated/created playlist
  };

  // Handle deleting a channel
  const handleDelete = async (category, id) => {
    await PlaylistStorage.removeChannel(category, id);
    const updated = await PlaylistStorage.getPlaylists();
    setPlaylists(updated.playlists);
  };

  if (loading)
    return (
      <div className="p-6 text-white text-center">
        Loading your playlists...
      </div>
    );

  return (
    <div className="p-6 max-w-xl mx-auto bg-slate-900 text-white rounded-xl shadow-md border border-slate-800">
      <h2 className="text-xl font-bold mb-4 text-indigo-400">
        My Custom IPTV Playlists
      </h2>

      {/* Add Channel Form */}
      <form
        onSubmit={handleAdd}
        className="flex flex-col gap-3 mb-6 bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
        <h3 className="text-sm font-semibold text-slate-300">
          Add Channel to Playlist
        </h3>

        <input
          type="text"
          placeholder="Playlist Name (e.g., Sports, News)"
          value={playlistNameInput}
          onChange={(e) => setPlaylistNameInput(e.target.value)}
          className="bg-slate-800 border border-slate-700 p-2 rounded text-white text-sm"
          required
        />

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Channel Name"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            className="bg-slate-800 border border-slate-700 p-2 rounded flex-1 text-white text-sm"
            required
          />
          <input
            type="text"
            placeholder="Stream URL"
            value={channelUrl}
            onChange={(e) => setChannelUrl(e.target.value)}
            className="bg-slate-800 border border-slate-700 p-2 rounded flex-1 text-white text-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded font-medium text-sm transition-colors">
          Save Channel
        </button>
      </form>

      {/* Export Backup Button */}
      <div className="mb-6 flex justify-between items-center">
        <span className="text-xs text-slate-400">
          Total Playlists: {Object.keys(playlists).length}
        </span>
        <button
          onClick={() => PlaylistStorage.exportToFile()}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors">
          Export Backup (.json)
        </button>
      </div>

      {/* Playlist Selector Tabs */}
      <div className="mb-4">
        <p className="text-xs font-medium text-slate-400 mb-2">
          Select Playlist to View:
        </p>
        <div className="flex flex-wrap gap-2">
          {Object.keys(playlists).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded text-xs font-medium capitalize transition-colors ${
                activeCategory === cat
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}>
              {cat} ({playlists[cat]?.length || 0})
            </button>
          ))}
        </div>
      </div>

      {/* Render Active Playlist Channels */}
      <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-800">
        <h3 className="font-semibold text-lg text-slate-200 capitalize mb-3 border-b border-slate-800 pb-2">
          Playlist: {activeCategory}
        </h3>

        {playlists[activeCategory]?.length === 0 ? (
          <p className="text-sm text-slate-500 italic">
            No channels added to this playlist yet.
          </p>
        ) : (
          <ul className="space-y-2">
            {playlists[activeCategory]?.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-slate-800/80 p-2.5 rounded border border-slate-700/50">
                <div className="overflow-hidden mr-2">
                  <p className="text-white font-medium text-sm truncate">
                    {item.cnl}
                  </p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-400 underline text-xs truncate block">
                    {item.url}
                  </a>
                </div>
                <button
                  onClick={() => handleDelete(activeCategory, item.id)}
                  className="bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white px-2.5 py-1 rounded text-xs transition-colors shrink-0">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

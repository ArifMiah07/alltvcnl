import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import localforage from "localforage";
// import HlsVideoPlayer from "./components/HLSPlayer";
import {
  Search,
  Upload,
  X,
  ChevronDown,
  Tv2,
  Radio,
  ExternalLink,
  PlayCircle,
  AlertTriangle,
  ListMusic,
  Trash2,
  Link as LinkIcon,
  Globe,
  Plus,
  Loader2,
} from "lucide-react";
import HlsVideoPlayer from "../../Components/hls-video-player/HlsVideoPlayer";

// Configure localforage instance for playlist storage
const playlistStorage = localforage.createInstance({
  name: "SignalDeckDB",
  storeName: "playlists",
});

// ---------- Parsing helpers ----------

function normalizeChannel(raw, index) {
  const url = raw.url || raw.Url || raw.URL || "";
  const name =
    raw.name || raw["tvg-name"] || raw.title || `Channel ${index + 1}`;
  return {
    id: raw["tvg-id"] || raw.id || `${name}-${index}`,
    name,
    tvgName: raw["tvg-name"] || name,
    logo: raw["tvg-logo"] || raw.logo || "",
    country: raw["tvg-country"] || raw.country || "",
    group: raw["group-title"] || raw.group || "Uncategorized",
    url,
    duration: raw.duration || "-1",
  };
}

function parseAsJSON(text) {
  const data = typeof text === "string" ? JSON.parse(text) : text;
  let list = [];
  if (Array.isArray(data)) {
    list = data;
  } else if (data && Array.isArray(data.channels)) {
    list = data.channels;
  } else if (data && data.url) {
    list = [data];
  } else {
    throw new Error("JSON did not contain a recognizable channel list");
  }
  if (list.length === 0) throw new Error("No channels found in JSON");
  return list.map(normalizeChannel);
}

function parseAsM3U(text) {
  const lines = text.split(/\r?\n/);
  const channels = [];
  let pending = null;

  const attrRegex = /([\w-]+)="([^"]*)"/g;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    if (line.startsWith("#EXTINF")) {
      const durationMatch = line.match(/^#EXTINF:\s*(-?[\d.]+)/);
      const duration = durationMatch ? durationMatch[1] : "-1";

      const attrs = {};
      let m;
      attrRegex.lastIndex = 0;
      while ((m = attrRegex.exec(line)) !== null) {
        attrs[m[1].toLowerCase()] = m[2];
      }

      const lastComma = line.lastIndexOf(",");
      const displayName =
        lastComma !== -1 ? line.slice(lastComma + 1).trim() : "Unnamed channel";

      pending = {
        duration,
        "tvg-name": attrs["tvg-name"] || displayName,
        "tvg-logo": attrs["tvg-logo"] || "",
        "tvg-id": attrs["tvg-id"] || "",
        "tvg-country": attrs["tvg-country"] || "",
        "group-title": attrs["group-title"] || "Uncategorized",
        name: displayName,
      };
    } else if (line.startsWith("#")) {
      continue;
    } else {
      if (pending) {
        pending.url = line;
        channels.push(pending);
        pending = null;
      }
    }
  }

  if (channels.length === 0)
    throw new Error("No #EXTINF entries with stream URLs were found");
  return channels.map(normalizeChannel);
}

function parsePlaylist(content) {
  if (typeof content === "object") {
    return { channels: parseAsJSON(content), format: "JSON" };
  }

  const trimmed = content.trim();
  if (!trimmed) throw new Error("Nothing to parse — the input is empty");

  const looksLikeJSON = trimmed.startsWith("{") || trimmed.startsWith("[");
  if (looksLikeJSON) {
    try {
      return { channels: parseAsJSON(trimmed), format: "JSON" };
    } catch (jsonErr) {
      try {
        return { channels: parseAsM3U(trimmed), format: "M3U" };
      } catch {
        throw new Error(
          `Couldn't read this as JSON (${jsonErr.message}) or as M3U`,
        );
      }
    }
  }
  try {
    return { channels: parseAsM3U(trimmed), format: "M3U" };
  } catch (m3uErr) {
    try {
      return { channels: parseAsJSON(trimmed), format: "JSON" };
    } catch {
      throw new Error(
        `Couldn't read this as M3U (${m3uErr.message}) or as JSON`,
      );
    }
  }
}

function isEmbedOnly(url) {
  return /youtube\.com|youtu\.be|twitch\.tv/i.test(url);
}

// ---------- Video stage (embed fallback + player) ----------

function VideoStage({ channel }) {
  if (!channel) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-3 border-b border-[#232838] bg-black p-6 text-center text-sm text-[#868C9C]"
        style={{ aspectRatio: "16 / 9" }}>
        <Tv2 size={40} strokeWidth={1.3} />
        <p>Pick a channel from the deck to start watching</p>
      </div>
    );
  }

  if (isEmbedOnly(channel.url)) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-3 border-b border-[#232838] bg-black p-6 text-center text-sm text-[#868C9C]"
        style={{ aspectRatio: "16 / 9" }}>
        <ExternalLink size={32} strokeWidth={1.3} />
        <p className="max-w-xs">
          {channel.name} streams on an external platform and can&apos;t be
          embedded here.
        </p>
        <a
          href={channel.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-[#F2A93B] bg-[#F2A93B] px-3.5 py-2 text-sm font-medium text-[#241804] hover:bg-[#f7bb57] hover:border-[#f7bb57]">
          Open channel <ExternalLink size={14} />
        </a>
      </div>
    );
  }

  return (
    <div className="border-b border-[#232838]">
      <HlsVideoPlayer key={channel.id} src={channel.url} controls autoPlay />
    </div>
  );
}

VideoStage.propTypes = {
  channel: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string,
  }),
};

// ---------- Import Screen with URL and LocalForage Storage ----------

function ImportScreen({
  onLoad,
  savedPlaylists,
  onDeletePlaylist,
  error,
  loading,
}) {
  const [tab, setTab] = useState("url"); // 'url' | 'raw'
  const [urlInput, setUrlInput] = useState("");
  const [playlistName, setPlaylistName] = useState("");
  const [text, setText] = useState("");
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  const presets = [
    {
      name: "IPTV Org (M3U)",
      url: "https://raw.githubusercontent.com/iptv-org/iptv/gh-pages/index.m3u",
    },
    {
      name: "IPTV Org Streams (JSON)",
      url: "https://iptv-org.github.io/api/streams.json",
    },
    {
      name: "IPTV Org - Movies Only (M3U)",
      url: "https://iptv-org.github.io/iptv/categories/movies.m3u",
    },
    {
      name: "IPTV Org - News Only (M3U)",
      url: "https://iptv-org.github.io/iptv/categories/news.m3u",
    },
    {
      name: "IPTV Org - Animation/Cartoons (M3U)",
      url: "https://iptv-org.github.io/iptv/categories/animation.m3u",
    },
    {
      name: "Free-TV IPTV (M3U)",
      url: "https://raw.githubusercontent.com/Free-TV/IPTV/master/playlist.m3u8",
    },
  ];

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setText(String(e.target.result || ""));
      if (!playlistName) setPlaylistName(file.name.replace(/\.[^/.]+$/, ""));
    };
    reader.readAsText(file);
  };

  const handleUrlSubmit = (targetUrl, name) => {
    if (!targetUrl) return;
    const finalName = name || playlistName || new URL(targetUrl).hostname;
    onLoad({ type: "url", source: targetUrl, name: finalName });
  };

  const handleRawSubmit = () => {
    if (!text.trim()) return;
    const finalName =
      playlistName || `Playlist ${new Date().toLocaleDateString()}`;
    onLoad({ type: "raw", source: text, name: finalName });
  };

  return (
    <div className="mx-auto flex max-w-2xl flex-1 flex-col justify-center gap-5 px-6 py-8">
      <div>
        <span className="font-['Oswald'] text-xs tracking-wide text-[#F2A93B]">
          Playlist Import & Storage
        </span>
        <h1 className="mt-1 font-['Oswald'] text-3xl font-medium leading-tight text-[#E9E7E0]">
          Load a playlist, get an organized deck.
        </h1>
        <p className="mt-1.5 text-sm leading-relaxed text-[#868C9C]">
          Fetch playlists via URL to prevent browser lag, or load from saved
          IndexedDB storage.
        </p>
      </div>

      {/* Saved Playlists Section */}
      {savedPlaylists.length > 0 && (
        <div className="rounded-xl border border-[#232838] bg-[#12151D] p-4">
          <h3 className="mb-2 font-['Oswald'] text-sm text-[#F2A93B]">
            Saved Playlists ({savedPlaylists.length})
          </h3>
          <div className="flex max-h-36 flex-col gap-1.5 overflow-y-auto pr-1">
            {savedPlaylists.map((pl) => (
              <div
                key={pl.id}
                className="flex items-center justify-between rounded-md border border-[#232838] bg-[#171B25] px-3 py-2 text-xs text-[#E9E7E0]">
                <div className="flex items-center gap-2 truncate">
                  <Globe size={14} className="text-[#868C9C]" />
                  <span className="font-medium truncate">{pl.name}</span>
                  <span className="text-[10px] text-[#868C9C]">
                    ({pl.channels.length} ch)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onLoad({ type: "cached", data: pl })}
                    className="rounded bg-[#F2A93B] px-2.5 py-1 text-[11px] font-bold text-[#241804] hover:bg-[#f7bb57]">
                    Load
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeletePlaylist(pl.id)}
                    className="text-[#868C9C] hover:text-[#E4574B]">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input Mode Tabs */}
      <div className="flex border-b border-[#232838]">
        <button
          type="button"
          onClick={() => setTab("url")}
          className={`flex items-center gap-2 border-b-2 px-4 py-2 text-xs font-medium ${
            tab === "url"
              ? "border-[#F2A93B] text-[#F2A93B]"
              : "border-transparent text-[#868C9C] hover:text-[#E9E7E0]"
          }`}>
          <LinkIcon size={14} /> Fetch via URL
        </button>
        <button
          type="button"
          onClick={() => setTab("raw")}
          className={`flex items-center gap-2 border-b-2 px-4 py-2 text-xs font-medium ${
            tab === "raw"
              ? "border-[#F2A93B] text-[#F2A93B]"
              : "border-transparent text-[#868C9C] hover:text-[#E9E7E0]"
          }`}>
          <Upload size={14} /> Raw File / Text
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Playlist Label / Name (Optional)"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          className="rounded-lg border border-[#232838] bg-[#12151D] px-3.5 py-2 text-xs text-[#E9E7E0] outline-none focus:border-[#F2A93B]"
        />

        {tab === "url" ? (
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://example.com/playlist.m3u"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="flex-1 rounded-lg border border-[#232838] bg-[#12151D] px-3.5 py-2.5 text-xs text-[#E9E7E0] outline-none focus:border-[#F2A93B]"
              />
              <button
                type="button"
                disabled={loading || !urlInput.trim()}
                onClick={() => handleUrlSubmit(urlInput)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#F2A93B] bg-[#F2A93B] px-4 py-2.5 text-xs font-medium text-[#241804] hover:bg-[#f7bb57] disabled:opacity-40">
                {loading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Plus size={14} />
                )}{" "}
                Load URL
              </button>
            </div>

            <div>
              <span className="text-[11px] text-[#868C9C]">Quick presets:</span>
              <div className="mt-1 flex flex-wrap gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.url}
                    type="button"
                    onClick={() => {
                      setUrlInput(preset.url);
                      setPlaylistName(preset.name);
                      handleUrlSubmit(preset.url, preset.name);
                    }}
                    className="rounded-md border border-[#232838] bg-[#171B25] px-2.5 py-1 text-[11px] text-[#E9E7E0] hover:border-[#868C9C]">
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`rounded-xl border-[1.5px] border-dashed bg-[#12151D] transition-colors ${
              dragging ? "border-[#F2A93B]" : "border-[#232838]"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              const file = e.dataTransfer.files?.[0];
              if (file) handleFile(file);
            }}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste JSON or M3U contents..."
              spellCheck={false}
              className="min-h-[160px] w-full resize-y bg-transparent p-4 font-mono text-[12.5px] leading-relaxed text-[#E9E7E0] outline-none placeholder:text-[#868C9C]"
            />
            <div className="flex items-center gap-3 border-t border-[#232838] px-4 py-2.5">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-md border border-[#232838] bg-[#171B25] px-3.5 py-2 text-[13px] text-[#E9E7E0] hover:border-[#868C9C]"
                onClick={() => fileInputRef.current?.click()}>
                <Upload size={14} /> Choose file
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,.m3u,.m3u8,.txt"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file);
                }}
              />
              <button
                type="button"
                className="ml-auto inline-flex items-center gap-1.5 rounded-md border border-[#F2A93B] bg-[#F2A93B] px-4 py-2 text-xs font-medium text-[#241804] hover:bg-[#f7bb57] disabled:opacity-40"
                onClick={handleRawSubmit}
                disabled={!text.trim() || loading}>
                <PlayCircle size={14} /> Parse Raw Text
              </button>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-md border border-[#E4574B]/30 bg-[#E4574B]/[0.08] px-3 py-2.5 text-[13px] text-[#E4574B]">
          <AlertTriangle size={16} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

ImportScreen.propTypes = {
  onLoad: PropTypes.func.isRequired,
  savedPlaylists: PropTypes.array.isRequired,
  onDeletePlaylist: PropTypes.func.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool,
};

// ---------- Sidebar ----------

function Sidebar({ groups, selectedId, onSelect, openGroups, onToggleGroup }) {
  return (
    <nav
      className="w-[300px] h-[100vh] flex-shrink-0 overflow-y-auto border-r border-[#232838] bg-[#12151D] p-2"
      aria-label="Channel groups">
      {groups.map((group) => {
        const isOpen = openGroups.has(group.name);
        return (
          <div key={group.name} className="mb-0.5">
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-md px-2 py-2.5 text-left text-[13px] text-[#E9E7E0] hover:bg-[#171B25]"
              onClick={() => onToggleGroup(group.name)}
              aria-expanded={isOpen}>
              <ChevronDown
                size={14}
                className={`flex-shrink-0 text-[#868C9C] transition-transform ${
                  isOpen ? "rotate-0" : "-rotate-90"
                }`}
              />
              <span className="flex-1 font-medium">{group.name}</span>
              <span className="rounded-full bg-[#171B25] px-1.5 text-[11px] text-[#868C9C]">
                {group.channels.length}
              </span>
            </button>
            {isOpen && (
              <ul className="list-none space-y-0 pb-1.5">
                {group.channels.map((ch) => (
                  <li key={ch.id}>
                    <button
                      type="button"
                      className={`flex w-full items-center gap-2 rounded-md py-1.5 pl-6 pr-2 text-left text-[13px] ${
                        selectedId === ch.id
                          ? "bg-[#6B5527] text-[#F2A93B]"
                          : "text-[#868C9C] hover:bg-[#171B25] hover:text-[#E9E7E0]"
                      }`}
                      onClick={() => onSelect(ch)}>
                      <span
                        className={`w-[26px] flex-shrink-0 font-['Oswald'] text-[11px] ${
                          selectedId === ch.id
                            ? "text-[#F2A93B]"
                            : "text-[#868C9C]"
                        }`}>
                        {String(ch.num).padStart(3, "0")}
                      </span>
                      {ch.logo ? (
                        <img
                          src={ch.logo}
                          alt=""
                          className="h-[18px] w-[18px] flex-shrink-0 rounded-sm object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <Tv2
                          size={16}
                          className="flex-shrink-0 text-[#868C9C]"
                        />
                      )}
                      <span className="truncate">{ch.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}

Sidebar.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      channels: PropTypes.array.isRequired,
    }),
  ).isRequired,
  selectedId: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  openGroups: PropTypes.instanceOf(Set).isRequired,
  onToggleGroup: PropTypes.func.isRequired,
};

// ---------- Main App ----------

export default function SignalDeckPlayer() {
  const [channels, setChannels] = useState(null);
  const [format, setFormat] = useState("");
  const [importError, setImportError] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [openGroups, setOpenGroups] = useState(new Set());
  const [savedPlaylists, setSavedPlaylists] = useState([]);

  // Fetch saved playlists from localforage IndexedDB on mount
  const refreshSavedPlaylists = useCallback(async () => {
    try {
      const keys = await playlistStorage.keys();
      const list = await Promise.all(
        keys.map((k) => playlistStorage.getItem(k)),
      );
      setSavedPlaylists(list.filter(Boolean));
    } catch (err) {
      console.error("Failed loading IndexedDB playlists:", err);
    }
  }, []);

  useEffect(() => {
    refreshSavedPlaylists();
  }, [refreshSavedPlaylists]);

  const savePlaylistToDB = async (name, fmt, parsedChannels) => {
    const id = `pl-${Date.now()}`;
    const payload = { id, name, format: fmt, channels: parsedChannels };
    await playlistStorage.setItem(id, payload);
    await refreshSavedPlaylists();
  };

  const deletePlaylistFromDB = async (id) => {
    await playlistStorage.removeItem(id);
    await refreshSavedPlaylists();
  };

  const handleLoad = useCallback(
    async (sourceConfig) => {
      setLoading(true);
      setImportError("");
      try {
        if (sourceConfig.type === "cached") {
          const { channels: loadedChannels, format: fmt } = sourceConfig.data;
          setChannels(loadedChannels);
          setFormat(fmt);
          setSelected(loadedChannels[0] || null);
          const firstGroups = new Set();
          if (loadedChannels[0]) firstGroups.add(loadedChannels[0].group);
          setOpenGroups(firstGroups);
          setLoading(false);
          return;
        }

        let rawContent = "";
        if (sourceConfig.type === "url") {
          const res = await fetch(sourceConfig.source);
          if (!res.ok)
            throw new Error(`Failed to fetch URL (${res.statusText})`);
          const contentType = res.headers.get("content-type") || "";
          if (contentType.includes("application/json")) {
            rawContent = await res.json();
          } else {
            rawContent = await res.text();
          }
        } else {
          rawContent = sourceConfig.source;
        }

        const { channels: parsed, format: fmt } = parsePlaylist(rawContent);
        const numbered = parsed.map((c, i) => ({ ...c, num: i + 1 }));

        setChannels(numbered);
        setFormat(fmt);
        setSelected(numbered[0] || null);

        const firstGroups = new Set();
        if (numbered[0]) firstGroups.add(numbered[0].group);
        setOpenGroups(firstGroups);

        // Store into LocalForage automatically
        await savePlaylistToDB(sourceConfig.name, fmt, numbered);
      } catch (err) {
        setImportError(err.message || "Could not parse or fetch playlist");
      } finally {
        setLoading(false);
      }
    },
    [refreshSavedPlaylists],
  );

  const filteredChannels = useMemo(() => {
    if (!channels) return [];
    if (!search.trim()) return channels;
    const q = search.trim().toLowerCase();
    return channels.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q),
    );
  }, [channels, search]);

  const groups = useMemo(() => {
    const map = new Map();
    filteredChannels.forEach((ch) => {
      if (!map.has(ch.group)) map.set(ch.group, []);
      map.get(ch.group).push(ch);
    });
    return Array.from(map.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([name, list]) => ({
        name,
        channels: list.sort((a, b) => a.name.localeCompare(b.name)),
      }));
  }, [filteredChannels]);

  const toggleGroup = (name) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const reset = () => {
    setChannels(null);
    setSelected(null);
    setSearch("");
    setImportError("");
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#232838] bg-[#0B0D12] text-[#E9E7E0]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap');`}</style>

      {!channels ? (
        <ImportScreen
          onLoad={handleLoad}
          savedPlaylists={savedPlaylists}
          onDeletePlaylist={deletePlaylistFromDB}
          error={importError}
          loading={loading}
        />
      ) : (
        <>
          <div className="flex items-center gap-4 border-b border-[#232838] bg-[#12151D] px-5 py-3.5">
            <div className="flex items-baseline gap-2">
              <ListMusic size={18} className="text-[#F2A93B]" />
              <h2 className="font-['Oswald'] text-[19px] tracking-wide">
                Signal Deck
              </h2>
              <span className="text-[11px] text-[#868C9C]">
                {channels.length} channels
              </span>
            </div>
            <div className="flex max-w-[340px] flex-1 items-center gap-2 rounded-md border border-[#232838] bg-[#171B25] px-2.5 py-1.5 text-[#868C9C]">
              <Search size={14} />
              <input
                placeholder="Search channels, groups, or countries"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-[13px] text-[#E9E7E0] outline-none placeholder:text-[#868C9C]"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="flex text-inherit"
                  aria-label="Clear search">
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="ml-auto flex items-center gap-2.5 text-xs text-[#868C9C]">
              <span className="rounded border border-[#232838] px-2 py-0.5 text-[11px]">
                {format}
              </span>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-md border border-[#232838] bg-[#171B25] px-3.5 py-2 text-[13px] text-[#E9E7E0] hover:border-[#868C9C]"
                onClick={reset}>
                <Trash2 size={13} /> Switch playlist
              </button>
            </div>
          </div>

          <div className="flex min-h-0 flex-1">
            {groups.length > 0 ? (
              <Sidebar
                groups={groups}
                selectedId={selected?.id}
                onSelect={setSelected}
                openGroups={openGroups}
                onToggleGroup={toggleGroup}
              />
            ) : (
              <div className="w-[300px] flex-shrink-0 border-r border-[#232838] bg-[#12151D] p-2">
                <div className="px-5 py-10 text-center text-[13px] text-[#868C9C]">
                  No channels match &quot;{search}&quot;
                </div>
              </div>
            )}

            <div className="flex min-w-0 flex-1 flex-col p-4">
              <VideoStage channel={selected} />
              {selected && (
                <div className="flex items-center gap-3.5 px-5 py-4">
                  {selected.logo ? (
                    <img
                      src={selected.logo}
                      alt=""
                      className="h-11 w-11 flex-shrink-0 rounded-lg border border-[#232838] bg-[#171B25] object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-[#232838] bg-[#171B25]">
                      <Radio size={18} className="text-[#868C9C]" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-['Oswald'] text-base">
                      {selected.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-2 text-xs text-[#868C9C]">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#E4574B]" />{" "}
                      On air
                      <span>·</span>
                      <span>{selected.group}</span>
                      {selected.country && (
                        <>
                          <span>·</span>
                          <span>{selected.country}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

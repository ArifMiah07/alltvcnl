const STREAMS_API_URL = {
  dev: "http://localhost:5000/api/iptv-player/streams",
  prod: "https://iptv-player-server.vercel.app/api/iptv-player/streams",
};
export const BASE_STREAMS_API_URL = import.meta.env.DEV
  ? STREAMS_API_URL.dev
  : STREAMS_API_URL.prod;

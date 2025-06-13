# 📺 IPTV Player (Frontend)

Welcome to **IPTV Player**, a modern, responsive IPTV web app designed to stream over **13,000+ live TV channels** from various sources. Built with scalability and real-world usability in mind, this app is your gateway to seamless streaming.

---

## 🎯 Features

- ✅ 13,000+ Channels (from IPTV JSON source)
- ✅ Real-time Search (by Channel Name, URL, Country)
- ✅ Pagination & Section Navigation
- ✅ Bookmark/Save Favorite Channels (LocalStorage)
- ✅ Stream Preview via Embedded Player (ReactPlayer)
- ✅ Fully Responsive UI (Tailwind CSS)
- ✅ Dynamic Controls for:
  - Channels per page
  - Section-based navigation
- ✅ URL state passing for channel detail view

---

## 🧠 Tech Stack

| Layer     | Tech                                   |
|-----------|----------------------------------------|
| Frontend  | React, React Router, Tailwind CSS      |
| State     | React Hooks + LocalStorage             |
| Player    | `ReactPlayer` (HLS, M3U8 support)      |
| Icons     | `react-icons`                          |
| Future    | Backend with Node.js + Express         |

---

## 🧪 Planned Backend Features

> ⚠️ Backend not yet implemented — placeholder only

- 🔁 Stream validation & caching (`NodeCache`)
- 🔗 HLS `.m3u8` proxy (to bypass CORS)
- 🧠 Segment URL rewriting for `.ts` segments
- 🔐 Custom header injection (`User-Agent`, `Referer`, `Origin`)
- 📡 Batch stream validation
- ⚙️ Rate limiting, CORS support, centralized error handling
- 🧃 Future: Real-time Socket.IO for activity stats & viewer counts

---

## 🧩 App Sections

- `Home`: Featured IPTV player and stream preview
- `All Channels`: Paginated, searchable channel grid
- `Saved Channels`: View your locally saved favorites
- `Channel Detail`: Route-based preview for a selected channel
- `Footer`: Contact info and branding

---

## 📦 LocalStorage Usage

- `bookmarkedChannels`: stores bookmarked channels as an array
- `channelsPerPage`: stores user preference for pagination
- `currentPage`: keeps your current section for smooth navigation

---

## 📷 Sample UI

- ★ CrimeInvestigation.us
- ☆ BBC World
- ☆ CNN News
...
- Current Page: 1 / 1307 | Per Page: 10


---

## 🧭 Future Roadmap

- 🌍 Country Flags and Channel Language Tags
- 🎙️ Voice Search Integration
- 🧑‍🤝‍🧑 Multi-user bookmarking (via database)
- 📡 WebSocket support for real-time stats
- 🧠 AI-based stream validation and ranking

---

## 💬 Contact

- 📧 Email: `support@iptvplayer.com`
- 📞 Phone: `+880-123-456-789`
- 🌐 Website: [iptvplayer](https://alltvcnl.netlify.app)

---

## 🪪 License

MIT License © 2025 IPTV Player

---

**🚀 IPTV Player** – Your gateway to seamless entertainment.

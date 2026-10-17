# alltvcnl (All tv channel) - 📺 IPTV Player

[![Release](https://img.shields.io/github/v/release/ArifMiah07/alltvcnl?label=Release)](https://github.com/ArifMiah07/alltvcnl/releases/latest)
[![Downloads](https://img.shields.io/github/downloads/ArifMiah07/alltvcnl/total?label=Downloads)](https://github.com/ArifMiah07/alltvcnl/releases)
[![License](https://img.shields.io/github/license/ArifMiah07/alltvcnl)](LICENSE)
[![Website](https://img.shields.io/badge/Website-alltvcnl.netlify.app-blue)](https://alltvcnl.netlify.app)

A modern, cross-platform IPTV player designed to stream **13,000+ live TV channels** from various sources. Built with React, Electron, and Node.js for web, desktop, and future mobile platforms.

---

## ⚡ Quick Download

| Platform | Download | Status |
|----------|----------|--------|
| 🐧 **Linux** | [AppImage (103 MB)](https://github.com/ArifMiah07/alltvcnl/releases/latest/download/IPTV-Player-0.0.2.AppImage) | ✅ Tested |
| 🪟 **Windows** | [Portable .exe (86 MB)](https://github.com/ArifMiah07/alltvcnl/releases/latest/download/IPTV-Player-0.0.2.exe) | ⚠️ Untested |
| 🌐 **Web** | [Live Demo](https://alltvcnl.netlify.app) | ✅ Online |

---

## 🎯 Features

### ✨ Current Features
- 📡 **13,000+ Channels** - Stream from IPTV JSON sources
- 🔍 **Real-time Search** - Filter by channel name, URL, or country
- 📑 **Smart Pagination** - Section-based navigation with custom page sizes
- ⭐ **Bookmarks** - Save favorite channels (LocalStorage)
- 🎬 **Stream Preview** - Embedded HLS/M3U8 player with ReactPlayer
- 📱 **Fully Responsive** - Modern UI with Tailwind CSS
- 🖥️ **Cross-Platform** - Desktop (Electron) + Web + Mobile (coming soon)
- 🎨 **Dynamic Controls** - Adjustable channels per page
- 🔗 **URL State Management** - Deep linking for channel details

### 🔜 Coming Soon
- 🍎 macOS desktop app
- 📱 Mobile apps (iOS/Android via React Native)
- 🌍 Country flags and language tags
- 🎙️ Voice search integration
- 🧑‍🤝‍🧑 Multi-user bookmarking with database
- 📊 Real-time viewer stats via WebSocket
- 🧠 AI-powered stream validation and ranking

---

## 🏗️ Architecture

### Tech Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | React 18, React Router, Tailwind CSS, DaisyUI |
| **Desktop** | Electron 38, Node.js |
| **Backend** | Node.js, Express.js |
| **Player** | ReactPlayer (HLS, M3U8 support) |
| **State** | React Hooks, LocalStorage |
| **Icons** | React Icons, Lucide React |
| **Build** | Vite, Electron Builder |
| **Deployment** | Netlify (Web), Vercel (API), GitHub Releases (Desktop) |

### Backend Features (Node.js/Express)

✅ **Implemented:**
- 🔁 Stream validation & caching (`NodeCache`)
- 🔗 HLS `.m3u8` proxy (CORS bypass)
- 🧠 Segment URL rewriting for `.ts` segments
- 🔐 Custom header injection (`User-Agent`, `Referer`, `Origin`)
- 📡 Batch stream validation
- ⚙️ Rate limiting and CORS support
- 🎯 Centralized error handling
- 📦 M3U playlist parsing

🔜 **Planned:**
- 📡 Real-time Socket.IO for activity stats
- 👥 User authentication and profiles
- 📊 Analytics dashboard
- 🔄 Auto-refresh broken streams

**Backend Repository:** [iptv-player-server](https://github.com/ArifMiah07/iptv-player-server) (Private)

---

## 🧩 App Sections

- **Home** - Featured IPTV player and stream preview
- **All Channels** - Paginated, searchable channel grid (13,000+ channels)
- **Saved Channels** - View your locally saved favorites
- **Channel Detail** - Route-based preview for selected channel
- **Footer** - Contact info and branding

---

## 🚀 Getting Started

### Web Version
Visit [alltvcnl.netlify.app](https://alltvcnl.netlify.app)

### Desktop Version

**Linux:**
```bash
# Download from releases
wget https://github.com/ArifMiah07/alltvcnl/releases/latest/download/IPTV-Player-0.0.2.AppImage

# Make executable
chmod +x IPTV-Player-0.0.2.AppImage

# Run
./IPTV-Player-0.0.2.AppImage --no-sandbox
```

**Windows:**
1. Download `IPTV-Player-0.0.2.exe` from [releases](https://github.com/ArifMiah07/alltvcnl/releases/latest)
2. Double-click to run (portable, no installation needed)

---

## 🛠️ Development

### Frontend Setup
```bash
# Clone repository
git clone https://github.com/ArifMiah07/alltvcnl.git
cd alltvcnl

# Install dependencies
npm install

# Run development server
npm run dev

# Run Electron app in dev mode
npm run electron-dev

# Build for production
npm run build

# Build desktop apps
npm run dist:linux    # Linux AppImage
npm run dist:win      # Windows installer
npm run dist:mac      # macOS dmg
```

### Backend Setup
```bash
# Clone backend repository (if you have access)
git clone https://github.com/ArifMiah07/iptv-player-server.git
cd iptv-player-server

# Install dependencies
npm install

# Run server
npm start
```

---

## 📦 LocalStorage Data

The app uses LocalStorage for:
- `bookmarkedChannels` - Array of saved favorite channels
- `channelsPerPage` - User preference for pagination (default: 10)
- `currentPage` - Current section for navigation state

---

## 🐛 Known Issues

- **Linux Desktop:** May have rendering issues on older integrated graphics (workaround: hardware acceleration disabled)
- **Windows Desktop:** Build untested on real Windows - feedback welcome!
- **Stream Quality:** Depends on source stream quality and internet connection
- **CORS Issues:** Some streams may require backend proxy

---

## 💬 Feedback & Support

Found a bug? Have a feature request?

- 🐛 [Report Issues](https://github.com/ArifMiah07/alltvcnl/issues)
- 💡 [Request Features](https://github.com/ArifMiah07/alltvcnl/issues/new)
- ⭐ Star the repo if you like it!
- 📧 Email: support@alltvcnl.com
- 📞 Phone: +880-123-456-789

---

## 📊 Project Stats

- **Lines of Code:** ~8,000+ (Frontend) + Backend
- **Channels:** 13,000+
- **Platforms:** Web, Linux, Windows (Mac coming soon)
- **Languages:** JavaScript, JSX, CSS

---

## 📝 License

MIT License © 2026 IPTV Player

See [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Channel data from public IPTV sources
- Built with React, Electron, and Node.js
- Icons by React Icons and Lucide
- Deployed on Netlify and Vercel

---

**🚀 IPTV Player** – Your gateway to seamless entertainment.

Made with ❤️ by [Arif Miah 07](https://github.com/ArifMiah07)

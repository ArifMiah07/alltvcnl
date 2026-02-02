import { app, BrowserWindow, protocol } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Disable hardware acceleration for better compatibility
app.disableHardwareAcceleration();

// Add command line switches for better performance on integrated graphics
app.commandLine.appendSwitch("disable-gpu");
app.commandLine.appendSwitch("disable-software-rasterizer");
app.commandLine.appendSwitch("disable-gpu-compositing");
app.commandLine.appendSwitch("disable-features", "VizDisplayCompositor");

// FIX: Disable sandbox to avoid permission issues on Linux
app.commandLine.appendSwitch("no-sandbox");

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      experimentalFeatures: true,
      enableBlinkFeatures: "OverlayScrollbars",
      disableBlinkFeatures: "Accelerated2dCanvas",
      sandbox: false, // Add this too
    },
    backgroundColor: "#1a1a1a",
    show: false,
  });

  // Show window when ready to prevent flash
  win.once("ready-to-show", () => {
    win.show();
  });

  // Handle all CORS and headers for streaming
  const filter = { urls: ["*://*/*"] };

  win.webContents.session.webRequest.onBeforeSendHeaders(
    filter,
    (details, callback) => {
      details.requestHeaders["Origin"] = "*";
      details.requestHeaders["Referer"] = "*";
      details.requestHeaders["User-Agent"] =
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
      callback({ requestHeaders: details.requestHeaders });
    },
  );

  win.webContents.session.webRequest.onHeadersReceived(
    filter,
    (details, callback) => {
      const responseHeaders = {
        ...details.responseHeaders,
        "Access-Control-Allow-Origin": ["*"],
        "Access-Control-Allow-Methods": ["GET, POST, PUT, DELETE, OPTIONS"],
        "Access-Control-Allow-Headers": ["*"],
        "Access-Control-Allow-Credentials": ["true"],
      };
      callback({ responseHeaders });
    },
  );

  // Dev mode: load Vite dev server
  if (process.env.ELECTRON_START_URL) {
    win.loadURL(process.env.ELECTRON_START_URL);
    win.webContents.openDevTools();
  } else {
    // Production mode: load built files
    win.loadFile(path.join(__dirname, "dist", "index.html"));
  }

  // Error handling
  win.webContents.on("did-fail-load", (event, errorCode, errorDescription) => {
    console.error("Failed to load:", errorCode, errorDescription);
  });

  win.webContents.on(
    "console-message",
    (event, level, message, line, sourceId) => {
      console.log(`[Renderer ${level}]:`, message);
    },
  );

  // Handle external links
  win.webContents.setWindowOpenHandler(({ url }) => {
    return { action: "deny" };
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Handle any unhandled errors
process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
});

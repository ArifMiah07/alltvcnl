import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Dev mode: load Vite dev server
  if (process.env.ELECTRON_START_URL) {
    win.loadURL(process.env.ELECTRON_START_URL);
  } else {
    // Prod mode: load built index.html
    win.loadFile(path.join(__dirname, "dist", "index.html")); // Vite output is /dist
  }

  // Open DevTools automatically in dev mode
  if (process.env.ELECTRON_START_URL) {
    win.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

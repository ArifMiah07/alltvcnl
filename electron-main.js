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
      nodeIntegration: false,  // Changed to false for security
      contextIsolation: true,   // Changed to true for security
      webSecurity: true
    },
  });

  // Dev mode: load Vite dev server
  if (process.env.ELECTRON_START_URL) {
    win.loadURL(process.env.ELECTRON_START_URL);
    win.webContents.openDevTools();
  } else {
    // Prod mode: load built index.html
    const indexPath = path.join(__dirname, "dist", "index.html");
    
    // Use loadURL instead of loadFile for better React Router support
    win.loadURL(`file://${indexPath}`);
    
    // Optional: Open DevTools in production for debugging
    // win.webContents.openDevTools();
  }

  // Log any loading errors
  win.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorCode, errorDescription);
  });

  // Handle console messages from renderer
  win.webContents.on('console-message', (event, level, message) => {
    console.log('Renderer log:', message);
  });
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
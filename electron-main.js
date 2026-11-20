import { BrowserWindow, app, shell } from "electron";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const devUrl = process.env.ELECTRON_START_URL;

function isHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function openExternal(url) {
  if (isHttpUrl(url)) void shell.openExternal(url);
}

function isAllowedNavigation(value) {
  let target;
  try {
    target = new URL(value);
  } catch {
    return false;
  }

  if (target.protocol === "file:") {
    return target.href === pathToFileURL(path.join(currentDir, "dist", "index.html")).href;
  }
  if (!devUrl) return false;

  const dev = new URL(devUrl);
  return target.origin === dev.origin && target.pathname === dev.pathname;
}

function createWindow() {
  const window = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: "#0f172a",
    show: false,
    webPreferences: {
      preload: path.join(currentDir, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
      experimentalFeatures: false,
    },
  });

  window.once("ready-to-show", () => window.show());

  if (devUrl) {
    void window.loadURL(devUrl);
  } else {
    void window.loadFile(path.join(currentDir, "dist", "index.html"));
  }

  window.webContents.on("did-fail-load", (_event, code, description) => {
    console.error(`Failed to load ${code}: ${description}`);
  });

  window.webContents.on("will-navigate", (event, url) => {
    if (isAllowedNavigation(url)) return;
    event.preventDefault();
    openExternal(url);
  });

  window.webContents.setWindowOpenHandler(({ url }) => {
    openExternal(url);
    return { action: "deny" };
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

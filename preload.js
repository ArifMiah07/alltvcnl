import { contextBridge } from "electron";

contextBridge.exposeInMainWorld("alltvcnl", {
  platform: process.platform,
});

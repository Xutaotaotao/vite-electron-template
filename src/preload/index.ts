import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('nativeBridge', {
  openUrlByDefaultBrowser: (url:string) => ipcRenderer.send('openUrlByDefaultBrowser', url)
})

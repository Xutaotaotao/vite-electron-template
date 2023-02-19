import { app, BrowserWindow, ipcMain, IpcMainEvent, shell } from 'electron'
import {join,resolve} from "path";

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: join(__dirname, "../preload/index.cjs")
    },
  })
  if (import.meta.env.MODE === "dev") {
    if (import.meta.env.VITE_DEV_SERVER_URL) {
      mainWindow.loadURL(import.meta.env.VITE_DEV_SERVER_URL);
      mainWindow.webContents.openDevTools();
    }
  } else {
    mainWindow.webContents.openDevTools()
    mainWindow.loadFile(resolve(__dirname, "../render/index.html"));
  }
}

const openUrlByDefaultBrowser = (e:IpcMainEvent, args: any) => {
  shell.openExternal(args)
}

app.whenReady().then(() => {
  createWindow()
  ipcMain.on('openUrlByDefaultBrowser', openUrlByDefaultBrowser)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
import { ipcMain, IpcMainEvent, shell } from "electron";

const openUrlByDefaultBrowser = (e: IpcMainEvent, args: any) => {
  shell.openExternal(args);
};

export const initIpc = (mainWindow:any,workWindow:any) => {
  ipcMain.on("openUrlByDefaultBrowser", openUrlByDefaultBrowser);

  ipcMain.on("communicateWithEachOtherSend", (event, arg) => {
    event.reply("communicateWithEachOtherReply", `I got ${arg},ok`);
  });
  ipcMain.on("communicateWithEachOtherSendSync", (event, arg) => {
    event.returnValue = `I got ${arg},ok`
  });
  ipcMain.handle("communicateWithEachOtherSendPromise",async (event, arg) => {
    return `I got ${arg},ok`
  });

  ipcMain.on('renderSendMsgToWork',(event:Event,msg:any) => {
    workWindow && workWindow.webContents.send('msgFormRender', msg)
  })
}
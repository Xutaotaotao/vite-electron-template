import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("nativeBridge", {
  openUrlByDefaultBrowser: (url: string) =>
    ipcRenderer.send("openUrlByDefaultBrowser", url),
  communicateWithEachOtherSendMsg: (msg: string) =>
    ipcRenderer.send("communicateWithEachOtherSend", msg),
  
  communicateWithEachOtherSendMsgSendSync: (msg: string) =>
  ipcRenderer.sendSync("communicateWithEachOtherSendSync", msg),

  communicateWithEachOtherSendMsgPromise: (msg: string) =>
   ipcRenderer.invoke('communicateWithEachOtherSendPromise',msg),
   
  onUpdateCounterByMain: (callback: any) => {
    ipcRenderer.on("update-counter", (e, value) => {
      callback(e, value);
    });
  },
  renderSendMsgToWork: (msg: any) => {
    ipcRenderer.send("renderSendMsgToWork", msg);
  },
  renderSendMsgToWorkByMessagePort: (msg:any) => {
    window.electronMessagePort && window.electronMessagePort.postMessage(msg)
  }
});

ipcRenderer.on("communicateWithEachOtherReply", (_event, arg) => {
  console.log(arg);
});

ipcRenderer.on('port', e => {
  window.electronMessagePort = e.ports[0]
})


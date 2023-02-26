import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    window.nativeBridge.onUpdateCounterByMain((e: Event, value: any) => {
      setCount((pre) => {
        return pre + value
      })
    });
  },[]);

  const openUrlByDefaultBrowser = () => {
    window.nativeBridge.openUrlByDefaultBrowser("https://www.baidu.com");
  };

  const communicateWithEachOtherSendMsg = () => {
    window.nativeBridge.communicateWithEachOtherSendMsg("Hello");
  };

  const communicateWithEachOtherSendMsgSendSync = () => {
   const msg = window.nativeBridge.communicateWithEachOtherSendMsgSendSync("Hello sync");
   console.log(msg)
  }

  const communicateWithEachOtherSendMsgPromise = () => {
    window.nativeBridge.communicateWithEachOtherSendMsgPromise("Hello Promise").then((msg:any) => {
      console.log(msg)
    })
  }

  const sendMsgToWork = () => {
    window.nativeBridge.renderSendMsgToWork("I am render");
  }

  const sendMsgToWorkByMessagePort = () => {
    window.nativeBridge.renderSendMsgToWorkByMessagePort("I am render, sendMsgToWorkByMessagePort");
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <div className="div-shape">
          <button onClick={openUrlByDefaultBrowser}>
            openUrlByDefaultBrowser
          </button>
        </div>
        <div className="div-shape">
          <button onClick={communicateWithEachOtherSendMsg}>
            communicateWithEachOtherSendMsg
          </button>
          <button onClick={communicateWithEachOtherSendMsgSendSync}>
            communicateWithEachOtherSendMsgSendSync
          </button>
          <button onClick={communicateWithEachOtherSendMsgPromise}>
            communicateWithEachOtherSendMsgPromise
          </button>
        </div>
        <div className="div-shape">
          <button onClick={sendMsgToWork}>
            sendMsgToWork
          </button>
        </div>
        <div className="div-shape">
          <button onClick={sendMsgToWorkByMessagePort}>
          sendMsgToWorkByMessagePort
          </button>
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;

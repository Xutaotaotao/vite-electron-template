/// <reference types="vite/client" />
declare global {
  interface Window {
    nativeBridge: any;
    electronMessagePort:any;
  }
}

export {};
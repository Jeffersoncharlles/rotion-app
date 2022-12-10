import { contextBridge, ipcRenderer } from 'electron'
import { ElectronAPI, electronAPI } from '@electron-toolkit/preload'


declare global {
  export interface Window {
    electron: ElectronAPI
    api: typeof api
  }
}

//aqui colocamos as req
const api = {
  fetchDocuments(): Promise<Array<{id:string, title:string}>> {
    return ipcRenderer.invoke('fetch-documents')
  }
}


if (process.contextIsolated) {
  try {
    //contextBring e a ponte entre o back-end e o front-end
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
  //poderia ser deletado esse else
}


//toda possível comunicação tem que estar aqui

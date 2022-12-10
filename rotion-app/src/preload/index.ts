import { contextBridge, ipcRenderer } from 'electron'
import { ElectronAPI, electronAPI } from '@electron-toolkit/preload'
import { IPC } from '../shared/constants/ipc'
import { FetchAllDocumentsResponse } from '../shared/types/ipc'


declare global {
  export interface Window {
    electron: ElectronAPI
    api: typeof api
  }
}

//aqui colocamos as req
const api = {
  fetchDocuments(): Promise<FetchAllDocumentsResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.FETCH_ALL)
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

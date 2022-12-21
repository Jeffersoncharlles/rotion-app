import { contextBridge, ipcRenderer } from 'electron'
import { IPC } from '../shared/constants/ipc'
import { CreateDocumentResponse, DeleteDocumentRequest, FetchAllDocumentsResponse, FetchDocumentRequest, FetchDocumentResponse, SaveDocumentRequest } from '../shared/types/ipc'


declare global {
  export interface Window {
    api: typeof api
  }
}

//aqui colocamos as req
const api = {
  fetchDocuments(): Promise<FetchAllDocumentsResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.FETCH_ALL)
  },
  fetchDocument(req:FetchDocumentRequest): Promise<FetchDocumentResponse>{
      return ipcRenderer.invoke(IPC.DOCUMENTS.FETCH,req)
  },
  CreateDocument(): Promise<CreateDocumentResponse> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.CREATE)
  },
  SaveDocument(req:SaveDocumentRequest): Promise<SaveDocumentRequest> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.SAVE,req)
  },
  DeleteDocument(req: DeleteDocumentRequest): Promise<DeleteDocumentRequest> {
    return ipcRenderer.invoke(IPC.DOCUMENTS.DELETE, req)
  },

  onNewDocumentRequest(callback: () => void) {
    ipcRenderer.on('new-document', callback)

    return () => {
      ipcRenderer.off('new-document', callback)
    }
  },

}


if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.api = api
  //poderia ser deletado esse else
}


//toda possível comunicação tem que estar aqui

export interface Document{
  id: string
  title: string
  content?:string
}

//============ REQUEST ====================//

export interface FetchDocumentRequest{
  id:string
}

export interface DeleteDocumentRequest{
  id:string
}

export interface SaveDocumentRequest extends Document{}


//============ RESPONSE ====================//
export interface FetchAllDocumentsResponse{
  data:Document[]
}


export interface FetchDocumentResponse{
  data:Document
}


export interface CreateDocumentResponse{
  data:Document
}

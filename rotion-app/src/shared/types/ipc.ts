export interface Document{
  id: string
  title: string
  content:string
}

//============ REQUEST ====================//




//============ RESPONSE ====================//
export interface FetchAllDocumentsResponse{
  data:Document[]
}

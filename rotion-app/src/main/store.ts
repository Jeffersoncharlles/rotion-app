import Store from 'electron-store'
import { Document } from '../shared/types/ipc'
import { is } from '@electron-toolkit/utils'

interface StoreType{
  documents: Record<string,Document>
}



export const store = new Store<StoreType>({
  name: is.dev?'dev':'production',
  defaults: {
    documents:{},
  }
})

console.log(store.path)

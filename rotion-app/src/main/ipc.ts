import {ipcMain } from 'electron'

ipcMain.handle('fetch-documents', async () => {
  return [
    {id:'1', title:'Ignite'},
    {id:'2', title:'Discovery'},
    {id:'3', title:'IgniteLAB'},
    {id:'4', title:'Docs'},
  ]
})

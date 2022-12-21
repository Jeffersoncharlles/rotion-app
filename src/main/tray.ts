import { Menu,  nativeImage,  Tray ,BrowserWindow} from 'electron'
import path from 'node:path'

//menu em start aquele pequeno

export function createTray(window: BrowserWindow) {
  const icon = nativeImage.createFromPath(
    path.resolve(__dirname, 'rotionTemplate.png')
  )

  const tray = new Tray(icon)

  const menu = Menu.buildFromTemplate([
    { label: 'Rotion', enabled: false },
    { type: 'separator' },
    { type: 'checkbox', label: 'Ativar modo dark' },
    {
      label: 'Criar novo documento', click: () => {
        window.webContents.send('new-document')//comunicação com ipc
      }
    },
    { type: 'separator' },
    { label: 'Documentos recentes', enabled: false },
    {
      label: 'Jefferson',
      accelerator: 'CommandOrControl+1',//comando
      acceleratorWorksWhenHidden: false,//desabilitar no mac os comandos global
    },
    {
      label: 'Rockseat', accelerator: 'CommandOrControl+2',//comando
      acceleratorWorksWhenHidden: false,
    },
    {
      label: 'Erick node',
      accelerator: 'CommandOrControl+3',//comando
      acceleratorWorksWhenHidden: false,
    },
    {
      label: 'Sair do Rotion',
      role: 'quit'
    }
  ])

  tray.setContextMenu(menu)
}

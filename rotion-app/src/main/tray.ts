import { app, Menu,  Tray } from 'electron'
import path from 'node:path'

//menu em start aquele pequeno

app.whenReady().then(() => {

  const tray = new Tray(path.resolve(__dirname, 'rotionTemplate.png'))

  const menu = Menu.buildFromTemplate([
    { label: 'Rotion', enabled: false },
    { type: 'separator' },
    { type: 'checkbox', label: 'Ativar modo dark'},
    {label: 'Rotion'},
  ])

  tray.setContextMenu(menu)
})

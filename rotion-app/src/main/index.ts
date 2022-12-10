import { app, shell, BrowserWindow } from 'electron'
import * as path from 'node:path'
import { createFileRoute, createURLRoute } from 'electron-router-dom'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

import './ipc'
import './store'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1120,
    height: 700,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: '#17141f',
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: {
      x: 20,
      y:20,
    },
    ...(process.platform === 'linux'
      ? {
          icon: path.join(__dirname, '../../build/icon.png'),
        }
      : {}),
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  //electron router dom
  const devServerURL = createURLRoute(process.env['ELECTRON_RENDERER_URL']!, 'main')
  const fileRoute = createFileRoute(
    path.join(__dirname, '../renderer/index.html'),
    'main'
  )


  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    //carregar a pagina em dev
    mainWindow.loadURL(devServerURL)
  } else {
    //carregar em produção
    mainWindow.loadFile(...fileRoute)
  }
}

if (process.platform === 'darwin') {
  app.dock.setIcon(path.resolve(__dirname, 'icon.png'))
}

// whenReady e bem parecido com o document.onLoading
app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {

    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  }) // sistema de mac ficar aberto mais ta fechado
})

// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    // quando todas as janelas tiverem fechada e for diferente macos fecha o app
  }
})

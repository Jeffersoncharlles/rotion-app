import path from 'node:path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],

    publicDir: path.resolve('resources'),
    // eslint-disable-next-line spaced-comment
    //config da pasta public
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    // config tailwind start
    css: {
      postcss: {
        plugins: [
          tailwindcss({
            config: './src/renderer/tailwind.config.js',
          }),
        ],
      },
    }, // config tailwind end
    resolve: {
      alias: {
        '@renderer': path.resolve('src/renderer/src'),
      },
    },
    plugins: [react()],
  },
})

import path from 'node:path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tsconfigPathsPlugin from 'vite-tsconfig-paths'
import tailwindcss from 'tailwindcss'

const tsconfigPaths = tsconfigPathsPlugin({
  projects: [path.resolve('tsconfig.json')]
})

export default defineConfig({
  main: {
    plugins: [tsconfigPaths, externalizeDepsPlugin()],

    publicDir: path.resolve('resources'),
    // eslint-disable-next-line spaced-comment
    //config da pasta public
  },
  preload: {
    plugins: [tsconfigPaths, externalizeDepsPlugin()],
  },
  renderer: {
    define: {
      'process.platform': JSON.stringify(process.platform),
      //ou seja to pegando a variável e jogando dentro
    },

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
    plugins: [tsconfigPaths, react()],
  },
})

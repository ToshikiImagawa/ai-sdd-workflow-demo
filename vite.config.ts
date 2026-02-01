/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, extname } from 'path'
import { cpSync, existsSync, createReadStream, statSync } from 'fs'

/** addons dist to dist/addons copy plugin */
function copyAddonsPlugin(): Plugin {
  return {
    name: 'copy-addons',
    closeBundle() {
      cpSync(resolve(__dirname, 'addons/dist'), resolve(__dirname, 'dist/addons'), {
        recursive: true,
      })
    },
  }
}

/** assets directory serve (dev) + copy (build) plugin */
function assetsPlugin(): Plugin {
  const assetsDir = resolve(__dirname, 'assets')
  return {
    name: 'serve-assets',
    configureServer(server) {
      const mimeTypes: Record<string, string> = { '.wav': 'audio/wav', '.mp3': 'audio/mpeg', '.ogg': 'audio/ogg', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.json': 'application/json' }
      server.middlewares.use('/assets', (req, res, next) => {
        const filePath = resolve(assetsDir, (req.url ?? '/').replace(/^\//, '').split('?')[0])
        if (!existsSync(filePath) || !statSync(filePath).isFile()) return next()
        const ext = extname(filePath)
        if (mimeTypes[ext]) res.setHeader('Content-Type', mimeTypes[ext])
        createReadStream(filePath).pipe(res)
      })
    },
    closeBundle() {
      if (existsSync(assetsDir)) {
        cpSync(assetsDir, resolve(__dirname, 'dist/assets'), { recursive: true })
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), assetsPlugin(), copyAddonsPlugin()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'presenter-view': resolve(__dirname, 'presenter-view.html'),
      },
    },
  },
  server: {
    fs: {
      allow: ['.', resolve(__dirname, 'addons'), resolve(__dirname, 'assets')],
    },
  },
  resolve: {
    alias: {
      '/addons': resolve(__dirname, 'addons/dist'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
  },
})

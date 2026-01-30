/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { cpSync } from 'fs'

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

export default defineConfig({
  plugins: [react(), copyAddonsPlugin()],
  server: {
    fs: {
      allow: ['.', resolve(__dirname, 'addons')],
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

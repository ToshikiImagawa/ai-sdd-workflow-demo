import { defineConfig, type Plugin } from 'vite'
import { writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const ADDON_NAME = 'ai-sdd-visuals'
const BUNDLE_FILE = `${ADDON_NAME}.iife.js`

/** CSS to JS inline plugin */
function cssInlinePlugin(): Plugin {
  return {
    name: 'css-inline',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const cssChunks: string[] = []
      const cssFileNames: string[] = []

      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (fileName.endsWith('.css') && chunk.type === 'asset') {
          cssChunks.push(chunk.source as string)
          cssFileNames.push(fileName)
        }
      }

      if (cssChunks.length === 0) return

      const cssInjection = `
(function(){
  var style = document.createElement('style');
  style.textContent = ${JSON.stringify(cssChunks.join('\n'))};
  document.head.appendChild(style);
})();`

      for (const [, chunk] of Object.entries(bundle)) {
        if (chunk.type === 'chunk' && chunk.isEntry) {
          chunk.code = cssInjection + '\n' + chunk.code
        }
      }

      for (const name of cssFileNames) {
        delete bundle[name]
      }
    },
  }
}

/** manifest.json generation plugin */
function manifestPlugin(): Plugin {
  return {
    name: 'addon-manifest',
    closeBundle() {
      const outDir = resolve(__dirname, 'dist')
      mkdirSync(outDir, { recursive: true })
      const manifest = {
        addons: [
          {
            name: ADDON_NAME,
            bundle: `/addons/${BUNDLE_FILE}`,
          },
        ],
      }
      writeFileSync(resolve(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n')
    },
  }
}

export default defineConfig({
  plugins: [cssInlinePlugin(), manifestPlugin()],
  publicDir: false,
  build: {
    lib: {
      entry: resolve(__dirname, 'entry.ts'),
      name: 'Addon',
      formats: ['iife'],
      fileName: () => BUNDLE_FILE,
    },
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: false,
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react/jsx-runtime': 'ReactJSXRuntime',
        },
      },
    },
    cssCodeSplit: false,
  },
})

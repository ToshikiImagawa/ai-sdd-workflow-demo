import { defineConfig, type Plugin } from 'vite'
import { writeFileSync, mkdirSync } from 'fs'
import { resolve } from 'path'

/** CSS を JS にインライン化するプラグイン */
function cssInlinePlugin(): Plugin {
  return {
    name: 'css-inline',
    enforce: 'post',
    generateBundle(_options, bundle) {
      // CSS ファイルの内容を収集
      const cssChunks: string[] = []
      const cssFileNames: string[] = []

      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (fileName.endsWith('.css') && chunk.type === 'asset') {
          cssChunks.push(chunk.source as string)
          cssFileNames.push(fileName)
        }
      }

      if (cssChunks.length === 0) return

      // CSS を JS に注入するコードを生成
      const cssInjection = `
(function(){
  var style = document.createElement('style');
  style.textContent = ${JSON.stringify(cssChunks.join('\n'))};
  document.head.appendChild(style);
})();`

      // JS バンドルに CSS 注入コードを先頭に追加
      for (const [, chunk] of Object.entries(bundle)) {
        if (chunk.type === 'chunk' && chunk.isEntry) {
          chunk.code = cssInjection + '\n' + chunk.code
        }
      }

      // CSS ファイルをバンドルから除去
      for (const name of cssFileNames) {
        delete bundle[name]
      }
    },
  }
}

/** ビルド後に manifest.json を生成するプラグイン */
function manifestPlugin(): Plugin {
  return {
    name: 'addon-manifest',
    closeBundle() {
      const outDir = resolve(__dirname, 'dist')
      mkdirSync(outDir, { recursive: true })
      const manifest = {
        addons: [
          {
            name: 'ai-sdd-visuals',
            bundle: '/addons/ai-sdd-visuals.iife.js',
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
      entry: resolve(__dirname, 'src/entry.ts'),
      name: 'AiSddVisuals',
      formats: ['iife'],
      fileName: () => 'ai-sdd-visuals.iife.js',
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

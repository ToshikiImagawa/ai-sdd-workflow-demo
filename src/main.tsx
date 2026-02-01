import { createRoot } from 'react-dom/client'
import 'reveal.js/dist/reveal.css'
import './styles/global.css'
import './addon-bridge'
import { App } from './App'
import { applyTheme } from './applyTheme'
import type { PresentationData } from './data'

type AddonManifest = {
  addons: Array<{ name: string; bundle: string }>
}

/** script タグを挿入しアドオンバンドルをロードする */
function loadAddonScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load addon: ${src}`))
    document.head.appendChild(script)
  })
}

/** manifest.json からアドオン一覧を読み込み、全バンドルをロードする */
async function loadAddons(): Promise<void> {
  try {
    const res = await fetch('/addons/manifest.json')
    if (!res.ok) return
    const manifest: AddonManifest = await res.json()
    await Promise.all(manifest.addons.map((addon) => loadAddonScript(addon.bundle)))
  } catch {
    // manifest が存在しない、またはロード失敗時はフォールバック（アドオンなし）
  }
}

const root = createRoot(document.getElementById('root')!)

// アドオンをロードし、slides.json を読み込んでからテーマを適用してレンダリングする
loadAddons().then(() => {
  fetch('/slides.json')
    .then((res) => {
      if (!res.ok) throw new Error(`${res.status}`)
      return res.json() as Promise<PresentationData>
    })
    .then(async (data) => {
      await applyTheme(data.meta?.themeColors)
      root.render(<App presentationData={data} />)
    })
    .catch(async () => {
      await applyTheme()
      root.render(<App />)
    })
})

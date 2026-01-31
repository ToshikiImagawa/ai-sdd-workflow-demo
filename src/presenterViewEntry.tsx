import { createRoot } from 'react-dom/client'
import { useEffect, useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import 'reveal.js/dist/reveal.css'
import './styles/global.css'
import './addon-bridge'
import { applyTheme, applyThemeData } from './applyTheme'
import { registerDefaultComponents } from './components/registerDefaults'
import { PresenterViewWindow } from './components/PresenterViewWindow'
import { theme } from './theme'
import type { SlideData, PresentationData, PresenterViewMessage } from './data'

const CHANNEL_NAME = 'presenter-view'

// デフォルトコンポーネントを登録
registerDefaultComponents()

type AddonManifest = {
  addons: Array<{ name: string; bundle: string }>
}

function loadAddonScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load addon: ${src}`))
    document.head.appendChild(script)
  })
}

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

function PresenterViewApp() {
  const [slides, setSlides] = useState<SlideData[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const channel = new BroadcastChannel(CHANNEL_NAME)

    channel.onmessage = (event: MessageEvent<PresenterViewMessage>) => {
      if (event.data.type === 'slideChanged') {
        setSlides(event.data.payload.slides)
        setCurrentIndex(event.data.payload.currentIndex)
      }
    }

    // メインウィンドウに準備完了を通知
    const readyMessage: PresenterViewMessage = { type: 'presenterViewReady' }
    channel.postMessage(readyMessage)

    // ウィンドウが閉じられるときにメインウィンドウに通知
    const handleBeforeUnload = () => {
      const closedMessage: PresenterViewMessage = { type: 'presenterViewClosed' }
      channel.postMessage(closedMessage)
    }
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      channel.close()
    }
  }, [])

  // テーマの適用
  useEffect(() => {
    fetch('/slides.json')
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status}`)
        return res.json() as Promise<PresentationData>
      })
      .then((data) => {
        if (data.theme) {
          applyThemeData(data.theme)
        }
      })
      .catch(() => {
        // テーマデータが取得できない場合はデフォルトを使用
      })
  }, [])

  if (slides.length === 0) {
    return <div style={{ color: 'var(--theme-text-body)', padding: '40px', fontFamily: 'var(--theme-font-body)' }}>メインウィンドウからの接続を待機中...</div>
  }

  return (
    <ThemeProvider theme={theme}>
      <PresenterViewWindow slides={slides} currentIndex={currentIndex} />
    </ThemeProvider>
  )
}

applyTheme().then()

const root = createRoot(document.getElementById('root')!)

// アドオンをロードしてからレンダリングする
loadAddons().then(() => {
  root.render(<PresenterViewApp />)
})

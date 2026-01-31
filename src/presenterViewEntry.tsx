import { createRoot } from 'react-dom/client'
import { useEffect, useState } from 'react'
import './styles/global.css'
import { applyTheme } from './applyTheme'
import { applyThemeData } from './applyTheme'
import { PresenterViewWindow } from './components/PresenterViewWindow'
import type { SlideData, PresenterViewMessage } from './data'

const CHANNEL_NAME = 'presenter-view'

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
        return res.json()
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

  return <PresenterViewWindow slides={slides} currentIndex={currentIndex} />
}

applyTheme().then()

const root = createRoot(document.getElementById('root')!)
root.render(<PresenterViewApp />)

import { useCallback, useEffect, useRef, useState } from 'react'
import type { SlideData, PresenterViewMessage } from '../data'

const CHANNEL_NAME = 'presenter-view'

export interface UsePresenterViewOptions {
  slides: SlideData[]
}

export interface UsePresenterViewReturn {
  openPresenterView: () => void
  isOpen: boolean
  sendSlideState: (currentIndex: number) => void
}

export function usePresenterView({ slides }: UsePresenterViewOptions): UsePresenterViewReturn {
  const [isOpen, setIsOpen] = useState(false)
  const channelRef = useRef<BroadcastChannel | null>(null)
  const windowRef = useRef<Window | null>(null)

  useEffect(() => {
    const channel = new BroadcastChannel(CHANNEL_NAME)
    channelRef.current = channel

    channel.onmessage = (event: MessageEvent<PresenterViewMessage>) => {
      if (event.data.type === 'presenterViewReady') {
        setIsOpen(true)
        const message: PresenterViewMessage = { type: 'slideChanged', payload: { currentIndex: 0, slides } }
        channel.postMessage(message)
      } else if (event.data.type === 'presenterViewClosed') {
        setIsOpen(false)
        windowRef.current = null
      }
    }

    return () => {
      channel.close()
      channelRef.current = null
    }
  }, [])

  const sendSlideState = useCallback(
    (currentIndex: number) => {
      if (channelRef.current && isOpen) {
        const message: PresenterViewMessage = { type: 'slideChanged', payload: { currentIndex, slides } }
        channelRef.current.postMessage(message)
      }
    },
    [isOpen, slides],
  )

  const openPresenterView = useCallback(() => {
    if (isOpen && windowRef.current && !windowRef.current.closed) {
      windowRef.current.focus()
      return
    }

    const newWindow = window.open('/presenter-view.html', 'presenterView', 'width=960,height=700')
    if (newWindow) {
      windowRef.current = newWindow
    } else {
      console.warn('[presenter-view] ポップアップがブロックされました。ブラウザの設定でポップアップを許可してください。')
    }
  }, [isOpen])

  return { openPresenterView, isOpen, sendSlideState }
}

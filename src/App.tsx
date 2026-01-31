import { ThemeProvider } from '@mui/material/styles'
import { FallbackImage } from './components/FallbackImage'
import { PresenterViewButton } from './components/PresenterViewButton'
import { SlideRenderer } from './components/SlideRenderer'
import { registerDefaultComponents } from './components/registerDefaults'
import { defaultPresentationData, loadPresentationData } from './data'
import type { PresentationData } from './data'
import { usePresenterView } from './hooks/usePresenterView'
import { useReveal } from './hooks/useReveal'
import { theme } from './theme'
import { applyThemeData } from './applyTheme'
import { useCallback, useEffect } from 'react'

// デフォルトコンポーネントを登録
registerDefaultComponents()

type AppProps = {
  presentationData?: PresentationData
}

export function App({ presentationData }: AppProps) {
  const data = loadPresentationData(presentationData, defaultPresentationData)
  const { openPresenterView, isOpen, sendSlideState } = usePresenterView({ slides: data.slides })

  const handleSlideChanged = useCallback(
    (event: { indexh: number }) => {
      sendSlideState(event.indexh)
    },
    [sendSlideState],
  )

  const { deckRef } = useReveal({ onSlideChanged: handleSlideChanged })

  useEffect(() => {
    if (data.theme) {
      applyThemeData(data.theme)
    }
  }, [data.theme])

  const logo = data.meta.logo

  return (
    <ThemeProvider theme={theme}>
      <div className="reveal" ref={deckRef}>
        <div className="slides">
          <SlideRenderer slides={data.slides} />
        </div>
      </div>
      {logo && (
        <div className="slide-logo">
          <FallbackImage src={logo.src} width={logo.width ?? 120} height={logo.height ?? 40} alt="Logo" />
        </div>
      )}
      <PresenterViewButton onClick={openPresenterView} isOpen={isOpen} />
    </ThemeProvider>
  )
}

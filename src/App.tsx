import { ThemeProvider } from '@mui/material/styles'
import { AudioControlBar } from './components/AudioControlBar'
import { AudioPlayButton } from './components/AudioPlayButton'
import { FallbackImage } from './components/FallbackImage'
import { PresenterViewButton } from './components/PresenterViewButton'
import { SlideRenderer } from './components/SlideRenderer'
import { registerDefaultComponents } from './components/registerDefaults'
import { defaultPresentationData, loadPresentationData } from './data'
import type { PresentationData } from './data'
import { getVoicePath } from './data/noteHelpers'
import { useAudioPlayer } from './hooks/useAudioPlayer'
import { useAutoSlideshow } from './hooks/useAutoSlideshow'
import { usePresenterView } from './hooks/usePresenterView'
import { useReveal } from './hooks/useReveal'
import { theme } from './theme'
import { applyThemeData } from './applyTheme'
import { useCallback, useEffect, useState } from 'react'

// デフォルトコンポーネントを登録
registerDefaultComponents()

type AppProps = {
  presentationData?: PresentationData
}

export function App({ presentationData }: AppProps) {
  const data = loadPresentationData(presentationData, defaultPresentationData)
  const { openPresenterView, isOpen, sendSlideState } = usePresenterView({ slides: data.slides })
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleSlideChanged = useCallback(
    (event: { indexh: number }) => {
      sendSlideState(event.indexh)
      setCurrentIndex(event.indexh)
    },
    [sendSlideState],
  )

  const { deckRef, goToNext } = useReveal({ onSlideChanged: handleSlideChanged })

  const audioPlayer = useAudioPlayer()
  const { autoPlay, setAutoPlay, autoSlideshow, setAutoSlideshow } = useAutoSlideshow({
    slides: data.slides,
    currentIndex,
    audioPlayer,
    goToNext,
  })

  const currentVoicePath = getVoicePath(data.slides[currentIndex])

  const handleAudioToggle = useCallback(() => {
    if (!currentVoicePath) return
    if (audioPlayer.isPlaying) {
      audioPlayer.stop()
    } else {
      audioPlayer.play(currentVoicePath)
    }
  }, [currentVoicePath, audioPlayer.isPlaying, audioPlayer.stop, audioPlayer.play])

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
      <div className="toolbar">
        {currentVoicePath && <AudioPlayButton playbackState={audioPlayer.playbackState} onToggle={handleAudioToggle} />}
        <AudioControlBar autoPlay={autoPlay} onAutoPlayChange={setAutoPlay} autoSlideshow={autoSlideshow} onAutoSlideshowChange={setAutoSlideshow} />
        <PresenterViewButton onClick={openPresenterView} isOpen={isOpen} />
      </div>
    </ThemeProvider>
  )
}

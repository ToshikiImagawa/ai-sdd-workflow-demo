import { useCallback, useEffect, useState } from 'react'
import type { SlideData } from '../data'
import type { UseAudioPlayerReturn } from './useAudioPlayer'
import { getVoicePath } from '../data/noteHelpers'

export interface UseAutoSlideshowOptions {
  slides: SlideData[]
  currentIndex: number
  audioPlayer: UseAudioPlayerReturn
  goToNext: () => void
}

export interface UseAutoSlideshowReturn {
  autoPlay: boolean
  setAutoPlay: (enabled: boolean) => void
  autoSlideshow: boolean
  setAutoSlideshow: (enabled: boolean) => void
}

export function useAutoSlideshow({ slides, currentIndex, audioPlayer, goToNext }: UseAutoSlideshowOptions): UseAutoSlideshowReturn {
  const [autoPlay, setAutoPlay] = useState(false)
  const [autoSlideshow, setAutoSlideshow] = useState(false)

  // 自動再生: スライド変更時に voice があれば再生
  useEffect(() => {
    if (!autoPlay) return
    const currentSlide = slides[currentIndex]
    if (!currentSlide) return
    const voicePath = getVoicePath(currentSlide)
    if (voicePath) {
      audioPlayer.play(voicePath)
    }
  }, [autoPlay, currentIndex, slides, audioPlayer.play])

  // 自動スライドショー: 音声終了時に次スライドへ
  const handleAudioEnded = useCallback(() => {
    if (!autoSlideshow) return
    const isLastSlide = currentIndex >= slides.length - 1
    if (!isLastSlide) {
      goToNext()
    }
  }, [autoSlideshow, currentIndex, slides.length, goToNext])

  // onEndedRef にコールバックを設定
  useEffect(() => {
    audioPlayer.onEndedRef.current = handleAudioEnded
  }, [audioPlayer.onEndedRef, handleAudioEnded])

  return {
    autoPlay,
    setAutoPlay,
    autoSlideshow,
    setAutoSlideshow,
  }
}

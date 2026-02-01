import { useCallback, useEffect, useRef, useState } from 'react'
import type { AudioPlaybackState } from '../data/types'

export interface UseAudioPlayerReturn {
  playbackState: AudioPlaybackState
  play: (src: string) => void
  stop: () => void
  isPlaying: boolean
  /** 音声終了時のコールバックを登録する */
  onEndedRef: React.MutableRefObject<(() => void) | null>
}

export function useAudioPlayer(): UseAudioPlayerReturn {
  const [playbackState, setPlaybackState] = useState<AudioPlaybackState>('idle')
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const onEndedRef = useRef<(() => void) | null>(null)

  const getAudio = useCallback((): HTMLAudioElement => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
    }
    return audioRef.current
  }, [])

  const play = useCallback(
    (src: string) => {
      const audio = getAudio()
      audio.src = src
      audio.play().catch(() => {
        setPlaybackState('idle')
      })
      setPlaybackState('playing')
    },
    [getAudio],
  )

  const stop = useCallback(() => {
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }
    setPlaybackState('idle')
  }, [])

  useEffect(() => {
    const audio = getAudio()

    const handleEnded = () => {
      setPlaybackState('idle')
      onEndedRef.current?.()
    }

    const handleError = () => {
      setPlaybackState('idle')
    }

    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
      audio.pause()
      audio.src = ''
    }
  }, [getAudio])

  return {
    playbackState,
    play,
    stop,
    isPlaying: playbackState === 'playing',
    onEndedRef,
  }
}

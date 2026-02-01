import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAutoSlideshow } from '../useAutoSlideshow'
import type { UseAudioPlayerReturn } from '../useAudioPlayer'
import type { SlideData } from '../../data'

function makeSlide(id: string, voice?: string): SlideData {
  return {
    id,
    layout: 'center',
    content: { title: id },
    meta: voice ? { notes: { voice } } : undefined,
  }
}

function createMockAudioPlayer(): UseAudioPlayerReturn {
  return {
    playbackState: 'idle',
    play: vi.fn() as unknown as (src: string) => void,
    stop: vi.fn() as unknown as () => void,
    isPlaying: false,
    onEndedRef: { current: null },
  }
}

describe('useAutoSlideshow', () => {
  let mockPlayer: UseAudioPlayerReturn
  let mockGoToNext: () => void

  beforeEach(() => {
    mockPlayer = createMockAudioPlayer()
    mockGoToNext = vi.fn() as unknown as () => void
  })

  it('初期状態は autoPlay/autoSlideshow ともに false', () => {
    const slides = [makeSlide('s1', '/audio/s1.mp3')]
    const { result } = renderHook(() =>
      useAutoSlideshow({
        slides,
        currentIndex: 0,
        audioPlayer: mockPlayer,
        goToNext: mockGoToNext,
      }),
    )

    expect(result.current.autoPlay).toBe(false)
    expect(result.current.autoSlideshow).toBe(false)
  })

  it('autoPlay ON + voice ありスライドで play() が呼ばれる', () => {
    const slides = [makeSlide('s1', '/audio/s1.mp3')]
    const { result } = renderHook(() =>
      useAutoSlideshow({
        slides,
        currentIndex: 0,
        audioPlayer: mockPlayer,
        goToNext: mockGoToNext,
      }),
    )

    act(() => {
      result.current.setAutoPlay(true)
    })

    expect(mockPlayer.play).toHaveBeenCalledWith('/audio/s1.mp3')
  })

  it('autoPlay ON + voice なしスライドで play() が呼ばれない', () => {
    const slides = [makeSlide('s1')]
    const { result } = renderHook(() =>
      useAutoSlideshow({
        slides,
        currentIndex: 0,
        audioPlayer: mockPlayer,
        goToNext: mockGoToNext,
      }),
    )

    act(() => {
      result.current.setAutoPlay(true)
    })

    expect(mockPlayer.play).not.toHaveBeenCalled()
  })

  it('autoPlay OFF では play() が呼ばれない', () => {
    const slides = [makeSlide('s1', '/audio/s1.mp3')]
    renderHook(() =>
      useAutoSlideshow({
        slides,
        currentIndex: 0,
        audioPlayer: mockPlayer,
        goToNext: mockGoToNext,
      }),
    )

    expect(mockPlayer.play).not.toHaveBeenCalled()
  })

  it('autoSlideshow ON + 音声終了時に goToNext が呼ばれる', () => {
    const slides = [makeSlide('s1', '/audio/s1.mp3'), makeSlide('s2')]
    const { result } = renderHook(() =>
      useAutoSlideshow({
        slides,
        currentIndex: 0,
        audioPlayer: mockPlayer,
        goToNext: mockGoToNext,
      }),
    )

    act(() => {
      result.current.setAutoSlideshow(true)
    })

    // onEndedRef に設定されたコールバックを呼び出す
    act(() => {
      mockPlayer.onEndedRef.current?.()
    })

    expect(mockGoToNext).toHaveBeenCalled()
  })

  it('autoSlideshow ON + 最終スライドでは goToNext が呼ばれない', () => {
    const slides = [makeSlide('s1', '/audio/s1.mp3')]
    const { result } = renderHook(() =>
      useAutoSlideshow({
        slides,
        currentIndex: 0,
        audioPlayer: mockPlayer,
        goToNext: mockGoToNext,
      }),
    )

    act(() => {
      result.current.setAutoSlideshow(true)
    })

    act(() => {
      mockPlayer.onEndedRef.current?.()
    })

    expect(mockGoToNext).not.toHaveBeenCalled()
  })

  it('autoSlideshow OFF では音声終了時に goToNext が呼ばれない', () => {
    const slides = [makeSlide('s1', '/audio/s1.mp3'), makeSlide('s2')]
    renderHook(() =>
      useAutoSlideshow({
        slides,
        currentIndex: 0,
        audioPlayer: mockPlayer,
        goToNext: mockGoToNext,
      }),
    )

    act(() => {
      mockPlayer.onEndedRef.current?.()
    })

    expect(mockGoToNext).not.toHaveBeenCalled()
  })
})

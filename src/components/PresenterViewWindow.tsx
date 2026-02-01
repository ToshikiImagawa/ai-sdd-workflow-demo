import { useEffect, useRef, useState } from 'react'
import type { SlideData, PresenterControlState } from '../data'
import { getSpeakerNotes, getSlideSummary } from '../data'
import { SlideRenderer } from './SlideRenderer'
import styles from './PresenterViewWindow.module.css'

type PresenterViewWindowProps = {
  slides: SlideData[]
  currentIndex: number
  controlState: PresenterControlState | null
  onNavigate: (direction: 'prev' | 'next') => void
  onAudioToggle: () => void
  onAutoPlayToggle: () => void
  onAutoSlideshowToggle: () => void
}

export function PresenterViewWindow({ slides, currentIndex, controlState, onNavigate, onAudioToggle, onAutoPlayToggle, onAutoSlideshowToggle }: PresenterViewWindowProps) {
  const currentSlide = slides[currentIndex]
  const previousSlide = currentIndex > 0 ? slides[currentIndex - 1] : null
  const nextSlide = currentIndex < slides.length - 1 ? slides[currentIndex + 1] : null
  const speakerNotes = currentSlide ? getSpeakerNotes(currentSlide) : undefined
  const summary = currentSlide ? getSlideSummary(currentSlide) : []

  const isFirst = currentIndex === 0
  const isLast = currentIndex >= slides.length - 1

  // キーボード操作
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        onNavigate('next')
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        onNavigate('prev')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onNavigate])

  return (
    <div className={styles.container}>
      {/* 上部コントロールバー */}
      <div className={styles.controlBar}>
        <div className={styles.navControls}>
          <button className={styles.navButton} onClick={() => onNavigate('prev')} disabled={isFirst} title="前のスライド (←)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
          <span className={styles.slideProgress}>
            {currentIndex + 1} / {slides.length}
          </span>
          <button className={styles.navButton} onClick={() => onNavigate('next')} disabled={isLast} title="次のスライド (→ / Space)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>
        </div>
        <div className={styles.audioControls}>
          <button className={`${styles.audioButton} ${controlState?.isPlaying ? styles.active : ''}`} onClick={onAudioToggle} disabled={!controlState?.hasVoice} title={controlState?.isPlaying ? '音声を停止' : '音声を再生'}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              {controlState?.isPlaying ? (
                <>
                  <path d="M3 9v6h4l5 5V4L7 9H3z" />
                  <path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  <path d="M14 7.97v8.06c1.48-.73 2.5-2.25 2.5-3.97 0-1.72-1.02-3.24-2.5-3.97V7.97z" />
                </>
              ) : (
                <path d="M3 9v6h4l5 5V4L7 9H3z" />
              )}
            </svg>
          </button>
          <button className={`${styles.audioButton} ${controlState?.autoPlay ? styles.active : ''}`} onClick={onAutoPlayToggle} title="自動音声再生">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span className={styles.autoLabel}>A</span>
          </button>
          <button className={`${styles.audioButton} ${controlState?.autoSlideshow ? styles.active : ''}`} onClick={onAutoSlideshowToggle} title="自動スライドショー">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" />
            </svg>
            <span className={styles.autoLabel}>A</span>
          </button>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className={styles.mainContent}>
        {/* 左: スピーカーノート（縦全体） */}
        <div className={styles.notesPanel}>
          <h2>スピーカーノート</h2>
          {speakerNotes ? <div className={styles.notesText}>{speakerNotes}</div> : <div className={styles.notesEmpty}>ノートはありません</div>}
        </div>

        {/* 右上: 次スライドプレビュー */}
        <div className={styles.previewPanel}>
          <h2>次のスライド</h2>
          <div className={styles.previewFrame}>{nextSlide ? <PreviewSlide slide={nextSlide} /> : <div className={styles.boundaryMessage}>最後のスライドです</div>}</div>
        </div>

        {/* 右下: 前スライドプレビュー */}
        <div className={styles.previewPanel}>
          <h2>前のスライド</h2>
          <div className={styles.previewFrame}>{previousSlide ? <PreviewSlide slide={previousSlide} /> : <div className={styles.boundaryMessage}>最初のスライドです</div>}</div>
        </div>
      </div>

      {/* フッター: 要点サマリー */}
      <div className={styles.summaryPanel}>
        <h2>要点サマリー</h2>
        {summary.length > 0 ? (
          <ul className={styles.summaryList}>
            {summary.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        ) : (
          <div className={styles.notesEmpty}>サマリーはありません</div>
        )}
      </div>
    </div>
  )
}

/** スライドの縮小プレビュー */
function PreviewSlide({ slide }: { slide: SlideData }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.3)

  useEffect(() => {
    if (!containerRef.current) return
    const parent = containerRef.current.parentElement
    if (!parent) return

    const updateScale = () => {
      const parentWidth = parent.clientWidth
      const parentHeight = parent.clientHeight
      const scaleX = parentWidth / 1280
      const scaleY = parentHeight / 720
      setScale(Math.min(scaleX, scaleY))
    }

    updateScale()
    const observer = new ResizeObserver(updateScale)
    observer.observe(parent)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className={styles.previewScaler} style={{ transform: `scale(${scale})` }}>
      <div className={`reveal ${styles.previewReveal}`}>
        <div className="slides">
          <SlideRenderer.Slide slide={slide} />
        </div>
      </div>
    </div>
  )
}

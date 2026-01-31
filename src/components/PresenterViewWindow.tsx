import { useEffect, useRef, useState } from 'react'
import type { SlideData } from '../data'
import { getSpeakerNotes, getSlideSummary } from '../data'
import { SlideRenderer } from './SlideRenderer'
import styles from './PresenterViewWindow.module.css'

type PresenterViewWindowProps = {
  slides: SlideData[]
  currentIndex: number
}

export function PresenterViewWindow({ slides, currentIndex }: PresenterViewWindowProps) {
  const currentSlide = slides[currentIndex]
  const nextSlide = currentIndex < slides.length - 1 ? slides[currentIndex + 1] : null
  const speakerNotes = currentSlide ? getSpeakerNotes(currentSlide) : undefined
  const summary = currentSlide ? getSlideSummary(currentSlide) : []

  return (
    <div className={styles.container}>
      {/* スピーカーノートパネル */}
      <div className={styles.notesPanel}>
        <h2>スピーカーノート</h2>
        {speakerNotes ? <div className={styles.notesText}>{speakerNotes}</div> : <div className={styles.notesEmpty}>ノートはありません</div>}
      </div>

      {/* 次スライドプレビューパネル */}
      <div className={styles.previewPanel}>
        <h2>次のスライド</h2>
        <div className={styles.previewFrame}>
          <span className={styles.slideInfo}>
            {currentIndex + 1} / {slides.length}
          </span>
          {nextSlide ? <PreviewSlide slide={nextSlide} /> : <div className={styles.lastSlideMessage}>最後のスライドです</div>}
        </div>
      </div>

      {/* 要点サマリーパネル */}
      {summary.length > 0 && (
        <div className={styles.summaryPanel}>
          <h2>要点サマリー</h2>
          <ul className={styles.summaryList}>
            {summary.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

/** 次スライドの縮小プレビュー */
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

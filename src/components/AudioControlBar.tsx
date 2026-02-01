import { useTranslation } from '../i18n'
import styles from './AudioControlBar.module.css'

type AudioControlBarProps = {
  autoPlay: boolean
  onAutoPlayChange: (enabled: boolean) => void
  autoSlideshow: boolean
  onAutoSlideshowChange: (enabled: boolean) => void
}

export function AudioControlBar({ autoPlay, onAutoPlayChange, autoSlideshow, onAutoSlideshowChange }: AudioControlBarProps) {
  const { t } = useTranslation()

  return (
    <div className={styles.wrapper}>
      <button
        onClick={() => onAutoPlayChange(!autoPlay)}
        title={autoPlay ? t('audio.autoPlayOn') : t('audio.autoPlayOff')}
        className={`${styles.button} ${autoPlay ? styles.active : ''}`}
        aria-label={autoPlay ? t('audio.autoPlayOn') : t('audio.autoPlayOff')}
        aria-pressed={autoPlay}
      >
        <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
      <button
        onClick={() => onAutoSlideshowChange(!autoSlideshow)}
        title={autoSlideshow ? t('audio.autoSlideshowOn') : t('audio.autoSlideshowOff')}
        className={`${styles.button} ${autoSlideshow ? styles.active : ''}`}
        aria-label={autoSlideshow ? t('audio.autoSlideshowOn') : t('audio.autoSlideshowOff')}
        aria-pressed={autoSlideshow}
      >
        <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" />
        </svg>
      </button>
    </div>
  )
}

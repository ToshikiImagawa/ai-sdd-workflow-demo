import type { AudioPlaybackState } from '../data/types'
import styles from './AudioPlayButton.module.css'

type AudioPlayButtonProps = {
  playbackState: AudioPlaybackState
  onToggle: () => void
}

export function AudioPlayButton({ playbackState, onToggle }: AudioPlayButtonProps) {
  const isPlaying = playbackState === 'playing'

  return (
    <button onClick={onToggle} title={isPlaying ? '音声を停止' : '音声を再生'} className={`${styles.button} ${isPlaying ? styles.playing : ''}`} aria-label={isPlaying ? '音声を停止' : '音声を再生'}>
      <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
        {isPlaying ? (
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
  )
}

import { SmartToyIcon, WarningIcon } from './icons'
import styles from './VibeCodingDemo.module.css'

export function VibeCodingDemo() {
  return (
    <div className={styles['vibe-demo-wrapper']}>
      <div className={styles['vibe-chat-bubble']}>"Make a cool button!"</div>
      <div className={styles['vibe-ai-thinking']}>
        <SmartToyIcon style={{ fontSize: '20px' }} /> Thinking...
      </div>
      <div className={styles['vibe-generated-result']}>
        <button className={styles['vibe-glitch-button']}>Click Me?</button>
        <div className={styles['vibe-error-popup']}>
          <WarningIcon style={{ fontSize: '14px', verticalAlign: 'middle' }} /> Style Error
        </div>
      </div>
    </div>
  )
}

import SmartToyIcon from '@mui/icons-material/SmartToy'
import WarningIcon from '@mui/icons-material/Warning'
import styles from './VibeCodingDemo.module.css'

export function VibeCodingDemo() {
  return (
    <div className={styles['vibe-demo-wrapper']}>
      <div className={styles['vibe-chat-bubble']}>"Make a cool button!"</div>
      <div className={styles['vibe-ai-thinking']}>
        <SmartToyIcon sx={{ fontSize: 20 }} /> Thinking...
      </div>
      <div className={styles['vibe-generated-result']}>
        <button className={styles['vibe-glitch-button']}>Click Me?</button>
        <div className={styles['vibe-error-popup']}>
          <WarningIcon sx={{ fontSize: 14, verticalAlign: 'middle' }} /> Style Error
        </div>
      </div>
    </div>
  )
}

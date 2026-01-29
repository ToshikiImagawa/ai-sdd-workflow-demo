import StorageIcon from '@mui/icons-material/Storage'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import TerminalIcon from '@mui/icons-material/Terminal'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import styles from './PersistenceVisual.module.css'

export function PersistenceVisual() {
  return (
    <div className={styles['persistence-visual-wrapper']}>
      <div className={styles['repo-base']}>
        <StorageIcon sx={{fontSize: 40, color: 'var(--theme-text-heading)', mb: '10px'}} />
        <div className={styles['repo-label']}>Git Repository</div>
        <div className={styles['stored-doc-icon']}>
          <CheckCircleIcon sx={{fontSize: 14, verticalAlign: 'middle'}} /> Updated!
        </div>
      </div>

      <div className={`${styles['data-stream-item']} ${styles['item-task']}`}>
        <PlaylistAddCheckIcon sx={{fontSize: 14, verticalAlign: 'middle'}} /> Task #101
      </div>
      <div className={`${styles['data-stream-item']} ${styles['item-log']}`}>
        <TerminalIcon sx={{fontSize: 14, verticalAlign: 'middle'}} /> temp.log
      </div>

      <div className={styles['persistence-session-label']}>
        <ArrowDownwardIcon sx={{fontSize: 14, verticalAlign: 'middle'}} /> Development Session{' '}
        <ArrowDownwardIcon sx={{fontSize: 14, verticalAlign: 'middle'}} />
      </div>
    </div>
  )
}

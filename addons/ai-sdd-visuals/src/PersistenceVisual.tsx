import { StorageIcon, CheckCircleIcon, PlaylistAddCheckIcon, TerminalIcon, ArrowDownwardIcon } from './icons'
import styles from './PersistenceVisual.module.css'

export function PersistenceVisual() {
  return (
    <div className={styles['persistence-visual-wrapper']}>
      <div className={styles['repo-base']}>
        <StorageIcon style={{ fontSize: '40px', color: 'var(--theme-text-heading)', marginBottom: '10px' }} />
        <div className={styles['repo-label']}>Git Repository</div>
        <div className={styles['stored-doc-icon']}>
          <CheckCircleIcon style={{ fontSize: '14px', verticalAlign: 'middle' }} /> Updated!
        </div>
      </div>

      <div className={`${styles['data-stream-item']} ${styles['item-task']}`}>
        <PlaylistAddCheckIcon style={{ fontSize: '14px', verticalAlign: 'middle' }} /> Task #101
      </div>
      <div className={`${styles['data-stream-item']} ${styles['item-log']}`}>
        <TerminalIcon style={{ fontSize: '14px', verticalAlign: 'middle' }} /> temp.log
      </div>

      <div className={styles['persistence-session-label']}>
        <ArrowDownwardIcon style={{ fontSize: '14px', verticalAlign: 'middle' }} /> Development Session <ArrowDownwardIcon style={{ fontSize: '14px', verticalAlign: 'middle' }} />
      </div>
    </div>
  )
}

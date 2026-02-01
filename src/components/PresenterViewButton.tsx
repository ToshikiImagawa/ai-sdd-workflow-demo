import styles from './PresenterViewButton.module.css'

type PresenterViewButtonProps = {
  onClick: () => void
  isOpen: boolean
}

export function PresenterViewButton({ onClick, isOpen }: PresenterViewButtonProps) {
  return (
    <div className={styles.wrapper}>
      <button onClick={onClick} disabled={isOpen} title={isOpen ? '発表者ビューは既に開いています' : '発表者ビューを開く'} className={`${styles.button} ${isOpen ? styles.buttonOpen : ''}`}>
        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
        <span className={styles.label}>{isOpen ? '表示中' : '発表者ビュー'}</span>
      </button>
    </div>
  )
}

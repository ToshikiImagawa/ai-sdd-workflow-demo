import BalanceIcon from '@mui/icons-material/Balance'
import DescriptionIcon from '@mui/icons-material/Description'
import DesignServicesIcon from '@mui/icons-material/DesignServices'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import styles from './HierarchyFlowVisual.module.css'

export function HierarchyFlowVisual() {
  return (
    <div className={styles['hierarchy-visual-wrapper']}>
      <div className={styles['hierarchy-flow-particle']} />

      <div className={`${styles['hierarchy-node']} ${styles['hierarchy-primary']}`}>
        <BalanceIcon /> CONSTITUTION (PRD)
      </div>
      <div className={styles['hierarchy-arrow']} />
      <div className={`${styles['hierarchy-node']} ${styles['hierarchy-standard']}`}>
        <DescriptionIcon /> Specification
      </div>
      <div className={styles['hierarchy-arrow']} />
      <div className={`${styles['hierarchy-node']} ${styles['hierarchy-standard']}`}>
        <DesignServicesIcon /> Design
      </div>
      <div className={styles['hierarchy-arrow']} />
      <div className={`${styles['hierarchy-node']} ${styles['hierarchy-ephemeral']}`}>
        <PlaylistAddCheckIcon /> Tasks (Temporary)
      </div>
    </div>
  )
}

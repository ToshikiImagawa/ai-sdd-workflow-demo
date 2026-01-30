import BalanceIcon from '@mui/icons-material/Balance'
import DescriptionIcon from '@mui/icons-material/Description'
import DesignServicesIcon from '@mui/icons-material/DesignServices'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import styles from './HierarchyFlowVisual.module.css'

export function HierarchyFlowVisual() {
  return (
    <div className={styles['hierarchy-visual-wrapper']}>
      <div className={styles['hierarchy-flow-particle']} />

      <div className={`${styles['hierarchy-node']} ${styles['hierarchy-primary']} ${styles['node-pulse-1']}`}>
        <BalanceIcon /> CONSTITUTION (PRD)
      </div>
      <div className={styles['hierarchy-arrow']} />
      <div className={`${styles['hierarchy-node']} ${styles['hierarchy-standard']} ${styles['node-pulse-2']}`}>
        <DescriptionIcon /> Specification
      </div>
      <div className={styles['hierarchy-arrow']} />
      <div className={`${styles['hierarchy-node']} ${styles['hierarchy-standard']} ${styles['node-pulse-3']}`}>
        <DesignServicesIcon /> Design
      </div>
      <div className={styles['hierarchy-arrow']} />
      <div className={`${styles['hierarchy-node']} ${styles['hierarchy-ephemeral']} ${styles['node-pulse-4']}`}>
        <PlaylistAddCheckIcon /> Tasks (Temporary)
      </div>
    </div>
  )
}

import Typography from '@mui/material/Typography'
import BalanceIcon from '@mui/icons-material/Balance'
import DescriptionIcon from '@mui/icons-material/Description'
import DesignServicesIcon from '@mui/icons-material/DesignServices'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import styles from './SolutionSlide.module.css'
import {BleedLayout} from '../layouts'

export function SolutionSlide() {
  return (
    <BleedLayout
      id="slide3"
      left={
        <>
          <Typography variant="h2" sx={{mb: '20px'}}>
            Solution: Single Source of Truth
          </Typography>
          <Typography variant="body1" sx={{mb: '16px'}}>
            AI-SDD-Workflowは、<strong>仕様書（Specification）</strong>
            をプロジェクトの唯一の真実と定義します。
          </Typography>
          <Typography variant="body1">
            曖昧な「雰囲気（Vibe）」ではなく、明確なドキュメントに基づいてAIを制御します。
          </Typography>
        </>
      }
      right={
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
      }
    />
  )
}

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import StorageIcon from '@mui/icons-material/Storage'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import TerminalIcon from '@mui/icons-material/Terminal'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import {TitledBulletList} from '../components/TitledBulletList'
import styles from './PersistenceSlide.module.css'
import {ContentLayout} from '../layouts'

export function PersistenceSlide() {
  return (
    <ContentLayout id="slide7" title="知識財産の永続化">
      <Grid container spacing="60px" sx={{alignItems: 'center'}}>
        <Grid size={6}>
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
        </Grid>
        <Grid size={6}>
          <TitledBulletList
            title="Knowledge vs Ephemeral"
            items={[
              <>
                <strong>PRD / Spec / Design:</strong>
                <br />
                永続的な知識資産としてリポジトリに残る。
              </>,
              <>
                <strong>Tasks / Logs:</strong>
                <br />
                一時的なデータ。実装完了後に設計書へ統合され、<code>/task_cleanup</code>
                で削除される。
              </>,
            ]}
          />
          <Typography variant="body1" sx={{mt: '20px', color: 'var(--theme-primary)'}}>
            → セッションを跨いでも、コンテキストが失われない。
          </Typography>
        </Grid>
      </Grid>
    </ContentLayout>
  )
}

import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import StorageIcon from '@mui/icons-material/Storage'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import TerminalIcon from '@mui/icons-material/Terminal'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
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
          <Typography variant="h3" sx={{mb: '12px'}}>
            Knowledge vs Ephemeral
          </Typography>
          <List disablePadding>
            {[
              {
                primary: (
                  <>
                    <strong>PRD / Spec / Design:</strong>
                    <br />
                    永続的な知識資産としてリポジトリに残る。
                  </>
                ),
              },
              {
                primary: (
                  <>
                    <strong>Tasks / Logs:</strong>
                    <br />
                    一時的なデータ。実装完了後に設計書へ統合され、<code>/task_cleanup</code>
                    で削除される。
                  </>
                ),
              },
            ].map((item, i) => (
              <ListItem key={i} disablePadding sx={{mb: '20px', pl: '30px', position: 'relative'}}>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    position: 'absolute',
                    left: 0,
                    color: 'var(--theme-primary)',
                  }}
                >
                  <ChevronRightIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={item.primary}
                  slotProps={{
                    primary: {
                      sx: {
                        fontSize: '20px',
                        lineHeight: 1.6,
                        color: 'var(--theme-text-body)',
                      },
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
          <Typography variant="body1" sx={{mt: '20px', color: 'var(--theme-primary)'}}>
            → セッションを跨いでも、コンテキストが失われない。
          </Typography>
        </Grid>
      </Grid>
    </ContentLayout>
  )
}

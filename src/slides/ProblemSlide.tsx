import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import WarningIcon from '@mui/icons-material/Warning'
import styles from './ProblemSlide.module.css'
import {ContentLayout} from '../layouts'

export function ProblemSlide() {
  return (
    <ContentLayout id="slide2" title="Introduction: The Problem">
      <Grid container spacing="60px" sx={{alignItems: 'center'}}>
        <Grid size={6}>
          <Typography variant="h3" sx={{mb: '12px'}}>
            "Vibe Coding" の限界
          </Typography>
          <Typography variant="body1" sx={{mb: '20px'}}>
            AIに対して「いい感じに作って」と指示していませんか？
          </Typography>
          <List disablePadding>
            {[
              {
                primary: (
                  <>
                    <strong>曖昧な指示:</strong> AIが意図を推測する必要がある
                  </>
                ),
              },
              {
                primary: (
                  <>
                    <strong>認識のズレ:</strong> 推測に基づく実装は、開発者の意図と乖離しやすい
                  </>
                ),
              },
              {
                primary: (
                  <>
                    <strong>バグの温床:</strong> 制御不能なコードが生成される
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
        </Grid>
        <Grid size={6}>
          <div className={styles['vibe-demo-wrapper']}>
            <div className={styles['vibe-chat-bubble']}>"Make a cool button!"</div>
            <div className={styles['vibe-ai-thinking']}>
              <SmartToyIcon sx={{fontSize: 20}} /> Thinking...
            </div>
            <div className={styles['vibe-generated-result']}>
              <button className={styles['vibe-glitch-button']}>Click Me?</button>
              <div className={styles['vibe-error-popup']}>
                <WarningIcon sx={{fontSize: 14, verticalAlign: 'middle'}} /> Style Error
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </ContentLayout>
  )
}

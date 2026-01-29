import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import {ContentLayout} from '../layouts'

export function ConstitutionSlide() {
  return (
    <ContentLayout id="slide4" title="CONSTITUTION.md: プロジェクト原則">
      <Grid container spacing="60px" sx={{alignItems: 'center'}}>
        <Grid size={6}>
          <Typography variant="body1">
            プロジェクトのルートに配置される「非交渉の原則」。全ての開発プロセスはこのファイルに従います。
          </Typography>
          <Paper
            sx={{
              background: 'var(--theme-background-alt)',
              p: '20px',
              borderRadius: '8px',
              border: '1px solid var(--theme-border)',
              mt: '20px',
            }}
          >
            <code style={{display: 'block', color: 'var(--theme-primary)', marginBottom: '10px'}}>
              &gt; Hierarchy of Truth
            </code>
            <List dense disablePadding sx={{color: 'var(--theme-text-heading)'}}>
              <ListItem disablePadding disableGutters>
                <ListItemText
                  primary={
                    <>
                      1. <strong>PRD</strong> (Why & What)
                    </>
                  }
                />
              </ListItem>
              <ListItem disablePadding disableGutters>
                <ListItemText
                  primary={
                    <>
                      2. <strong>Specification</strong> (How structured)
                    </>
                  }
                />
              </ListItem>
              <ListItem disablePadding disableGutters>
                <ListItemText
                  primary={
                    <>
                      3. <strong>Design</strong> (Implementation details)
                    </>
                  }
                />
              </ListItem>
              <ListItem disablePadding disableGutters>
                <ListItemText
                  primary={
                    <>
                      4. <strong>Tasks</strong> (Actionable steps)
                    </>
                  }
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid size={6}>
          <Typography variant="h3" sx={{mb: '12px'}}>
            厳格な依存関係
          </Typography>
          <List disablePadding>
            {[
              '下位ドキュメントは上位ドキュメントに矛盾してはならない',
              '実装（Task）は必ず設計（Design）に基づく',
              '「なんとなく実装」を許さないガードレール',
            ].map((text) => (
              <ListItem key={text} disablePadding sx={{mb: '20px', pl: '30px', position: 'relative'}}>
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
                  primary={text}
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
      </Grid>
    </ContentLayout>
  )
}

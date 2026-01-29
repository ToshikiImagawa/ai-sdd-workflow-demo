import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import {BulletListItem} from '../components/BulletListItem'
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
            <BulletListItem primary="下位ドキュメントは上位ドキュメントに矛盾してはならない" />
            <BulletListItem primary="実装（Task）は必ず設計（Design）に基づく" />
            <BulletListItem primary="「なんとなく実装」を許さないガードレール" />
          </List>
        </Grid>
      </Grid>
    </ContentLayout>
  )
}

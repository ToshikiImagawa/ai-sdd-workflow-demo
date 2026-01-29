import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import {CodeBlockPanel} from '../components/CodeBlockPanel'
import {TitledBulletList} from '../components/TitledBulletList'
import {ContentLayout} from '../layouts'

export function ConstitutionSlide() {
  return (
    <ContentLayout id="slide4" title="CONSTITUTION.md: プロジェクト原則">
      <Grid container spacing="60px" sx={{alignItems: 'center'}}>
        <Grid size={6}>
          <Typography variant="body1">
            プロジェクトのルートに配置される「非交渉の原則」。全ての開発プロセスはこのファイルに従います。
          </Typography>
          <CodeBlockPanel
            header={<>&gt; Hierarchy of Truth</>}
            items={[
              <>
                1. <strong>PRD</strong> (Why & What)
              </>,
              <>
                2. <strong>Specification</strong> (How structured)
              </>,
              <>
                3. <strong>Design</strong> (Implementation details)
              </>,
              <>
                4. <strong>Tasks</strong> (Actionable steps)
              </>,
            ]}
          />
        </Grid>
        <Grid size={6}>
          <TitledBulletList
            title="厳格な依存関係"
            items={[
              '下位ドキュメントは上位ドキュメントに矛盾してはならない',
              '実装（Task）は必ず設計（Design）に基づく',
              '「なんとなく実装」を許さないガードレール',
            ]}
          />
        </Grid>
      </Grid>
    </ContentLayout>
  )
}

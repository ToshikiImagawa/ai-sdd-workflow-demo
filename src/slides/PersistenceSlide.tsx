import Typography from '@mui/material/Typography'
import {TitledBulletList} from '../components/TitledBulletList'
import {TwoColumnGrid} from '../components/TwoColumnGrid'
import {PersistenceVisual} from '../visuals/PersistenceVisual'
import {ContentLayout} from '../layouts'

export function PersistenceSlide() {
  return (
    <ContentLayout id="slide7" title="知識財産の永続化">
      <TwoColumnGrid
        left={<PersistenceVisual />}
        right={
          <>
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
          </>
        }
      />
    </ContentLayout>
  )
}

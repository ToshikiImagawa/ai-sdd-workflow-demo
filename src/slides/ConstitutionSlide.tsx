import Typography from '@mui/material/Typography'
import {CodeBlockPanel} from '../components/CodeBlockPanel'
import {TitledBulletList} from '../components/TitledBulletList'
import {TwoColumnGrid} from '../components/TwoColumnGrid'
import {ContentLayout} from '../layouts'

export function ConstitutionSlide() {
  return (
    <ContentLayout id="slide4" title="CONSTITUTION.md: プロジェクト原則">
      <TwoColumnGrid
        left={
          <>
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
          </>
        }
        right={
          <TitledBulletList
            title="厳格な依存関係"
            items={[
              '下位ドキュメントは上位ドキュメントに矛盾してはならない',
              '実装（Task）は必ず設計（Design）に基づく',
              '「なんとなく実装」を許さないガードレール',
            ]}
          />
        }
      />
    </ContentLayout>
  )
}

import Typography from '@mui/material/Typography'
import { TwoColumnGrid } from '../components/TwoColumnGrid'
import { HierarchyFlowVisual } from '../visuals/HierarchyFlowVisual'
import { ContentLayout } from '../layouts'

export function SolutionSlide() {
  return (
    <ContentLayout id="slide3" title="Solution: Single Source of Truth">
      <TwoColumnGrid
        left={
          <>
            <Typography variant="body1" sx={{ mb: '16px' }}>
              AI-SDD-Workflowは、<strong>仕様書（Specification）</strong>
              をプロジェクトの唯一の真実と定義します。
            </Typography>
            <Typography variant="body1">
              曖昧な「雰囲気（Vibe）」ではなく、明確なドキュメントに基づいてAIを制御します。
            </Typography>
          </>
        }
        right={<HierarchyFlowVisual />}
      />
    </ContentLayout>
  )
}

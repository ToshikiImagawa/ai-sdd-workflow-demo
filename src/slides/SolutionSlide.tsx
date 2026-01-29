import Typography from '@mui/material/Typography'
import {HierarchyFlowVisual} from '../visuals/HierarchyFlowVisual'
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
      right={<HierarchyFlowVisual />}
    />
  )
}

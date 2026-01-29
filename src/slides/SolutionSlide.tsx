import {SlideHeading} from '../components/SlideHeading'
import {HierarchyFlowVisual} from '../visuals/HierarchyFlowVisual'
import {BleedLayout} from '../layouts'

export function SolutionSlide() {
  return (
    <BleedLayout
      id="slide3"
      left={
        <SlideHeading
          title="Solution: Single Source of Truth"
          description={[
            <>
              AI-SDD-Workflowは、<strong>仕様書（Specification）</strong>
              をプロジェクトの唯一の真実と定義します。
            </>,
            '曖昧な「雰囲気（Vibe）」ではなく、明確なドキュメントに基づいてAIを制御します。',
          ]}
        />
      }
      right={<HierarchyFlowVisual />}
    />
  )
}

import Typography from '@mui/material/Typography'
import { Timeline } from '../components/Timeline'
import { TimelineNode } from '../components/TimelineNode'
import { ContentLayout } from '../layouts'

const steps = [
  { number: 1, title: 'Specify', description: 'PRD & 仕様策定', command: '/generate_prd' },
  { number: 2, title: 'Plan', description: '設計詳細化', command: '/generate_spec' },
  { number: 3, title: 'Task', description: 'タスク分解', command: '/task_breakdown' },
  { number: 4, title: 'Implement', description: '実装 & レビュー', command: '/implement' },
]

export function WorkflowSlide() {
  return (
    <ContentLayout id="slide5" title="SDD Workflow Cycle">
      <Timeline
        items={steps.map((step) => (
          <TimelineNode key={step.number} number={step.number} title={step.title}>
            <Typography variant="body2">
              {step.description}
              <br />
              <code>{step.command}</code>
            </Typography>
          </TimelineNode>
        ))}
      />
      <Typography variant="body1" sx={{ textAlign: 'center', mt: '40px', fontStyle: 'italic' }}>
        AIとの対話を通じて、仕様を段階的に「育てて」いくフロー
      </Typography>
    </ContentLayout>
  )
}

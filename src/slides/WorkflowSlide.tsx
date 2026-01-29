import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import {ContentLayout} from '../layouts'

const steps = [
  {number: 1, title: 'Specify', description: 'PRD & 仕様策定', command: '/generate_prd'},
  {number: 2, title: 'Plan', description: '設計詳細化', command: '/generate_spec'},
  {number: 3, title: 'Task', description: 'タスク分解', command: '/task_breakdown'},
  {number: 4, title: 'Implement', description: '実装 & レビュー', command: '/implement'},
]

export function WorkflowSlide() {
  return (
    <ContentLayout id="slide5" title="SDD Workflow Cycle">
      <div className="timeline-layout">
        <div className="timeline-line" />
        {steps.map((step) => (
          <div key={step.number} className="timeline-item">
            <Avatar
              sx={{
                width: 50,
                height: 50,
                bgcolor: 'var(--theme-background)',
                border: '3px solid var(--theme-primary)',
                color: 'var(--theme-primary)',
                fontWeight: 700,
                fontSize: '20px',
                mx: 'auto',
                mb: '20px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
              }}
            >
              {step.number}
            </Avatar>
            <Typography variant="h3" sx={{fontSize: '22px', mb: '10px', color: 'var(--theme-primary)'}}>
              {step.title}
            </Typography>
            <Typography variant="body2">
              {step.description}
              <br />
              <code>{step.command}</code>
            </Typography>
          </div>
        ))}
      </div>
      <Typography variant="body1" sx={{textAlign: 'center', mt: '40px', fontStyle: 'italic'}}>
        AIとの対話を通じて、仕様を段階的に「育てて」いくフロー
      </Typography>
    </ContentLayout>
  )
}

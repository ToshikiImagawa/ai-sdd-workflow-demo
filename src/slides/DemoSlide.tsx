import logText from '../../assets/demo-log.txt?raw'
import { CommandList } from '../components/CommandList'
import { SlideHeading } from '../components/SlideHeading'
import { TerminalAnimation } from '../components/TerminalAnimation'
import { BleedLayout } from '../layouts'

const commands = [
  { text: '$ /sdd_init', color: 'var(--theme-text-heading)' },
  { text: '$ /generate_prd "To-Do App"', color: 'var(--theme-text-heading)' },
  { text: '$ /generate_spec', color: 'var(--theme-text-heading)' },
  { text: '$ /task_breakdown', color: 'var(--theme-primary)' },
  { text: '$ /implement', color: 'var(--theme-text-heading)' },
]

export function DemoSlide() {
  return (
    <BleedLayout
      id="slide9"
      left={
        <>
          <SlideHeading title="Demo Flow" description="わずか数コマンドで、要件定義から実装準備まで完了します。" />
          <CommandList commands={commands} sx={{ mt: '20px' }} />
        </>
      }
      right={<TerminalAnimation logText={logText} />}
    />
  )
}

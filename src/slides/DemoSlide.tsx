import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import logText from '../../assets/demo-log.txt?raw'
import {TerminalAnimation} from '../components/TerminalAnimation'
import {BleedLayout} from '../layouts'

const commands = [
  {text: '$ /sdd_init', color: 'var(--theme-text-heading)'},
  {text: '$ /generate_prd "To-Do App"', color: 'var(--theme-text-heading)'},
  {text: '$ /generate_spec', color: 'var(--theme-text-heading)'},
  {text: '$ /task_breakdown', color: 'var(--theme-primary)'},
  {text: '$ /implement', color: 'var(--theme-text-heading)'},
]

export function DemoSlide() {
  return (
    <BleedLayout
      id="slide9"
      left={
        <>
          <Typography variant="h2" sx={{mb: '20px'}}>
            Demo Flow
          </Typography>
          <Typography variant="body1">わずか数コマンドで、要件定義から実装準備まで完了します。</Typography>
          <List disablePadding sx={{mt: '20px', fontFamily: "'Roboto Mono'", fontSize: '18px'}}>
            {commands.map((cmd) => (
              <ListItem key={cmd.text} disablePadding sx={{color: cmd.color, mb: '10px'}}>
                {cmd.text}
              </ListItem>
            ))}
          </List>
        </>
      }
      right={<TerminalAnimation logText={logText} />}
    />
  )
}

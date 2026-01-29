import Typography from '@mui/material/Typography'
import {TitleLayout} from '../layouts'

export function TitleSlide() {
  return (
    <TitleLayout id="slide1">
      <Typography variant="h1" sx={{mb: '20px', color: 'var(--theme-text-heading)'}}>
        AI-SDD-Workflow
      </Typography>
      <Typography variant="subtitle1">
        脱・Vibe Coding。
        <br />
        仕様駆動で実現する、確実なAIソフトウェア開発。
      </Typography>
    </TitleLayout>
  )
}

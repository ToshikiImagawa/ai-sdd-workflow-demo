import Typography from '@mui/material/Typography'
import {GitHubLink} from '../components/GitHubLink'
import {QrCodeCard} from '../components/QrCodeCard'
import {UnderlinedHeading} from '../components/UnderlinedHeading'
import {SectionLayout} from '../layouts'

export function SummarySlide() {
  return (
    <SectionLayout id="slide10">
      <UnderlinedHeading sx={{mb: '30px'}}>Start SDD Today</UnderlinedHeading>
      <Typography variant="body1" sx={{fontSize: '24px', maxWidth: '800px', mb: '40px'}}>
        AI開発に「確実性」と「持続可能性」を。
        <br />
        最新の導入手順とドキュメントはGitHubをご覧ください。
      </Typography>

      <QrCodeCard url="https://github.com/ToshikiImagawa/ai-sdd-workflow" sx={{mb: '30px'}} />

      <GitHubLink repo="ToshikiImagawa/ai-sdd-workflow" sx={{mt: '10px'}} />
    </SectionLayout>
  )
}

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import {FallbackImage} from '../components/FallbackImage'
import {SectionLayout} from '../layouts'

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" style={{verticalAlign: 'middle'}}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

export function SummarySlide() {
  return (
    <SectionLayout id="slide10">
      <Typography variant="h2" sx={{fontSize: '64px', color: 'var(--theme-text-heading)'}}>
        Start SDD Today
      </Typography>
      <Divider
        sx={{
          width: '100px',
          borderWidth: '1.5px',
          borderColor: 'var(--theme-primary)',
          my: '30px',
        }}
      />
      <Typography variant="body1" sx={{fontSize: '24px', maxWidth: '800px', mb: '40px'}}>
        AI開発に「確実性」と「持続可能性」を。
        <br />
        最新の導入手順とドキュメントはGitHubをご覧ください。
      </Typography>

      <Box
        sx={{
          background: 'var(--theme-background)',
          p: '20px',
          borderRadius: '12px',
          mb: '30px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          border: '1px solid var(--theme-border)',
        }}
      >
        <FallbackImage
          src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://github.com/ToshikiImagawa/ai-sdd-workflow"
          alt="GitHub Repository QR Code"
          width={200}
          height={200}
        />
      </Box>

      <Typography
        sx={{
          mt: '10px',
          fontSize: '24px',
          color: 'var(--theme-primary)',
          fontFamily: "'Roboto Mono'",
        }}
      >
        <GitHubIcon /> github.com/ToshikiImagawa/ai-sdd-workflow
      </Typography>
    </SectionLayout>
  )
}

import {ThemeProvider} from '@mui/material/styles'
import {FallbackImage} from './components/FallbackImage'
import {useReveal} from './hooks/useReveal'
import {
  AutomationSlide,
  ConstitutionSlide,
  DemoSlide,
  FeaturesSlide,
  PersistenceSlide,
  ProblemSlide,
  SolutionSlide,
  SummarySlide,
  TitleSlide,
  WorkflowSlide,
} from './slides'
import {theme} from './theme'

export function App() {
  const deckRef = useReveal()

  return (
    <ThemeProvider theme={theme}>
      <div className="reveal" ref={deckRef}>
        <div className="slides">
          <TitleSlide />
          <ProblemSlide />
          <SolutionSlide />
          <ConstitutionSlide />
          <WorkflowSlide />
          <AutomationSlide />
          <PersistenceSlide />
          <FeaturesSlide />
          <DemoSlide />
          <SummarySlide />
        </div>
      </div>
      <div className="slide-logo">
        <FallbackImage src="/logo.png" width={120} height={40} alt="Logo" />
      </div>
    </ThemeProvider>
  )
}

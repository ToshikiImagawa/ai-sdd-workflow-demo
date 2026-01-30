import {ThemeProvider} from '@mui/material/styles'
import {FallbackImage} from './components/FallbackImage'
import {SlideRenderer} from './components/SlideRenderer'
import {registerDefaultComponents} from './components/registerDefaults'
import {defaultPresentationData, loadPresentationData} from './data'
import type {PresentationData} from './data'
import {useReveal} from './hooks/useReveal'
import {theme} from './theme'
import {applyThemeData} from './applyTheme'
import {useEffect} from 'react'

// デフォルトコンポーネントを登録
registerDefaultComponents()

type AppProps = {
  presentationData?: PresentationData
}

export function App({presentationData}: AppProps) {
  const data = loadPresentationData(presentationData, defaultPresentationData)
  const deckRef = useReveal()

  useEffect(() => {
    if (data.theme) {
      applyThemeData(data.theme)
    }
  }, [data.theme])

  return (
    <ThemeProvider theme={theme}>
      <div className="reveal" ref={deckRef}>
        <div className="slides">
          <SlideRenderer slides={data.slides} />
        </div>
      </div>
      <div className="slide-logo">
        <FallbackImage src="/logo.png" width={120} height={40} alt="Logo" />
      </div>
    </ThemeProvider>
  )
}

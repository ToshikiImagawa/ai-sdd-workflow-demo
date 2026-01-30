import { createRoot } from 'react-dom/client'
import 'reveal.js/dist/reveal.css'
import './styles/global.css'
import { App } from './App'
import { applyTheme } from './applyTheme'

applyTheme()
createRoot(document.getElementById('root')!).render(<App />)

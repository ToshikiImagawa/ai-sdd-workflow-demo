import {createRoot} from 'react-dom/client'
import 'reveal.js/dist/reveal.css'
import './styles/global.css'
import {App} from './App'
import {applyTheme} from './applyTheme'
import type {PresentationData} from './data'

applyTheme().then()

const root = createRoot(document.getElementById('root')!)

fetch('/slides.json')
    .then((res) => {
        if (!res.ok) throw new Error(`${res.status}`)
        return res.json() as Promise<PresentationData>
    })
    .then((data) => {
        root.render(<App presentationData={data}/>)
    })
    .catch(() => {
        root.render(<App/>)
    })

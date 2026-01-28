import { createRoot } from 'react-dom/client';
import 'reveal.js/dist/reveal.css';
import './styles/style.css';
import { App } from './App';

createRoot(document.getElementById('root')!).render(<App />);

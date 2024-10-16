import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <div className='bg-stone-800 h-full'>
  <StrictMode>
    <App />
  </StrictMode>
  </div>
)

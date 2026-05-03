import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import App from './App.tsx'
import { InviteGate } from './components/InviteGate.tsx'
import { APP_SHORT_NAME } from './branding'

document.title = APP_SHORT_NAME

registerSW({ immediate: true })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InviteGate>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </InviteGate>
  </StrictMode>,
)

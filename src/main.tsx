import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import DebugApp from './debug/DebugApp'

// Until the real interface exists (Phase 3), the app is the engine debug page.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DebugApp />
  </StrictMode>,
)

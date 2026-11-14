import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'

// The game, or the engine debug page at #debug. Each runs its own engine, so only one is loaded.
const App = lazy(() => import('./ui/App'))
const DebugApp = lazy(() => import('./debug/DebugApp'))

function Root() {
  const debug = window.location.hash === '#debug'
  return <Suspense fallback={null}>{debug ? <DebugApp /> : <App />}</Suspense>
}

// Switching between the game and the debug page reloads, so two engines never run at once.
window.addEventListener('hashchange', () => window.location.reload())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import App from './App.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import { ThemeProvider } from './components/theme/theme-provider.tsx'
import { ModeToggle } from './components/theme/mode-toggle.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
      <Toaster position="top-center" />
      <ModeToggle />
    </ThemeProvider>
  </StrictMode>,
)

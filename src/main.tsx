import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { GlobalStyle } from './styles/GlobalStyle.ts'

createRoot(document.getElementById('root')!).render(
  <>
    <GlobalStyle />
    <StrictMode>
      <App />
    </StrictMode>
  </>
)

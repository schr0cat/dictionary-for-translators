import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { NavigationProvider } from './context/navigation'
import { AuthProvider } from './context/auth'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NavigationProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </NavigationProvider>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { NavigationProvider } from './context/navigation'
import { AuthProvider } from './context/auth'
import { store } from './store'
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <NavigationProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </NavigationProvider>
    </Provider>
  </StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { LangProvider, ThemeProvider, A11yProvider } from './i18n'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <A11yProvider>
        <LangProvider>
          <App />
        </LangProvider>
      </A11yProvider>
    </ThemeProvider>
  </React.StrictMode>
)

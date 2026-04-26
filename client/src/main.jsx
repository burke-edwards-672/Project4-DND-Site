import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/layout.css'
import './css/deco.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Components/pages/App'
import About from './Components/pages/About'
import Contact from './Components/pages/Contact'
import Customer from './Components/pages/Customer'
import Jobs from './Components/pages/Jobs'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Customer/>
  </React.StrictMode>,
)

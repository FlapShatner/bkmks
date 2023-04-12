import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { AtomProvider } from './state/atomContext'

import App from './App'

const root = document.createElement('div')
root.id = 'crx-root'
document.body.append(root)

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <AtomProvider>
      <App />
    </AtomProvider>
  </React.StrictMode>
)

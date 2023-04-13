import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { AtomProvider } from './state/atomContext'
import { QueryClient, QueryClientProvider } from 'react-query'

import App from './App'

const root = document.createElement('div')
root.id = 'crx-root'
document.body.append(root)

const queryClient = new QueryClient()

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AtomProvider>
        <App />
      </AtomProvider>
    </QueryClientProvider>
  </React.StrictMode>
)

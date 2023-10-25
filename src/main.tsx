

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { App } from './App'
import { PocketbaseProvider } from './context/PocketbaseProvider'





ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PocketbaseProvider>

    <App/>
    </PocketbaseProvider>
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'

import { enableMSW } from './api/msw/index.ts'
import { App } from './app.tsx'

enableMSW().then(() =>
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  ),
)

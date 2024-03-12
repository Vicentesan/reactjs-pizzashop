import './globals.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { router } from './routes'

export function App() {
  return (
    <HelmetProvider>
      <Helmet title="%s | pizza.shop" />

      <Toaster richColors theme="light" />
      <RouterProvider router={router} />
    </HelmetProvider>
  )
}

import './globals.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import { ThemeProvider } from './components/theme/theme-provider'
import { ToastProvider } from './components/ToastProvider'
import { queryClient } from './lib/react-query'
import { router } from './routes'

export function App() {
  return (
    <HelmetProvider>
      {/* a cool trick is to use a the application name in the local storage, also its cool to versonize the system to manage state changes */}
      <ThemeProvider storageKey="@pizzashop:theme-1.0.0" defaultTheme="dark">
        <Helmet titleTemplate="%s | pizza.shop" />

        <ToastProvider closeButton />

        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}

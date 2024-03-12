import './globals.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { ThemeProvider } from './components/theme/theme-provider'
import { router } from './routes'

export function App() {
  return (
    <HelmetProvider>
      {/* a cool trick is to use a the application name in the local storage, also its cool to versonize the system to manage state changes */}
      <ThemeProvider storageKey="@pizzashop:theme-1.0.0" defaultTheme="dark">
        <Helmet title="%s | pizza.shop" />

        <Toaster richColors />
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  )
}

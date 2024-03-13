import { Toaster } from 'sonner'

import { useTheme } from './theme/theme-provider'

export function ToastProvider() {
  const { theme } = useTheme()

  return <Toaster richColors theme={theme} />
}

import { Toaster, ToasterProps } from 'sonner'

import { useTheme } from './theme/theme-provider'

export function ToastProvider(props: ToasterProps) {
  const { theme } = useTheme()

  return <Toaster richColors theme={theme} {...props} />
}

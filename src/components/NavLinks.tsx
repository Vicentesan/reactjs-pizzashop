import { Link, LinkProps, useLocation } from 'react-router-dom'

import { cn } from '@/lib/utils'

interface NavLinksProps extends LinkProps {}

export function NavLinks(props: NavLinksProps) {
  const { pathname } = useLocation()

  return (
    <Link
      className={cn(
        'flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground',
        {
          'text-foreground': pathname === props.to,
        },
      )}
      {...props}
    />
  )
}

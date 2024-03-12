import { Home, Pizza, UtensilsCrossed } from 'lucide-react'

import { NavLinks } from './NavLinks'
import { Separator } from './ui/separator'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Pizza className="size-6" />

        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLinks to="/">
            <Home className="size-4" />
            Início
          </NavLinks>

          <NavLinks to="/orders">
            <UtensilsCrossed className="size-4" />
            Pedidos
          </NavLinks>
        </nav>
      </div>
    </div>
  )
}

import { useQuery } from '@tanstack/react-query'
import { Building, ChevronDown, LogOut } from 'lucide-react'

import { getManagedRestaurant } from '@/api/get-managed-restaurant'
import { getProfile } from '@/api/get-profile'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'

export function AccountMenu() {
  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })
  const { data: managedRestaurant, isLoading: isManagedRestaurantLoading } =
    useQuery({
      queryKey: ['managed-restaurant'],
      queryFn: getManagedRestaurant,
    })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex select-none items-center gap-2"
        >
          {isManagedRestaurantLoading ? (
            <Skeleton className="h-4 w-40" />
          ) : (
            managedRestaurant?.name
          )}
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span>
            {isProfileLoading ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              profile?.name
            )}
          </span>
          <span className="text-xs font-normal text-muted-foreground">
            {isProfileLoading ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              profile?.email
            )}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer">
          <Building className="mr-2 size-4" />
          <span>Perfil da Loja</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer text-rose-500 dark:text-rose-400">
          <LogOut className="mr-2 size-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

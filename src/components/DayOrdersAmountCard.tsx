import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'

import { getDaysOrdersAmount } from '@/api/get-day-orders-amount'
import { cn } from '@/lib/utils'

import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export function DayOrdersAmountCard() {
  const { data: dayOrdersAmount } = useQuery({
    queryKey: ['metrics', 'day-orders-amount'],
    queryFn: getDaysOrdersAmount,
  })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {dayOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {dayOrdersAmount.amount.toLocaleString('pt-BR')}
            </span>
            <p className="text-xs text-muted-foreground">
              <span
                className={cn('', {
                  'text-rose-500 dark:text-rose-400':
                    dayOrdersAmount.diffFromYesterday < 0,
                  'text-emerald-500 dark:text-emerald-400':
                    dayOrdersAmount.diffFromYesterday > 0,
                })}
              >
                {dayOrdersAmount.diffFromYesterday === 0
                  ? dayOrdersAmount.diffFromYesterday
                  : dayOrdersAmount.diffFromYesterday > 0
                    ? `+${dayOrdersAmount.diffFromYesterday}`
                    : `${dayOrdersAmount.diffFromYesterday}`}
                %
              </span>{' '}
              em relação ao ontem
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}

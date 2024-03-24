import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'

import { getMonthsOrdersAmount } from '@/api/get-month-orders-amount'
import { cn } from '@/lib/utils'

import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export function MonthOrdersAmountCard() {
  const { data: monthOrdersAmount } = useQuery({
    queryKey: ['metrics', 'month-orders-amount'],
    queryFn: getMonthsOrdersAmount,
  })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (mês)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {monthOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthOrdersAmount.amount.toLocaleString('pt-BR')}
            </span>
            <p className="text-xs text-muted-foreground">
              <span
                className={cn('', {
                  'text-rose-500 dark:text-rose-400':
                    monthOrdersAmount.diffFromLastMonth < 0,
                  'text-emerald-500 dark:text-emerald-400':
                    monthOrdersAmount.diffFromLastMonth > 0,
                })}
              >
                {monthOrdersAmount.diffFromLastMonth === 0
                  ? monthOrdersAmount.diffFromLastMonth
                  : monthOrdersAmount.diffFromLastMonth > 0
                    ? `+${monthOrdersAmount.diffFromLastMonth}`
                    : `${monthOrdersAmount.diffFromLastMonth}`}
                %
              </span>{' '}
              em relação ao mês passado
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}

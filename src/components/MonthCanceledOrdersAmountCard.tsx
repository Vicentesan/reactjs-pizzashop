import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { getMonthsCanceledOrdersAmount } from '@/api/get-month-canceled-orders-amount'
import { cn } from '@/lib/utils'

import { MetricsCardSkeleton } from './MetricsCardSkeleton'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export function MonthCanceledOrdersAmountCard() {
  const { data: monthCanceledOrdersAmount } = useQuery({
    queryKey: ['metrics', 'month-canceled-orders-amount'],
    queryFn: getMonthsCanceledOrdersAmount,
  })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {monthCanceledOrdersAmount ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthCanceledOrdersAmount.amount.toLocaleString('pt-BR')}
            </span>
            <p className="text-xs text-muted-foreground">
              <span
                className={cn('', {
                  'text-rose-500 dark:text-rose-400':
                    monthCanceledOrdersAmount.diffFromLastMonth >= 0,
                  'text-emerald-500 dark:text-emerald-400':
                    monthCanceledOrdersAmount.diffFromLastMonth < 0,
                })}
              >
                {monthCanceledOrdersAmount.diffFromLastMonth === 0
                  ? monthCanceledOrdersAmount.diffFromLastMonth
                  : monthCanceledOrdersAmount.diffFromLastMonth < 0
                    ? `${monthCanceledOrdersAmount.diffFromLastMonth}`
                    : `+${monthCanceledOrdersAmount.diffFromLastMonth}`}
                %
              </span>{' '}
              em relação ao mês passado
            </p>
          </>
        ) : (
          <MetricsCardSkeleton />
        )}
      </CardContent>
    </Card>
  )
}

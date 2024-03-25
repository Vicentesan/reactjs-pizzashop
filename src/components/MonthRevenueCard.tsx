import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { getMonthRevenue } from '@/api/get-month-revenue'
import { cn } from '@/lib/utils'

import { MetricsCardSkeleton } from './MetricsCardSkeleton'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export function MonthRevenueCard() {
  const { data: monthRevenue } = useQuery({
    queryKey: ['metrics', 'month-revenue'],
    queryFn: getMonthRevenue,
  })

  const monthTotalRevenue = monthRevenue ? monthRevenue?.revenue / 100 : 0

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Receita Total (mês)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {monthRevenue ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthTotalRevenue.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
            <p className="text-xs text-muted-foreground">
              <span
                className={cn('', {
                  'text-rose-500 dark:text-rose-400':
                    monthRevenue.diffFromLastMonth < 0,
                  'text-emerald-500 dark:text-emerald-400':
                    monthRevenue.diffFromLastMonth > 0,
                })}
              >
                {monthRevenue.diffFromLastMonth === 0
                  ? monthRevenue.diffFromLastMonth
                  : monthRevenue.diffFromLastMonth > 0
                    ? `+${monthRevenue.diffFromLastMonth}`
                    : `${monthRevenue.diffFromLastMonth}`}
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

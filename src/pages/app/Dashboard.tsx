import { Helmet } from 'react-helmet-async'

import { DayOrdersAmountCard } from '@/components/DayOrdersAmountCard'
import { MonthCanceledOrdersAmountCard } from '@/components/MonthCanceledOrdersAmountCard'
import { MonthOrdersAmountCard } from '@/components/MonthOrdersAmountCard'
import { MonthRevenueCard } from '@/components/MonthRevenueCard'

export function Dashboard() {
  return (
    <>
      <Helmet title="Painel" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <MonthRevenueCard />
          <MonthOrdersAmountCard />
          <DayOrdersAmountCard />
          <MonthCanceledOrdersAmountCard />
        </div>
      </div>
    </>
  )
}

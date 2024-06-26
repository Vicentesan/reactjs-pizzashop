import { api } from '@/lib/axios'

export interface GetMonthsOrdersAmountResponse {
  amount: number
  diffFromLastMonth: number
}

export async function getMonthsOrdersAmount() {
  const response = await api.get<GetMonthsOrdersAmountResponse>(
    '/metrics/month-orders-amount',
  )

  return response.data
}

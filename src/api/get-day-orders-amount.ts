import { api } from '@/lib/axios'

export interface GetDaysOrdersAmountResponse {
  amount: number
  diffFromYesterday: number
}

export async function getDaysOrdersAmount() {
  const response = await api.get<GetDaysOrdersAmountResponse>(
    '/metrics/day-orders-amount',
  )

  return response.data
}

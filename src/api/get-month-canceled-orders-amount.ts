import { api } from '@/lib/axios'

export interface GetMonthsCanceledOrdersAmountResponse {
  amount: number
  diffFromLastMonth: number
}

export async function getMonthsCanceledOrdersAmount() {
  const response = await api.get<GetMonthsCanceledOrdersAmountResponse>(
    '/metrics/month-canceled-orders-amount',
  )

  return response.data
}
